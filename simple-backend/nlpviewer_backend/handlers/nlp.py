import uuid
import json
import os
import logging
import traceback

from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.http import Http404

from ..models import Document, User
from ..lib.require_login import require_login

forte_msg = "Forte is not installed or imported successfully. To get NLP support from Forte, install it from https://github.com/asyml/forte"
forte_installed = False

try:
  from forte.data.data_pack import DataPack
  from forte.pipeline import Pipeline
  forte_installed = True
except ImportError:
  traceback.print_exc()
  logging.warning(forte_msg)

nlp_models = {}

def __load_eliza():
  if forte_installed:
    from forte.processors.eliza_processor import ElizaProcessor
    from forte.data.readers import RawDataDeserializeReader

    #Create the pipeline and add the processor.
    pipeline = Pipeline[DataPack]()
    pipeline.set_reader(RawDataDeserializeReader())
    pipeline.add(ElizaProcessor())    
    pipeline.initialize()
    return pipeline
  else:
    logging.info(forte_msg)
    return None


def __load_utterance_searcher():
  if forte_installed:
    try:
      from examples.clinical_pipeline.utterance_searcher import LastUtteranceSearcher
      from forte.data.readers import RawDataDeserializeReader
    except ImportError:
      logging.error(
        "Additional Forte examples: "
        "https://github.com/asyml/forte/tree/master/examples "
        "needed to be installed to run this example.")
      return None

    # Load several configuration from environment.
    stave_db_path = os.environ.get('stave_db_path')
    url_stub = os.environ.get('url_stub')
    query_result_project_id = os.environ.get('query_result_project_id')

    #Create the pipeline and add the processor.
    pipeline = Pipeline[DataPack]()
    pipeline.set_reader(RawDataDeserializeReader())
    pipeline.add(LastUtteranceSearcher(),
      config={
        'stave_db_path': stave_db_path,
        'url_stub': url_stub,
        'query_result_project_id': int(query_result_project_id)
      }
    )
    
    pipeline.initialize()
    return pipeline
  else:
    logging.info(forte_msg)
    return None

def __load_content_rewriter():
  if forte_installed:
    try:
      from forte_examples.content_rewriter.rewriter import ContentRewriter
      from forte.data.readers import RawDataDeserializeReader
    except ImportError as e:
      logging.error(
        "Additional Forte examples: "
        "https://github.com/asyml/forte/tree/master/forte_examples "
        "needed to be installed to run this example.")
      return None

    model_path = os.environ.get('content_rewriter_model_path')
    if not model_path:
      logging.error(
        "Cannot load content rewriter model, set the environment "
        "variable 'content_rewriter_model_path' that point to the"
        "model directory."
        )
      return None
    else:
      # Create the pipeline and add the processor
      pipeline = Pipeline[DataPack]()
      pipeline.set_reader(RawDataDeserializeReader())
      pipeline.add(ContentRewriter(), config={
        'model_dir': os.environ.get('content_rewriter_model_path')
      })

      # Models gets initialize.
      pipeline.initialize()
      return pipeline
  else:
    logging.info(forte_msg)
    return None


@require_login
def load_model(request, model_name: str):
  response: HttpResponse

  model_func_name = f'__load_{model_name}'

  if model_func_name in globals():
    m = globals()[model_func_name]()
    if m:
      nlp_models[model_name] = m
      response = HttpResponse('OK')
      response['load_success'] = True
      logging.info(f"Model {model_name} successfully loaded.")
    else:
      response = HttpResponse('OK')
      response['load_success'] = False
  else:
    logging.error(f"Cannot find model {model_name}")
    response =  Http404(f"Cannot find model {model_name}")    
  return response


@require_login
def run_pipeline(request, document_id, model_name):
  doc = Document.objects.get(pk=document_id)
  docJson = model_to_dict(doc)
  if model_name not in nlp_models:
    logging.error(
      f"Model {model_name} is not loaded at "
      "the time of running this pipeline.")
  pipeline = nlp_models.get(model_name, None)
  pack = json.loads(docJson['textPack'])['py/state']

  response: JsonResponse
  if pipeline:
    processedPack = pipeline.process([docJson['textPack']])
    doc.textPack = processedPack.serialize(True)
    doc.save()    
    response = JsonResponse(model_to_dict(doc), safe=False)
  else:
    logging.error(
      f"The NLP model of name {model_name} is not "
      f"loaded, please check the log for possible reasons."
    )
    response = JsonResponse(docJson, safe=False)
  return response
