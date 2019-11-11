# NLP Viewer simple backend

A simple backend server application that manage documents and persist data.

## Features

- Create, Read, Update, and Delete (CRUD) Document
- CRUD User
- User login

## Run server

- TODO

## Route

### Document route

- GET `/documents`
  - return `{ id: string, name: string }[]`
- GET `/documents/[document_id]`
  - return `{ id: string, name: string }`
- POST `/documents/[document_id]`
  - params `{ name: string, textPack: string }`
  - return `{ id: string, name: string, textPack: string }`
- PUT `/documents/[document_id]`
  - params `{ name: string, textPack: string }`
  - return `{ name: string, textPack: string }`
- DELETE `/documents/[document_id]`

### User route

- GET `/users`
  - return `{ id: string, name: string }[]`
- GET `/users/[user_id]`
  - return `{ id: string, name: string }`
- POST `/users/[user_id]`
  - params `{ name: string }`
  - return `{ id: string, name: string }`
- PUT `/users/[user_id]`
  - params `{ name: string, password: string }`
  - return `{ id: string, name: string }`
- DELETE `/users/[user_id]`

### Session route

- POST `/login`
  - params `{ id: string, password: string}`
- POST `/logout`
