import React from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import Login from './pages/Login';
import Viewer from './pages/Viewer';
import Documents from './pages/Documents';
import Users from './pages/Users';
import { logout } from './lib/api';

function App() {
  return (
    <Router>
      <div>
        <header className="layout_header">
          <span>NLP Viewer</span>

          <nav>
            <ul>
              <li>
                <Link to="/">All documents</Link>
              </li>
              <li>
                <Link to="/users">All Users</Link>
              </li>
            </ul>
          </nav>

          <Logout />
        </header>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/documents/:id">
            <Viewer />
          </Route>

          <Route path="/">
            <Documents />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Logout() {
  const history = useHistory();

  function handleLogout() {
    logout().then(() => {
      history.push('/login');
    });
  }
  return <button onClick={() => handleLogout()}>logout</button>;
}

let EntryComponent = App;

if (process.env.REACT_APP_IS_DEMO === ('true' as any)) {
  EntryComponent = Viewer;
}

export default EntryComponent;
