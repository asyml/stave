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
import CrossDoc from './pages/CrossDoc';
// import { logout } from './lib/api';

import { singlePack } from './mock-data-2';
import { ontology } from './mock-config-data';
import NLPViewer from '../nlpviewer';
import groupPlugin from '../plugins/Group';
import AllCrossDocs from "./pages/AllCrossDocs";
import AnnotationViewer from "../crossviewer/AnnotationViewer";
import CrossDocViewer from "./pages/CrossDocViewer";

function AppAmazonTurk() {
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
          <Route path="/crossdocsviewer/:id">
            <CrossDocViewer />
          </Route>
          <Route path="/crossdocsviewer">
            <AllCrossDocs />
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

// function Logout() {
//   const history = useHistory();
//
//   function handleLogout() {
//     logout().then(() => {
//       history.push('/login');
//     });
//   }
//   return <button onClick={() => handleLogout()}>logout</button>;
// }

let EntryComponent = AppAmazonTurk;

if (process.env.REACT_APP_IS_DEMO === ('true' as any)) {
  EntryComponent = ViewWithDemoData;
}

export default EntryComponent;
