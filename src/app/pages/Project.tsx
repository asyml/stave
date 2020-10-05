import React, { useState, useEffect } from 'react';
import { createDocument, deleteDocument, fetchDocumentsProject } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';
import DropUpload from '../components/dropUpload';
import { FileWithPath } from 'react-dropzone';

function Docs() {
  const [docs, setDocs] = useState<any[]>([]);

  const history = useHistory();

  useEffect(() => {
    updateDocs().catch(e => {
      history.push('/login');
    });
  }, [history]);

  function updateDocs() {
    let project_id = window.location.pathname.split("/").pop() !;

    return fetchDocumentsProject(project_id).then(docs => {
      setDocs(docs);
    });
  }

  function handleAdd(filesToUpload: FileWithPath[]) {
    let project_id = window.location.pathname.split("/").pop() !;

    filesToUpload.forEach(
      f => {
        const reader = new FileReader();
        reader.readAsText(f);      
        reader.onload = function() {
          createDocument(f.name, reader.result as string, project_id).then(()=> {
            updateDocs();
          })
        }
      }
    );
  }

  function handleDelete(id: string) {
    deleteDocument(id).then(() => {
      updateDocs();
    });
  }

  return (
    <div className="content">
      <div className="content_left">
        <h2>All docs:</h2>
        {
        docs ? docs.map(d => (
          <ul key={d.id}>
            <li>
              <Link to={`/documents/${d.id}`}>{d.name}</Link>{' '}
              <button onClick={() => handleDelete(d.id)}>X</button>
            </li>
          </ul>
        )) : 'Empty'}
      </div>

      <div>
      <h2>new pack</h2>
        <DropUpload 
          fileLimit={5e7}
          fileActionButtonFunc={handleAdd}
          fileActionButtonText={'ADD'}
          mimeType='application/json'
          // Do not support zip now.
          // mimeType='application/json, application/x-rar-compressed, application/octet-stream, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip'
          allowMultiple={true}
        />
      </div>
    </div>
  );
}

export default Docs;
