import React, { useState, useEffect } from 'react';
import { fetchDocument, fetchDocuments, APIDocument, updateOntology } from '../lib/api';
import { useHistory, Link } from 'react-router-dom';
import { Console } from 'console';

function Ontology() {
    const [docs, setDocs] = useState<APIDocument>();
    const [name, setName] = useState<string>('');
    const [pack, setPack] = useState<string>('');
    const [ontology, setOntology] = useState<string>('');
    const [edit_state, setEditState] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        updateDocs().catch(e => {
          history.push('/login');
        });
      }, [history]);
    
      function updateDocs() {
        
        let doc_id = window.location.pathname.split("/").pop();

        if (doc_id != undefined){
            return fetchDocument(doc_id).then(docs => {
                setOntology(docs.ontology);
            });
        }
        else{
            return fetchDocuments().then(docs => {
                setDocs(docs);
            });
        }
    }


  function redirectSignup(e: any) {
    history.push("/signup") 
  }

  function handleEditOntology() {
      let doc_id = window.location.pathname.split("/").pop();
      if (doc_id != undefined){
       updateOntology(doc_id , ontology).then(edit_state => {
        updateDocs();
        setEditState(edit_state);
        if(edit_state.status == 1){
            console.log('Save OK');
        }
        else{
            console.log('Save Failed'); 
        }
        
       });   
      }
  }

  console.log(ontology);

  if (ontology == undefined) return null;

  

  return (
    <div>
      <h2>Ontology</h2>

        <div>
          Editing Ontology ...
        </div>

        <div>
          
        </div>

        {/* <button onClick={redirectSignup}>reirect to sign up</button> */}
        <button onClick={handleEditOntology}>SAVE</button>

        <div className="content_left">
        <h2>Editing Ontology of document {window.location.pathname.split("/").pop()}</h2>    

            <textarea
            placeholder="ontology body"
            value={ontology}
            onChange={e => setOntology(e.target.value)}
            name="ontology"
            id=""
            cols={150}
            rows={60}
            > </textarea>

        </div>

    </div>

    
  );
}

export default Ontology;
