# NLP Viewer simple backend

A simple backend server application that manage documents and persist data.

## Features

- Create, Read, Update, and Delete (CRUD) Document
- CRUD User
- User login

## Run server

- `cd simple-backend`
- make sure your `python` command is using python3, or use a virtual env by:
  - `python3 -m venv venv` create virtual env (skip if already created)
  - `. venv/bin/activate` use virtual env
- make sure django is installded, or install it by:
  - `python -m pip install Django`
- `./start-dev.sh`
  - This script will use the example db: `mv db.sqlite3.example db.sqlite3`
- go to http://127.0.0.1:8000/documents

## Route

### Document route

- GET `/documents`
  - return `{ id: string, name: string }[]`
- GET `/documents/:document_id`
  - return `{ id: string, name: string, textPack: string, ontology: string }`
- POST `/documents/new`
  - params `{ name: string, textPack: string, ontology: string }`
  - return `{ id: string }`
- POST `/documents/:document_id/edit/name`
  - params `{ name: string }`
  - return `OK`
- POST `/documents/:document_id/edit/textpack`
  - params `{ textPack: string }`
  - return `OK`
- POST `/documents/:document_id/edit/ontology`
  - params `{ ontology: string }`
  - return `OK`
- POST `/documents/:document_id/delete`
  - return `OK`

### Annotation and link route

- POST `/documents/:document_id/annotations/new`
  - params `{ data: string (json) }`
  - return `{ id: string }`
- POST `/documents/:document_id/annotations/:annotation_id/edit`
  - params `{ data: string (json) }`
  - return `OK`
- POST `/documents/:document_id/annotations/:annotation_id/delete`
  - return `OK`
- POST `/documents/:document_id/links/new`
  - params `{ data: string (json) }`
  - return `{ id: string }`
- POST `/documents/:document_id/links/:link_id/edit`
  - params `{ data: string (json) }`
  - return `OK`
- POST `/documents/:document_id/links/:link_id/delete`
  - return `OK`

### User route

- GET `/users`
  - return `{ id: string, name: string }[]`
- GET `/users/:user_id`
  - return `{ id: string, name: string }`
- POST `/users/new`
  - params `{ name: string, password: string }`
  - return `OK`
- POST `/users/:user_id/edit`
  - params `{ name: string, password: string }`
  - return `OK`
- POST `/users/:user_id/delete`
  - return `OK`

### Session route

- POST `/login`
  - params `{ name: string, password: string}`
- GET `/logout`
