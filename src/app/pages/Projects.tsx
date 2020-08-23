import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, deleteProject } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';
import {FileWithPath} from 'react-dropzone';
import DropUpload from '../components/dropUpload';


function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [ontology, setOntology] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    updateProjects().catch(e => {
      history.push('/login');
    });
  }, [history]);

  function updateProjects() {
    return fetchProjects().then(projects => {
      setProjects(projects);
    });
  }

  function handleAdd() {
    createProject(name, ontology).then(() => {
      updateProjects();
    });
  }

  function handleDelete(id: string) {
    deleteProject(id).then(() => {
      updateProjects();
    });
  }

  function userAddFiles(acceptedFiles: FileWithPath[]) {
    if (acceptedFiles.length > 0){    
      const reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);      
      reader.onload = function() {
        setOntology(reader.result as string);        
      }
    }
  }  

  return (
    <div className="content">
      <div className="content_left">
        <h2>All projects:</h2>
        {projects.map(d => (
          <ul key={d.id}>
            <li>
              <Link to={`/project/${d.id}`}>{d.name}</Link>{' '}
              <button onClick={() => handleDelete(d.id)}>X</button>
            </li>
          </ul>
        ))}
      </div>

      <div>
        <h2>new project</h2>
        <div>
          <input
            placeholder="Your Project Name"
            value={name}
            onChange={e => setName(e.target.value)}
            name="name"
          />
        </div>
        
        <div>
          <textarea
            placeholder="ontology body"
            value={ontology}
            onChange={e => setOntology(e.target.value)}
            name="ontology"
            id=""
            cols={50}
            rows={10}
          ></textarea>
        </div>

        <DropUpload
          fileLimit={1048576}
          filesAddedFunc={userAddFiles}
        />

        <div>
          <button onClick={handleAdd}>Add</button>
        </div>
      
      </div>
    </div>
  );
}

export default Projects;
