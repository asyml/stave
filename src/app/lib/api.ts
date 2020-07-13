export interface APIDocument {
  id: string;
  textPack: string;
  ontology: string;
}

export function fetchDocuments(): Promise<any> {
  return fetch(`/api/documents`).then(r => r.json());
}

export function fetchProjects(): Promise<any> {
  return fetch(`/api/projects`).then(r => r.json());
}

export function fetchDocument(id: string): Promise<APIDocument> {
  return fetch(`/api/documents/${id}`).then(r => r.json());
}

export function updateDocument(id: string, name: string, textPack: string) {
  return postData(`/api/documents/${id}/edit`, {
    name: name,
    textPack: textPack,
  }).then(r => r.json());
}

export function updateOntology(id: string, ontology: string) {
  return postData(`/api/documents/${id}/edit_ontology`, {
    ontology: ontology,
  }).then(r => r.json());
}

export function createDocument(
  name: string,
  textPack: string,
  ontology: string,
  project_id: string
) {
  return postData(`/api/documents/new`, {
    name: name,
    textPack: textPack,
    ontology: ontology,
    project_id: project_id
  }).then(r => r.json());
}

export function createProject(
  name: string,
  ontology: string
) {
  return postData(`/api/projects/new`, {
    name: name,
    ontology: ontology,
  }).then(r => r.json());
}

export function deleteDocument(id: string) {
  return postData(`/api/documents/${id}/delete`);
}

export function deleteProject(id: string) {
  return postData(`/api/projects/${id}/delete`);
}

export function fetchDocumentsProject(id: string){
  return postData(`/api/projects/${id}/docs`).then(r => r.json());
}

export function fetchUsers() {
  return fetch(`/api/users`).then(r => r.json());
}

export function fetchUser(id: string) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

export function updateUser(id: string, name: string, password: string) {
  return postData(`/api/users/${id}/edit`, {
    name,
    password,
  }).then(r => r.json());
}

export function deleteUser(id: string) {
  return postData(`/api/users/${id}/delete`);
}

export function createUser(name: string, password: string) {
  return postData(`/api/users/new`, {
    name,
    password,
  }).then(r => r.json());
}

export function addAnnotation(documentId: string, data: any) {
  return postData(`/api/documents/${documentId}/annotations/new`, {
    data,
  }).then(r => r.json());
}

export function editAnnotation(
  documentId: string,
  annotationId: string,
  data: any
) {
  return postData(
    `/api/documents/${documentId}/annotations/${annotationId}/edit`,
    {
      data,
    }
  );
}

export function deleteAnnotation(documentId: string, annotationId: string) {
  return postData(
    `/api/documents/${documentId}/annotations/${annotationId}/delete`,
    {}
  );
}

export function addLink(documentId: string, data: any) {
  return postData(`/api/documents/${documentId}/links/new`, {
    data,
  }).then(r => r.json());
}

export function editLink(documentId: string, linkId: string, data: any) {
  return postData(`/api/documents/${documentId}/links/${linkId}/edit`, {
    data,
  });
}

export function deleteLink(documentId: string, linkId: string) {
  return postData(`/api/documents/${documentId}/links/${linkId}/delete`, {});
}

export function login(name: string, password: string) {
  return postData(`/api/login`, {
    name,
    password,
  });
}

export function signup(name: string, password: string) {
  return postData(`/api/signup`, {
    name,
    password,
  });
}

export function logout() {
  return fetch(`/api/logout`);
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  if (response.status >= 400) {
    throw new Error(response.statusText);
  } else {
    return response;
  }
}

let w: any = window;

w.postData = postData;
