from django.test import TestCase
from nlpviewer_backend.models import Document, Project

class DocumentTestCase(TestCase):
    def setUp(self):
        a = Project.objects.create(name="project1")

        Document.objects.create(name="doc1", 
                                textPack='I am text pack',
                                ontology='I am ontology',
                                project = a)
        

    def test_project_relationship(self):
        #"""Animals that can speak are correctly identified"""
        doc1 = Document.objects.get(name="doc1")
        project1 = Project.objects.get(name="project1")
        project1.documents.first()
        self.assertEqual(doc1, project1.documents.first())
        self.assertEqual(project1, doc1.project)