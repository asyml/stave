interface APIDocument {
  id: string;
  textPack: string;
  ontology: string;
}
interface APICrossDocPack{
  id: string;
  textPack: string;
  ontology: string;
}
interface APICrossDoc {
  crossDocPack:APICrossDocPack;
  _parent: APIDocument;
  _child: APIDocument;
  nextCrossDocId : string;
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


export function loginTurk(turkID: string) {
  return postData(`/api/login-amazon-turk`, {
    turkID,
  }).then(r=>r.json());
}

export function addCrossLink(crossDocID: string, data: any) {
  return postData(`/api/crossdocs/${crossDocID}/links/new`, {
    data,
  }).then(r => r.json());
}

export function updateCrossLink(crossDocID: string, data: any) {
  return postData(`/api/crossdocs/${crossDocID}/links/update`, {
    data,
  }).then(r => r.json());;
}
export function deleteCrossLink(crossDocID: string, linkID:string) {
  return postData(`/api/crossdocs/${crossDocID}/links/${linkID}/delete`)
    .then(r => r.json());
}

export function fetchCrossDocs(): Promise<any> {
  return fetch(`/api/crossdocs`).then(r => r.json());
}
export function fetchCrossDoc(id: string): Promise<APICrossDoc>  {
  return fetch(`/api/crossdocs/${id}`).then(r => r.json());
}


let w: any = window;

w.postData = postData;
