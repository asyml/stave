from django.apps import AppConfig
from django.conf import settings
import os, json
from os import listdir
from os.path import isfile, join


index_file_path = os.path.join(settings.BASE_DIR, "pack.idx")


class MyAppConfig(AppConfig):
    name = 'nlpviewer_backend'
    verbose_name = "Backend for NLPViewer"
    def ready(self):
        from .models import Document, User, CrossDoc
        with open(os.path.join(settings.BASE_DIR, "pack_ontology.json")) as f:
            pack_ontology = json.load(f)

        with open(os.path.join(settings.BASE_DIR, "multi_ontology.json")) as f:
            multi_ontology = json.load(f)

        # read all packs
        all_packs = listdir(os.path.join(settings.BASE_DIR, "packs"))
        for pack in all_packs:
            # if does not exist, add it to the database
            if not Document.objects.filter(name=pack).exists():
                with open(os.path.join(settings.BASE_DIR, "packs",pack)) as f:
                    print("new one", pack)
                    text_pack = json.load(f)
                    new_object = Document()
                    new_object.name = pack
                    new_object.textPack = json.dumps(text_pack)
                    new_object.ontology = json.dumps(pack_ontology)
                    new_object.save()

        # read all multi
        all_multi = listdir(os.path.join(settings.BASE_DIR, "multi"))
        for multi in all_multi:
            # if does not exist, add it to the database
            if not CrossDoc.objects.filter(name=multi).exists():
                with open(os.path.join(settings.BASE_DIR, "multi",multi)) as f:
                    print("new one", multi)
                    text_pack = json.load(f)
                    new_object = CrossDoc()
                    new_object.name = multi
                    new_object.textPack = json.dumps(text_pack)
                    new_object.ontology = json.dumps(multi_ontology)
                    new_object.save()





def read_multipack_index(index_file):
    extid_to_name = {}
    with open(index_file) as f:
        for line in f:
            pairs = line.strip().split()
            external_id = int(pairs[0])
            file_name = pairs[1]
            extid_to_name[external_id] = file_name
    return extid_to_name

