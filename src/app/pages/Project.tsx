import React, { useState, useEffect } from 'react';
import { createDocument, deleteDocument, fetchDocumentsProject } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';

function Docs() {
  const [docs, setDocs] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
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
    createDocument(name, pack, project_id).then(() => {
      updateDocs();
    });
  }

  function handleDelete(id: string) {
    deleteDocument(id).then(() => {
      updateDocs();
    });
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files !== null){
      let file = e.target.files[0];
      let reader = new FileReader();
        reader.onload = function(e) {
        if(e.target !== null){
          if(typeof e.target.result === 'string'){
            setPack(e.target.result);
          }
        }
      };
      reader.readAsText(file);
    }
   
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
      <h2>new document</h2>
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
          <label>Edit textbox or upload text pack file (.txt): <br/></label>
          <input type="file" accept=".txt" onChange={e => onFileChange(e)} />
        </div>
        <br></br>
        <div>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Docs;
