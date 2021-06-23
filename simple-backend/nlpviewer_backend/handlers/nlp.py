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
from ..lib.utils import fetch_doc_check_perm

forte_msg = "Forte is not installed or imported successfully. To get NLP support from Forte, install it from https://github.com/asyml/forte"
forte_installed = False

try:
  from forte.data.data_pack import DataPack
  from forte.pipeline import Pipeline
  from forte.processors.misc import RemoteProcessor
  from forte.data.readers import RawDataDeserializeReader
  forte_installed = True
except ImportError:
  traceback.print_exc()
  logging.warning(forte_msg)

nlp_models = {}

def __load_pipeline(url: str = "http://localhost:8008"):
  if not forte_installed:
    logging.info(forte_msg)
    return None

  #Create the pipeline and add the processor.
  pipeline = Pipeline[DataPack]()
  pipeline.set_reader(RawDataDeserializeReader())
  pipeline.add(RemoteProcessor(), config={"url": url})
  pipeline.initialize()
  return pipeline


@require_login
def load_model(request):
  response: HttpResponse
  received_json_data = json.loads(request.body)
  pipeline_url = received_json_data.get("pipelineUrl")

  if pipeline_url:
    m = __load_pipeline(url=pipeline_url)
    if m:
      nlp_models[pipeline_url] = m
      response = HttpResponse('OK')
      response['load_success'] = True
      logging.info(f"Pipeline {pipeline_url} is ready.")
    else:
      response = HttpResponse('OK')
      response['load_success'] = False
  else:
    logging.error(f"Cannot find model {pipeline_url}")
    response =  Http404(f"Cannot access pipeline service at {pipeline_url}")    
  return response


@require_login
def run_pipeline(request, document_id: int):
  doc = Document.objects.get(pk=document_id)
  docJson = model_to_dict(doc)
  received_json_data = json.loads(request.body)
  pipeline_url = received_json_data.get("pipelineUrl")

  if pipeline_url not in nlp_models:
    logging.error(
      f"Model {pipeline_url} is not loaded at "
      "the time of running this pipeline.")
  pipeline = nlp_models.get(pipeline_url, None)
  pack = json.loads(docJson['textPack'])['py/state']

  response: JsonResponse
  if pipeline:
    processedPack = pipeline.process([docJson['textPack']])
    doc.textPack = processedPack.serialize(True)
    doc.save()    
    response = JsonResponse(model_to_dict(doc), safe=False)
  else:
    logging.error(
      f"The NLP model of url {pipeline_url} is not "
      f"loaded, please check the log for possible reasons."
    )
    response = JsonResponse(docJson, safe=False)
  return response
