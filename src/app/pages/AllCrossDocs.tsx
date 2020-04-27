import React, { useState, useEffect } from 'react';
import { fetchCrossDocs, createDocument, deleteDocument } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';

function AllCrossDocs() {
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
    return fetchCrossDocs().then(docs => {
      setDocs(docs);
    });
  }

  // function handleAdd() {
  //   createDocument(name, pack, "null").then(() => {
  //     updateDocs();
  //   });
  // }
  //
  // function handleDelete(id: string) {
  //   deleteDocument(id).then(() => {
  //     updateDocs();
  //   });
  // }

  if (!docs.length) return null;

  return (
    <div className="content">
      <div className="content_left">
        <h2>All cross doc packs:</h2>
        {docs.map(d => (
          <ul key={d.id}>
            <li>
              <Link to={`/crossdocs/${d.id}`}>{d.name}</Link>{' '}
              {/*<button onClick={() => handleDelete(d.id)}>X</button>*/}
            </li>
          </ul>
        ))}
      </div>

      {/*<div>*/}
      {/*  <h2>new pack</h2>*/}
      {/*  <div>*/}
      {/*    <input*/}
      {/*      placeholder="name"*/}
      {/*      value={name}*/}
      {/*      onChange={e => setName(e.target.value)}*/}
      {/*      name="name"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <textarea*/}
      {/*      placeholder="text pack body"*/}
      {/*      value={pack}*/}
      {/*      onChange={e => setPack(e.target.value)}*/}
      {/*      name="textpack"*/}
      {/*      id=""*/}
      {/*      cols={30}*/}
      {/*      rows={10}*/}
      {/*    ></textarea>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <button onClick={handleAdd}>Add</button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default AllCrossDocs;
