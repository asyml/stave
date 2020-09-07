import React, { useState } from 'react';
import { loginTurk } from '../lib/api';
import { useHistory } from 'react-router-dom';
import style from "../../crossviewer/styles/TextViewer.module.css";
import ReactModal from "react-modal";

function LoginAmazonTurk() {
  const [turkID, setTurkID] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [agreementOpen, setAgreementOpen] = useState<boolean>(true);

  const history = useHistory();

  function handleLogin(e: any) {
    e.preventDefault();
    loginTurk(turkID)
      .then(json_data => {
        history.push( '/crossdocs/'+json_data.id);
      })
      .catch(e => {
        setError('you have finished all documents');
      });
  }

  function clickAgree() {
    setAgreementOpen(false);
  }

  return (
    <div>
      <ReactModal isOpen={agreementOpen} className={style.modal} overlayClassName={style.modal_overlay}>
        <div>
          Consent Form
        </div>
        <button onClick={clickAgree}> I Agree </button>
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
    </div>

  );
}

export default LoginAmazonTurk;
