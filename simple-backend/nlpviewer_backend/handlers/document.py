from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
import uuid
import json
from ..models import Document, User, Project
from ..lib.require_login import require_login


@require_login
def listAll(request):
    """Lists all documents from the database.
    
    Retrieves all documents from the database
    The function is accessible for user with 'view' permission on documents

    Args:
        None

    Returns:
        A json response of the list of the documents or forbidden.
        example:

        [
         {"id": 42, "name": "project1-doc1-example", "project_id": 5, "textPack": "...", ...},
         {"id": 43, "name": "project2-doc1-example", "project_id": 9, "textPack": "...", ...},
         ...
        ]
    """
    if not request.user.has_perm('nlpviewer_backend.viewer_document'):
        return HttpResponse('forbidden', status=403)
    
    documents = Document.objects.all().values()
    return JsonResponse(list(documents), safe=False)


@require_login
def create(request):
    """Creates a new document.
    
    Creates a new document.
    The function is accessible for users with 'add' permission

    Args:
        None

    Returns:
        A json response of the id of the newly created document or forbidden.
        example:

            {"id": 4}
    """
    if not request.user.has_perm('nlpviewer_backend.add_document'):
        return HttpResponse('forbidden', status=403)

    received_json_data = json.loads(request.body)

    doc = Document(
        name=received_json_data.get('name'),
        textPack=received_json_data.get('textPack'),
        project = Project.objects.get(
            pk=received_json_data.get('project_id')
        )
    )
    doc.save()

    return JsonResponse({"id": doc.id}, safe=False)

# TODO - not called, thus not verified
@require_login
def edit(request, document_id):
    """Edits a document, queried by id.
    
    Edits a document, queried by id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project

    Args:
        document_id:
            The id of the document.

    Returns:
        A json response of the modified document or forbidden or not found.
        example:

            {"id": 42, "name": "project1-doc1-example", "project_id": 5, "textPack": "...", ...}    
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)
    
    received_json_data = json.loads(request.body)

    doc.name = received_json_data.get('name')
    doc.textPack = received_json_data.get('textPack')
    doc.save()

    docJson = model_to_dict(doc)
    return JsonResponse(docJson, safe=False)

# TODO - need rewrite and not called
@require_login
def edit_ontology(request, document_id):
    try:
        doc = Document.objects.get(pk=document_id)
        received_json_data = json.loads(request.body)

        doc.ontology = received_json_data.get('ontology')
        doc.save()

        status = 1
    except:
        status = 0

    docJson = {
        'id': document_id,
        'status': status
    }
    return JsonResponse(docJson, safe=False)


@require_login
def query(request, document_id):
    """Retrieves a document by id.
    
    Retrieves a document by id.
    The function is accessible for users with 'view' or 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.

    Returns:
        A json response of the modified document or forbidden or not found.
        example:

            {"id": 42, "name": "project1-doc1-example", "project_id": 5, "textPack": "...", ...}    
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if (not request.user.has_perm('nlpviewer_backend.viewer_project', doc.project) and
     not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and
     request.user != doc.project.user):
        return HttpResponse('forbidden', status=403)

    docJson = model_to_dict(
        doc)
    return JsonResponse(docJson, safe=False)


@require_login
def delete(request, document_id):
    """Deletes a document by id.
    
    Deletes a document by id.
    The function is accessible for users with 'delete' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.

    Returns:
        ok if succeeded, otherwise forbidden or not found    
    """
    
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.delete_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)

    doc.delete()

    return HttpResponse('ok')


