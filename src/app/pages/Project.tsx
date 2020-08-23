import React, { useState, useEffect } from 'react';
import { createDocument, deleteDocument, fetchDocumentsProject } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';

function Docs() {
  const [docs, setDocs] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [ontology, setOntology] = useState<string>('');
  const [pack, setPack] = useState<string>('');
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

  function handleAdd() {

    let project_id = window.location.pathname.split("/").pop() !;
    createDocument(name, pack, ontology, project_id).then(() => {
      updateDocs();
    });
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
        <div>
          <input
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
          />
        </div>
        <div>
          <textarea
            placeholder="text pack body"
            value={pack}
            onChange={e => setPack(e.target.value)}
            name="textpack"
            id=""
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div>
          <textarea
            placeholder="ontology body"
            value={ontology}
            onChange={e => setOntology(e.target.value)}
            name="ontology"
            id=""
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Docs;
