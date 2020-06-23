from django.apps import AppConfig
from django.conf import settings
import os, json, sys
from os import listdir
from os.path import isfile, join

pack_ontology_path = os.path.join(settings.BASE_DIR, "initial_data", "pack_ontology.json")
multi_ontology_path = os.path.join(settings.BASE_DIR, "initial_data", "multi_ontology.json")
pack_index_path = os.path.join(settings.BASE_DIR, "initial_data", "pack.idx")
multi_index_path = os.path.join(settings.BASE_DIR, "initial_data", "multi.idx")
pack_folder = os.path.join(settings.BASE_DIR, "initial_data", "packs")
multi_folder = os.path.join(settings.BASE_DIR, "initial_data", "multi")


class MyAppConfig(AppConfig):
    name = 'nlpviewer_backend'
    verbose_name = "Backend for NLPViewer"
    def ready(self):
        from .models import Document, User, CrossDoc
        with open(pack_ontology_path) as f:
            pack_ontology = json.load(f)

        with open(multi_ontology_path) as f:
            multi_ontology = json.load(f)

        # read all packs

        pack_mapping = read_index_file(pack_index_path)
        multi_mapping = read_index_file(multi_index_path)

        for _, pack in pack_mapping.items():
            # if does not exist, add it to the database
            if not Document.objects.filter(name=pack).exists():
                with open(os.path.join(pack_folder, pack)) as f:
                    print("new one", pack)
                    text_pack = json.load(f)
                    new_object = Document()
                    new_object.name = pack
                    new_object.textPack = json.dumps(text_pack)
                    new_object.ontology = json.dumps(pack_ontology)
                    new_object.save()

        # read all multi
        for _, multi in multi_mapping.items():
            # if does not exist, add it to the database
            if not CrossDoc.objects.filter(name=multi).exists():
                with open(os.path.join(multi_folder, multi)) as f:
                    print("new one", multi)
                    text_pack = json.load(f)
                    new_object = CrossDoc()
                    new_object.name = multi
                    new_object.textPack = json.dumps(text_pack)
                    new_object.ontology = json.dumps(multi_ontology)
                    new_object.save()
        return





def read_index_file(index_file):
    extid_to_name = {}
    with open(index_file) as f:
        for line in f:
            pairs = line.strip().split()
            external_id = int(pairs[0])
            file_name = pairs[1].split("/")[-1]
            extid_to_name[external_id] = file_name
    return extid_to_name

