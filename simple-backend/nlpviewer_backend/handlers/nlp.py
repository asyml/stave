import uuid
import json
import os
import logging

from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.http import Http404

from ..models import Document, User
from ..lib.require_login import require_login

forte_msg = "Forte is not installed. To get NLP support from Forte, install it from https://github.com/asyml/forte"
forte_installed = False

try:
  from forte.data.data_pack import DataPack
  from forte.pipeline import Pipeline
  forte_installed = True
except ImportError:
  logging.warning(forte_msg)

nlp_models = {}

def __load_content_rewriter():
  if forte_installed:
    from examples.content_rewriter.rewriter import ContentRewriter
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
    logging.info("Cannot load content rewriter models.")
    return None

@require_login
def load_model(request, model_name: str):
  response: HttpResponse
  if model_name == 'content_rewriter':
    if model_name in nlp_models:
      response = HttpResponse('OK')
      response['load_success'] = True
    else:
      m = __load_content_rewriter()
      if m:
        nlp_models[model_name]
        response = HttpResponse('OK')
        response['load_success'] = True
      else:
        response = HttpResponse('OK')
        response['load_success'] = False
  else:
    response =  Http404(f"Cannot find model {model_name}")
  
  return response


@require_login
def run_pipeline(request, document_id, model_name):
  doc = Document.objects.get(pk=document_id)
  docJson = model_to_dict(doc)

  pipeline = nlp_models.get(model_name, None)

  print('print the doc')
  pack = json.loads(docJson['textPack'])['py/state']
  print(pack['_text'])
  print(pack['annotations'])

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
  # TODO: How to tell the front-end that pipeline is not run?
  return response
