import uuid
import json
import os
import logging
import traceback
from typing import Dict

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

def __load_pipeline(remote_configs: Dict):
  if not forte_installed:
    logging.info(forte_msg)
    return None

  #Create the pipeline and add the processor.
  pipeline = Pipeline[DataPack]()
  pipeline.set_reader(RawDataDeserializeReader())
  pipeline.add(RemoteProcessor(), config={
    "url": remote_configs.get("pipelineUrl"),
    "do_validation": remote_configs.get("doValidation"),
    "expected_name": remote_configs.get("expectedName"),
    "expected_records": json.dumps(remote_configs.get("expectedRecords"))
  })
  pipeline.initialize()
  return pipeline


@require_login
def load_model(request):
  response: HttpResponse
  received_json_data = json.loads(request.body)
  remote_configs = received_json_data.get("remoteConfigs")

  model_name = remote_configs and (remote_configs.get("expectedName") or \
      remote_configs.get("pipelineUrl"))
  if model_name:
    m = __load_pipeline(remote_configs)
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
def run_pipeline(request, document_id: int):
  doc = Document.objects.get(pk=document_id)
  docJson = model_to_dict(doc)
  project_configs=json.loads(doc.project.config or "null")

  model_name = pipeline = None
  try:
    remote_configs = project_configs["remoteConfigs"]
    model_name = remote_configs["expectedName"] or remote_configs["pipelineUrl"]
    pipeline = nlp_models[model_name]
  except (TypeError, KeyError) as e:
    logging.error(
      f"{str(e)}: Model {model_name} is not loaded at "
      "the time of running this pipeline.")
  pack = json.loads(docJson['textPack'])['py/state']

  response: JsonResponse
  if pipeline:
    processedPack = pipeline.process([docJson['textPack']])
    doc.textPack = processedPack.serialize(True)
    doc.save()    
    response = JsonResponse(model_to_dict(doc), safe=False)
  else:
    logging.error(
      f"The NLP model {model_name} is not "
      f"loaded, please check the log for possible reasons."
    )
    response = JsonResponse(docJson, safe=False)
  return response
