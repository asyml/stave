import React, { useState } from 'react';
import { loginTurk } from '../lib/api';
import { useHistory } from 'react-router-dom';

function LoginAmazonTurk() {
  const [turkID, setTurkID] = useState<string>('');
  const [error, setError] = useState<string>('');

  const history = useHistory();

  function handleLogin(e: any) {
    e.preventDefault();
    loginTurk(turkID)
      .then(json_data => {
        history.push( '/crossdocs/'+json_data.id);
      })
      .catch(e => {
        setError('login failed');
      });
  }

  return (
    <div>
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
