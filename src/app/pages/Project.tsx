import React, {useState, useEffect} from 'react';
import {
  fetchProject,
  createDocument,
  deleteDocument,
  fetchDocumentsProject,
  fetchDocumentsAndMultiPacksProject,
  createCrossDoc,
  deleteCrossDoc,
} from '../lib/api';
import {Link, useHistory} from 'react-router-dom';
import DropUpload from '../components/dropUpload';
import {FileWithPath} from 'react-dropzone';

function Docs() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projectInfo, setProjectInfo] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [docs, setDocs] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [crossdocs, setCrossDocs] = useState<any[]>();

  const history = useHistory();

  const project_id = window.location.pathname.split('/').pop()!;

  useEffect(() => {
    getProjectInfo();
    //   .catch(() => {
    //   history.push('/login');
    // });
  }, [history]);

  function getProjectInfo() {
    const project_id = window.location.pathname.split('/').pop()!;
    return fetchProject(project_id).then(info => {
      setProjectInfo(info);
      updateDocs(info);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function updateDocs(info: any) {
    if (info.project_type === 'single_pack') {
      return fetchDocumentsProject(project_id).then(docs => {
        setDocs(docs);
      });
    } else if (info.project_type === 'crossdoc') {
      return fetchDocumentsAndMultiPacksProject(project_id).then(result => {
        setDocs(result.docs);
        setCrossDocs(result.crossdocs);
      });
    }
  }
  function handleSinglePackAdd(filesToUpload: FileWithPath[]) {
    filesToUpload.forEach(f => {
      const reader = new FileReader();
      reader.readAsText(f);
      reader.onload = function () {
        createDocument(f.name, reader.result as string, project_id).then(() => {
          updateDocs(projectInfo);
        });
      };
    });
  }

  function handleMultiPackAdd(filesToUpload: FileWithPath[]) {
    filesToUpload.forEach(f => {
      const reader = new FileReader();
      reader.readAsText(f);
      reader.onload = function () {
        createCrossDoc(f.name, reader.result as string, project_id).then(() => {
          updateDocs(projectInfo);
        });
      };
    });
  }
  function handleSinglePackDelete(id: string) {
    deleteDocument(id).then(() => {
      updateDocs(projectInfo);
    });
  }
  function handleMultiPackDelete(id: string) {
    deleteCrossDoc(id).then(() => {
      updateDocs(projectInfo);
    });
  }

  return (
    <div className="content">
      <div className="content_left">
        <h2>All docs:</h2>
        {docs
          ? docs.map(d => (
              <ul key={d.id}>
                <li>
                  <Link to={`/documents/${d.id}`}>{d.name}</Link>{' '}
                  <button onClick={() => handleSinglePackDelete(d.id)}>
                    X
                  </button>
                </li>
              </ul>
            ))
          : 'Empty'}
      </div>

      <div>
        <h2>new pack</h2>
        <DropUpload
          fileLimit={5e7}
          fileActionButtonFunc={handleSinglePackAdd}
          fileActionButtonText={'ADD'}
          mimeType="application/json"
          // Do not support zip now.
          // mimeType='application/json, application/x-rar-compressed, application/octet-stream, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip'
          allowMultiple={true}
        />
      </div>

      {projectInfo && projectInfo.project_type === 'crossdoc'
        ? [
            <div className="content_left" style={{marginLeft: '20px'}}>
              <h2>All multi docs:</h2>
              {crossdocs
                ? crossdocs.map(d => (
                    <ul key={d.id}>
                      <li>
                        <Link to={`/crossdocs/${d.id}`}>{d.name}</Link>{' '}
                        <button onClick={() => handleMultiPackDelete(d.id)}>
                          X
                        </button>
                      </li>
                    </ul>
                  ))
                : 'Empty'}
            </div>,
            <div>
              <h2> new multi pack </h2>
              <DropUpload
                fileLimit={5e8}
                fileActionButtonFunc={handleMultiPackAdd}
                fileActionButtonText={'ADD'}
                mimeType="application/json"
                // Do not support zip now.
                // mimeType='application/json, application/x-rar-compressed, application/octet-stream, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip'
                allowMultiple={true}
              />
            </div>,
          ]
        : null}
    </div>
  );
}

export default Docs;