@require_login
def edit_text(request, document_id):
    """Edits the text pack of a document, queried by id.
    
    Edits the text pack of a document, queried by id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project.
    Args:
        document_id:
            The id of the document.

    Returns:
        ok if succeeded, otherwise forbidden or not found 
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)

    data = json.loads(request.body)
    
    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    textPackJson['py/state']['_text'] = data['new_text']
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')

@require_login
def new_annotation(request, document_id):
    """Adds a annotation, queried by document id.
    
    Edits the text pack of a document, queried by id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project.
    Args:
        document_id:
            The id of the document.

    Returns:
        id of the document in json if succeeded, otherwise forbidden or not found 
        example:
            {"id": 1}
    """
    # get pack from db
    # generate a annotation id
    # add id to received annotation data
    # insert the annotation data into pack
    # - get text pack from dock
    # - parse text pack to json
    # - append annotation to annotations in json
    # - stringify the updated json and update the textPack in doc
    # - save back to doc

    # Example post data
    # {
    #     "py/object": "forte.data.ontology.base_ontology.EntityMention",
    #     "py/state": {
    #         "_span": {
    #             "begin": 0,
    #             "end": 8,
    #             "py/object": "forte.data.span.Span"
    #         },
    #         "_tid": 1,
    #         "ner_type": "DATE"
    #     }
    # }

    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)



    doc = Document.objects.get(pk=document_id)
    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    annotation_id = textPackJson['py/state']['serialization']['next_id']
    textPackJson['py/state']['serialization']['next_id'] = annotation_id + 1

    received_json_data = json.loads(request.body)
    annotation = received_json_data.get('data')
    annotation["py/state"]['_tid'] = annotation_id

    textPackJson['py/state']['annotations'].append(annotation)
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return JsonResponse({"id": annotation_id}, safe=False)

# TODO - not called, thus not verified
@require_login
def edit_annotation(request, document_id, annotation_id):
    received_json_data = json.loads(request.body)

    # get pack from db
    # find annotation from pack
    # - return error if not found
    # update annotation with received annotation data
    # save to db
    # return OK

    """Edits an annotation, queried by document id and annotation id.
    
    Edits an annotation, queried by document id and annotation id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.
        annotation_id:
            The id of the annotation.

    Returns:
       OK if succeeded, otherwise forbidden or not found 
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)


    received_json_data = json.loads(request.body)
    annotation = received_json_data.get('data')

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    for index, item in enumerate(textPackJson['py/state']['annotations']):
        if item["py/state"]['_tid'] == annotation_id:
            textPackJson['py/state']['annotations'][index] = annotation

    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')

@require_login
def delete_annotation(request, document_id, annotation_id):
    """Deletes an annotation, queried by document id and annotation id.
    
    Deletes an annotation, queried by document id and annotation id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.
        annotation_id:
            The id of the annotation.

    Returns:
       OK if succeeded, otherwise forbidden or not found 
    """

    # get pack from db
    # remove annotation with id from pack
    # save to db
    # return OK

    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.delete_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    deleteIndex = -1
    for index, item in enumerate(textPackJson['py/state']['annotations']):
        if item["py/state"]['_tid'] == annotation_id:
            deleteIndex = index

    del textPackJson['py/state']['annotations'][deleteIndex]
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')
    # return JsonResponse(model_to_dict(doc), safe=False)


@require_login
def new_link(request, document_id):
    """Adds a link, query by document id.
    
    Adds a link, query by document id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.

    Returns:
       id of the new annotation if succeeded, otherwise forbidden or not found.
       example:

        {"id": 1}
    """

    # get pack from db
    # generate a link id
    # add id to received link data
    # insert the link data into pack
    # save to db
    # return id

    # example post data
    # {
    #     "py/object": "forte.data.ontology.base_ontology.PredicateLink",
    #     "py/state": {
    #       "_child": 5,
    #       "_parent": 10,
    #       "_tid": 34,
    #       "arg_type": "ARG0"
    #     }
    #   }

    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)

    received_json_data = json.loads(request.body)

    link_id = str(uuid.uuid1())
    link = received_json_data.get('data')
    link["py/state"]['_tid'] = link_id

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])
    textPackJson['py/state']['links'].append(link)
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return JsonResponse({"id": link_id}, safe=False)


