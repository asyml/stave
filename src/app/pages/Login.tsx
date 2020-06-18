import React, { useState } from 'react';
import { login } from '../lib/api';
import { useHistory } from 'react-router-dom';
import { AppProvider, AppConsumer } from '../App'

function Login() { 
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  function handleLogin(e: any) {
    e.preventDefault();
    login(username, password)
      .then(e => {
        history.push('/users');
      })
      .catch(e => {
        setError('login failed');
      });
  }

  function redirectSignup(e: any) {
    history.push("/signup") 
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
            value={username}
            name="username"
          />
        </div>

        <div>
          <input
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>

        {error ? <div>{error}</div> : null}

        <button onClick={handleLogin}>login</button>
        <button onClick={redirectSignup}>sign up</button>
      </form>
    </div>
  );
}

export default Login;
