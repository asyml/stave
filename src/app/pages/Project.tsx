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

  useEffect(() => {
    getProjectInfo().catch(() => {
      history.push('/login');
    });
  }, [history]);

  useEffect(() => {
    updateDocs();
  }, [projectInfo]);

  function getProjectInfo() {
    const project_id = window.location.pathname.split('/').pop()!;
    return fetchProject(project_id).then(info => {
      setProjectInfo(info);
    });
  }
  function updateDocs() {
    if (projectInfo) {
      const project_id = window.location.pathname.split('/').pop()!;
      if (projectInfo.project_type === 'indoc') {
        return fetchDocumentsProject(project_id).then(docs => {
          setDocs(docs);
        });
      } else if (projectInfo.project_type === 'crossdoc') {
        return fetchDocumentsAndMultiPacksProject(project_id).then(result => {
          console.log(result);
          setDocs(result.docs);
          setCrossDocs(result.crossdocs);
        });
      }
    }
  }
  function handleAdd(filesToUpload: FileWithPath[], pack_type = 'single_pack') {
    const project_id = window.location.pathname.split('/').pop()!;
    if (pack_type === 'single_pack') {
      filesToUpload.forEach(f => {
        const reader = new FileReader();
        reader.readAsText(f);
        reader.onload = function () {
          createDocument(f.name, reader.result as string, project_id).then(
            () => {
              updateDocs();
            }
          );
        };
      });
    } else if (pack_type === 'multi_pack') {
      filesToUpload.forEach(f => {
        const reader = new FileReader();
        reader.readAsText(f);
        reader.onload = function () {
          createCrossDoc(f.name, reader.result as string, project_id).then(
            () => {
              updateDocs();
            }
          );
        };
      });
    }
  }

  function handleDelete(id: string, pack_type = 'single_pack') {
    if (pack_type === 'single_pack') {
      deleteDocument(id).then(() => {
        updateDocs();
      });
    } else if (pack_type === 'multi_pack') {
      deleteCrossDoc(id).then(() => {
        updateDocs();
      });
    }
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
                  <button onClick={() => handleDelete(d.id, 'single_pack')}>
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
          fileActionButtonFunc={(file: FileWithPath[]) =>
            handleAdd(file, 'single_pack')
          }
          fileActionButtonText={'ADD'}
          mimeType="application/json"
          // Do not support zip now.
          // mimeType='application/json, application/x-rar-compressed, application/octet-stream, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip'
          allowMultiple={true}
        />
      </div>

      {projectInfo && projectInfo.project_type === 'crossdoc' ? (
        <div className="content_left" style={{marginLeft: '20px'}}>
          <h2>All multi docs:</h2>
          {crossdocs
            ? crossdocs.map(d => (
                <ul key={d.id}>
                  <li>
                    <Link to={`/crossdocs/${d.id}`}>{d.name}</Link>{' '}
                    <button onClick={() => handleDelete(d.id, 'multi_pack')}>
                      X
                    </button>
                  </li>
                </ul>
              ))
            : 'Empty'}
        </div>
      ) : null}
      {projectInfo && projectInfo.project_type === 'crossdoc' ? (
        <div>
          <h2> new multi pack </h2>
          <DropUpload
            fileLimit={5e7}
            fileActionButtonFunc={(file: FileWithPath[]) =>
              handleAdd(file, 'multi_pack')
            }
            fileActionButtonText={'ADD'}
            mimeType="application/json"
            // Do not support zip now.
            // mimeType='application/json, application/x-rar-compressed, application/octet-stream, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip'
            allowMultiple={true}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Docs;