@require_login
def edit_link(request, document_id, link_id):
    """Edits a link, queried by document id and link id.
    
    Edits a link, queried by document id and link id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.
        link_id:
            The id of the link.

    Returns:
       OK if succeeded, otherwise forbidden or not found.
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)

    received_json_data = json.loads(request.body)
    link = received_json_data.get('data')

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    for index, item in enumerate(textPackJson['py/state']['links']):
        if item["py/state"]['_tid'] == link_id:
            textPackJson['py/state']['links'][index] = link

    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')


@require_login
def delete_link(request, document_id, link_id):
    """Deletes a link, queried by document id and link id.
    
    Deletes a link, queried by document id and link id.
    The function is accessible for users with 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.
        link_id:
            The id of the link.

    Returns:
       OK if succeeded, otherwise forbidden or not found.
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and request.user != doc.project.user:
        return HttpResponse('forbidden', status=403)

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    deleteIndex = -1
    for index, item in enumerate(textPackJson['py/state']['links']):
        if item["py/state"]['_tid'] == link_id:
            deleteIndex = index

    del textPackJson['py/state']['links'][deleteIndex]
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')

@require_login
def get_doc_ontology_pack(request, document_id):
    """Gets document pack + ontology by document id
    
    Deletes a link, queried by document id and link id.
    The function is accessible for users with 'view' or 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.
        link_id:
            The id of the link.

    Returns:
       json of the doc if succeeded, otherwise forbidden or not found.

       example:

            {"id":1 , 'textPack': "sample", "ontology": "sample"}
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
        project = doc.project
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if (not request.user.has_perm('nlpviewer_backend.viewer_project', doc.project) and
     not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and
     request.user != doc.project.user):
        return HttpResponse('forbidden', status=403)


    docJson = {
        'id': document_id,
        'textPack': doc.textPack,
        'ontology': project.ontology
    }

    return JsonResponse(docJson, safe=False)

@require_login
def get_next_document_id(request, document_id):
    """Gets the id of the next document, by the current document's id
    
    Gets the id of the next document, by the current document's id
    The function is accessible for users with 'view' or 'editor' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.

    Returns:
       If there is no next document, returns the current document id, else returns the next id.
       The return value is converted to string.
       Or forbidden or not found.

       example:

            {"id": "1"}
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
        project = doc.project
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if (not request.user.has_perm('nlpviewer_backend.viewer_project', doc.project) and
     not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and
     request.user != doc.project.user):
        return HttpResponse('forbidden', status=403)

    docs = project.documents
    next_doc = docs.filter(id__gt=document_id).first()
    if next_doc:
        next_id = next_doc.id
    else:
        next_id = document_id
    return JsonResponse({'id': str(next_id)}, safe=False)

@require_login
def get_prev_document_id(request, document_id):
    """Gets the id of the previous document, by the current document's id
    
    Gets the id of the previous document, by the current document's id
    The function is accessible for users with 'view' permission of the project and the owner of the project.

    Args:
        document_id:
            The id of the document.

    Returns:
       If there is no previous document, returns the current document id, else returns the previous id.
       The return value is converted to string.
       Or forbidden or not found.

       example:

            {"id": "1"}
    """
    # if doc doen't exist
    try:
        doc = Document.objects.get(pk=document_id)
        project = doc.project
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)
    
    # check permissions
    if (not request.user.has_perm('nlpviewer_backend.viewer_project', doc.project) and
      not request.user.has_perm('nlpviewer_backend.editor_project', doc.project) and
      request.user != doc.project.user):
        return HttpResponse('forbidden', status=403)

    docs = project.documents
    prev_doc = docs.filter(id__lt=document_id).last()
    if prev_doc:
        prev_id = prev_doc.id
    else:
        prev_id = document_id
    return JsonResponse({'id': str(prev_id)}, safe=False)
