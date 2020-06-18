import React, { useState } from 'react';
import { signup } from '../lib/api';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  function handleSignUp(e: any) {
    e.preventDefault();
    signup(username, password)
      .then(e => {
        history.push('/');
      })
      .catch(e => {
        setError('sign up failed');
      });
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <h3>Bienvenue</h3>

      <form onSubmit={handleSignUp}>

        <div>
          <h4>Your Username</h4>
          <input
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
            value={username}
            name="username"
          />
        </div>

        <div>
          <h4>Your Password</h4>
          <input
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>

        {error ? <div>{error}</div> : null}

        <br></br><button onClick={handleSignUp}>sign up</button>
      </form>
    </div>
  );
}

export default SignUp;
