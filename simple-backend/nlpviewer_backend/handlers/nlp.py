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

def __load_pipeline(url: str = "http://localhost:8008"):
  if not forte_installed:
    logging.info(forte_msg)
    return None

  from forte.processors.misc import RemoteProcessor
  from forte.data.readers import RawDataDeserializeReader

  #Create the pipeline and add the processor.
  pipeline = Pipeline[DataPack]()
  pipeline.set_reader(RawDataDeserializeReader())
  pipeline.add(RemoteProcessor(), config={"url": url})
  pipeline.initialize()
  return pipeline

def __load_eliza(url: str = "http://localhost:8009"):
  """
  The remote Forte pipeline should look like:

    from forte.processors.eliza_processor import ElizaProcessor
    from forte.data.readers import RawDataDeserializeReader

    Pipeline[DataPack]() \
      .set_reader(RawDataDeserializeReader()) \
      .add(ElizaProcessor()) \
      .serve(host="localhost", port=8009)
  """
  return __load_pipeline(url=url)


def __load_utterance_searcher(url: str = "http://localhost:8010"):
  """
  The remote Forte pipeline should look like:

    from examples.clinical_pipeline.utterance_searcher import LastUtteranceSearcher
    from forte.data.readers import RawDataDeserializeReader

    # Load several configuration from environment.
    stave_db_path = os.environ.get('stave_db_path')
    url_stub = os.environ.get('url_stub')
    query_result_project_id = os.environ.get('query_result_project_id')

    Pipeline[DataPack]() \
      .set_reader(RawDataDeserializeReader()) \
      .add(LastUtteranceSearcher(),
        config={
          'stave_db_path': stave_db_path,
          'url_stub': url_stub,
          'query_result_project_id': int(query_result_project_id)
        }
      ) \
      .serve(host="localhost", port=8010)
  """
  return __load_pipeline(url=url)

def __load_content_rewriter(url: str = "http://localhost:8011"):
  """
  The remote Forte pipeline should look like:

    from forte_examples.content_rewriter.rewriter import ContentRewriter
    from forte.data.readers import RawDataDeserializeReader

    model_path = os.environ.get('content_rewriter_model_path')
    if not model_path:
      logging.error(
        "Cannot load content rewriter model, set the environment "
        "variable 'content_rewriter_model_path' that point to the"
        "model directory."
        )
      return None
    else:
      Pipeline[DataPack]() \
        .set_reader(RawDataDeserializeReader()) \
        .add(ContentRewriter(), config={
          'model_dir': os.environ.get('content_rewriter_model_path')
        }) \
        .serve(host="localhost", port=8011)
  """
  return __load_pipeline(url=url)


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
