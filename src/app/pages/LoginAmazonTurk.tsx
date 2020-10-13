import React, { useState } from 'react';
import { loginTurk, viewerLogin } from '../lib/api';
import { useHistory } from 'react-router-dom';
import style from "../../crossviewer/styles/TextViewer.module.css";
import ReactModal from "react-modal";
import ConsentForm from "../components/ConsentFrom";

function LoginAmazonTurk() {
  const [turkID, setTurkID] = useState<string>('');
  const [adminCode, setAdminCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');
  const [agreementOpen, setAgreementOpen] = useState<boolean>(true);

  const history = useHistory();

  function handleLogin(e: any) {
    e.preventDefault();
    loginTurk(turkID)
      .then(json_data => {
        history.push( {
          pathname: '/crossdocs/'+json_data.id,
        });
      })
      .catch(e => {
        setError('You are not assigned to any tasks');
      });
  }
  function handleViewerLogin(e: any) {
    e.preventDefault();
    viewerLogin(adminCode)
      .then(json_data => {
        history.push( '/crossdocsviewer');
      })
      .catch(e => {
        setAdminError('wrong secret code');
      });
  }

  function clickAgree() {
    setAgreementOpen(false);
  }

  return (
    <div>
      <ReactModal isOpen={agreementOpen} className={style.modal} overlayClassName={style.modal_overlay}>
        <ConsentForm onEvent={clickAgree}/>
      </ReactModal>
      <h2>Input your Turk ID</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            placeholder="Turk ID"
            onChange={e => setTurkID(e.target.value)}
            value={turkID}
            name="turk_id"
          />
        </div>
        {error ? <div>{error}</div> : null}
        <button onClick={handleLogin}>login</button>
      </form>

      <h2 style={{marginTop: "8rem"}}>Annotation Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            placeholder="admin secret code"
            onChange={e => setAdminCode(e.target.value)}
            value={adminCode}
            name="secretCode"
          />
        </div>
        {adminError ? <div>{adminError}</div> : null}
        <button onClick={handleViewerLogin}>login</button>
      </form>
    </div>

  );
}

export default LoginAmazonTurk;
