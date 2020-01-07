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
- go to http://127.0.0.1:8000/documents

## Route

### Document route

- GET `/documents`
  - return `{ id: string, name: string }[]`
- GET `/documents/[document_id]`
  - return `{ id: string, name: string }`
- POST `/documents/new`
  - params `{ name: string, textPack: string }`
  - return `{ id: string, name: string, textPack: string }`
- PUT `/documents/[document_id]/edit`
  - params `{ name?: string, textPack?: string }`
  - return `{ name: string, textPack: string }`
- DELETE `/documents/[document_id]`

### User route

- GET `/users`
  - return `{ id: string, name: string }[]`
- GET `/users/[user_id]`
  - return `{ id: string, name: string }`
- POST `/users/new`
  - params `{ name: string, password: string }`
  - return `{ id: string, name: string }`
- PUT `/users/[user_id]/edit`
  - params `{ name: string, password: string }`
  - return `{ id: string, name: string }`
- DELETE `/users/[user_id]`

### Session route

- POST `/login`
  - params `{ name: string, password: string}`
- POST `/logout`
