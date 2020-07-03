from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.http import Http404
import uuid
import json
import os
from ..models import Document, User
from ..lib.require_login import require_login

from forte.data.data_pack import DataPack
from forte.pipeline import Pipeline


nlp_models = {}

def load_content_rewriter():
    from examples.content_rewriter.rewriter import ContentRewriter
    from forte.data.readers import RawDataDeserializeReader

    # Create the pipeline and add the processor
    pipeline = Pipeline[DataPack]()
    pipeline.set_reader(RawDataDeserializeReader())
    pipeline.add(ContentRewriter(), config={
        'model_dir': os.environ.get('content_rewriter_model_path')
    })

    # Models gets initialize.
    pipeline.initialize()

    return pipeline


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

    processedPack = nlp_models[model_name].process([docJson['textPack']])

    doc.textPack = processedPack.serialize()
    doc.save()

    return JsonResponse(model_to_dict(doc), safe=False)

