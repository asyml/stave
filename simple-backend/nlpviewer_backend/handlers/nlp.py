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

@require_login
def load_content_rewriter():
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
  if model_name == 'content_rewriter':
    if model_name in nlp_models:
      return HttpResponse('OK')
    else:
      nlp_models[model_name] = load_content_rewriter()
      return HttpResponse('OK')
  else:
    response =  Http404(f"Cannot find model {model_name}")


@require_login
def run_pipeline(request, document_id, model_name):
  doc = Document.objects.get(pk=document_id)
  docJson = model_to_dict(doc)
  pipeline = nlp_models[model_name]

  if pipeline:
    processedPack = pipeline.process([docJson['textPack']])
    doc.textPack = processedPack.serialize()
    doc.save()
  else:
    logging.error(
      "The NLP model of name {model_name} is not "
      "loaded, please check the log for possible reasons."
    )

  return JsonResponse(model_to_dict(doc), safe=False)

