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
from nlpviewer_backend.handlers import session, user, document

urlpatterns = [
    path('login', session.login),
    path('logout', session.logout),

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

    path('documents', document.listAll),
    path('documents/new', document.create),
    path('documents/<int:document_id>', document.query),
    path('documents/<int:document_id>/edit', document.edit),
    path('documents/<int:document_id>/delete', document.delete),

    path('documents/:document_id/annotations/new', document.new_annotation),
    path('documents/:document_id/annotations/:annotation_id/edit',
         document.edit_annotation),
    path('documents/:document_id/annotations/:annotation_id/delete',
         document.delete_annotation),

    path('documents/:document_id/link/new', document.new_link),
    path('documents/:document_id/link/:link_id/edit', document.edit_link),
    path('documents/:document_id/link/:link_id/delete', document.delete_link),

    path('admin/', admin.site.urls),
]
