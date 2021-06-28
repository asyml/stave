"""stave_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from stave_backend.handlers import session, user, document, project, nlp, crossdoc

urlpatterns = [
    path('login', session.login),
    path('logout', session.logout),
    path('signup', user.signup),

    path('users', user.listAll),
    path('users/new', user.create),
    path('users/<int:user_id>', user.query),
    path('users/<int:user_id>/edit', user.edit),
    path('users/<int:user_id>/delete', user.delete),

    path('documents', document.listAll),
    path('documents/new', document.create),
    path('documents/<int:document_id>', document.query),
    path('documents/<int:document_id>/edit', document.edit),
    path('documents/<int:document_id>/delete', document.delete),
    path('documents/<int:document_id>/edit_ontology', document.edit_ontology),

    path('documents/<int:document_id>/annotations/new', document.new_annotation),
    path('documents/<int:document_id>/annotations/<int:annotation_id>/edit',
         document.edit_annotation),
    path('documents/<int:document_id>/annotations/<int:annotation_id>/delete',
         document.delete_annotation),

    path('documents/<int:document_id>/links/new', document.new_link),
    path('documents/<int:document_id>/links/<int:link_id>/edit', document.edit_link),
    path('documents/<int:document_id>/links/<int:link_id>/delete',
         document.delete_link),

    path('documents/<int:document_id>/complete', document.query_or_create_job),

    path('crossdocs/new', crossdoc.create),
    path('crossdocs/<int:crossdoc_id>/delete', crossdoc.delete),
    
    path('next_doc/<int:document_id>', document.get_next_document_id),
    path('prev_doc/<int:document_id>', document.get_prev_document_id),

    path('projects/all', project.listAll),
    path('projects', project.list_user_projects),
    path('projects/new', project.create),
    path('projects/<int:project_id>', project.query),
    path('projects/<int:project_id>/docs', project.query_docs),
    path('projects/<int:project_id>/crossdocs', project.query_crossdocs),
    path('projects/<int:project_id>/delete', project.delete),
    path('projects/import', project.import_project),
    path('projects/<int:project_id>/export', project.export_project),

    path('documents/<int:document_id>/text/edit', document.edit_text),   

    path('ontology_from_doc/<int:document_id>', document.get_doc_ontology_pack),
    path('config_from_doc/<int:document_id>', document.get_doc_project_config),

    path('nlp/load', nlp.load_model),
    path('nlp/<int:document_id>', nlp.run_pipeline),

    path('admin/', admin.site.urls),
]
