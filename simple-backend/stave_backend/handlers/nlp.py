import json
import logging
import traceback
from typing import Dict

from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.http import Http404

from ..models import Document
from ..lib.require_login import require_login

forte_msg = "Forte is not installed or imported successfully. To get NLP support from Forte, install it from https://github.com/asyml/forte"
forte_installed = False

try:
  from forte.data.data_pack import DataPack
  from forte.pipeline import Pipeline
  from forte.processors.base import PackProcessor
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

  class DummyProcessor(PackProcessor):
    """
    A dummy processor to check the output records from remote pipeline
    """

    def _process(self, input_pack: DataPack):
        pass

    @classmethod
    def expected_types_and_attributes(cls):
      return {
        k: set(v) for k, v in remote_configs.get("expectedRecords").items()
      }

  #Create the pipeline and add the processor.
  pipeline = Pipeline[DataPack](
    do_init_type_check=remote_configs.get("doValidation")
  )
  pipeline.set_reader(RawDataDeserializeReader())
  pipeline.add(RemoteProcessor(), config={
    "url": remote_configs.get("pipelineUrl"),
    "validation": {
      "do_init_type_check": remote_configs.get("doValidation"),
      "expected_name": remote_configs.get("expectedName"),
      "input_format": remote_configs.get("inputFormat")
    }
  })
  pipeline.add(DummyProcessor())
  pipeline.initialize()
  return pipeline


@require_login
def load_model(request):
  response: HttpResponse
  received_json_data = json.loads(request.body)
  remote_configs = received_json_data.get("remoteConfigs")

  pipeline_url = remote_configs and remote_configs.get("pipelineUrl")
  model_name = remote_configs and (
    remote_configs.get("expectedName") or pipeline_url
  )
  if pipeline_url:
    m = __load_pipeline(remote_configs)
    if m:
      nlp_models[pipeline_url] = m
      response = HttpResponse('OK')
      response['load_success'] = True
      logging.info(f"Pipeline {pipeline_url} is ready.")
    else:
      response = HttpResponse('OK')
      response['load_success'] = False
  else:
    logging.error(f"Cannot find model {model_name}")
    response =  Http404(f"Cannot access pipeline service at {pipeline_url}")
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
    pipeline = nlp_models[remote_configs["pipelineUrl"]]
  except (TypeError, KeyError) as e:
    logging.error(
      f"{str(e)}: Model {model_name} is not loaded at "
      "the time of running this pipeline.")
  pack = json.loads(docJson['textPack'])['py/state']

  response: JsonResponse
  if pipeline:
    processedPack = pipeline.process([docJson['textPack']])
    doc.textPack = processedPack.to_string(True)
    doc.save()    
    response = JsonResponse(model_to_dict(doc), safe=False)
  else:
    logging.error(
      f"The NLP model of name {model_name} is not "
      f"loaded, please check the log for possible reasons."
    )
    response = JsonResponse(docJson, safe=False)
  return response
