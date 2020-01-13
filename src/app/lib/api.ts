interface APIDocument {
  id: string;
  textPack: string;
  ontology: string;
}

export function fetchDocuments(): Promise<any> {
  return fetch(`/api/documents`).then(r => r.json());
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

export function createDocument(
  name: string,
  textPack: string,
  ontology: string
) {
  return postData(`/api/documents/new`, {
    name: name,
    textPack: textPack,
    ontology: ontology,
  }).then(r => r.json());
}

export function deleteDocument(id: string) {
  return postData(`/api/documents/${id}/delete`);
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

export function login(name: string, password: string) {
  return postData(`/api/login`, {
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
