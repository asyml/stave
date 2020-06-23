"""nlpviewer_backend URL Configuration

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
from nlpviewer_backend.handlers import session, user, document, crossdoc, homepage

urlpatterns = [
    path('', homepage.index),

    path('api/login', session.login),
    path('api/logout', session.logout),
    path("api/login-amazon-turk", session.login_amazon_turk),

    path('api/users', user.listAll),
    path('api/users/new', user.create),
    path('api/users/<int:user_id>', user.query),
    path('api/users/<int:user_id>/edit', user.edit),
    path('api/users/<int:user_id>/delete', user.delete),

    path('api/documents', document.listAll),
    path('api/documents/new', document.create),
    path('api/documents/<int:document_id>', document.query),
    path('api/documents/<int:document_id>/edit', document.edit),
    path('api/documents/<int:document_id>/delete', document.delete),

    path('api/documents/<int:document_id>/annotations/new', document.new_annotation),
    path('api/documents/<int:document_id>/annotations/<int:annotation_id>/edit',
         document.edit_annotation),
    path('api/documents/<int:document_id>/annotations/<int:annotation_id>/delete',
         document.delete_annotation),

    path('api/documents/<int:document_id>/links/new', document.new_link),
    path('api/documents/<int:document_id>/links/<int:link_id>/edit', document.edit_link),
    path('api/documents/<int:document_id>/links/<int:link_id>/delete',
         document.delete_link),

    path('api/crossdocs', crossdoc.listAll),
    path('api/crossdocs/<int:crossDocAnno_id>', crossdoc.query),
    path('api/crossdocs/<int:crossDocAnno_id>/links/new', crossdoc.new_cross_doc_link),
    path('api/crossdocs/<int:crossDocAnno_id>/links/<int:link_id>/delete', crossdoc.delete_cross_doc_link),
    path('admin/', admin.site.urls),
]
