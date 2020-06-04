import React from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';

import LoginAmazonTurk from './pages/LoginAmazonTurk';
import Viewer from './pages/Viewer';
import CrossDoc from './pages/CrossDoc';
import Documents from './pages/Documents';
import Users from './pages/Users';
import { logout } from './lib/api';

import { singlePack } from './mock-data-2';
import { ontology } from './mock-config-data';
import NLPViewer from '../nlpviewer';
import groupPlugin from '../plugins/Group';
import AllCrossDocs from "./pages/AllCrossDocs";

function AppAmazonTurk() {
  let loggedIn = false;
  return (
    <Router>
      <div>
        <header className="layout_header">
          <span>NLP Viewer</span>
        </header>

        <Switch>
          <Route exact path="/" render={() => (
                  <Redirect to="/login"/>
          )}/>
          <Route path="/login">
            <LoginAmazonTurk />
          </Route>
          <Route path="/crossdocs/:id">
            <CrossDoc />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function ViewWithDemoData() {
  return (
    <NLPViewer
      textPack={singlePack}
      ontology={ontology}
      plugins={[groupPlugin]}
    />
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

let EntryComponent = AppAmazonTurk;

if (process.env.REACT_APP_IS_DEMO === ('true' as any)) {
  EntryComponent = ViewWithDemoData;
}

export default EntryComponent;
