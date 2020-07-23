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
import SignUp from './pages/SignUp';
import Ontology from './pages/Ontology';
import Viewer from './pages/Viewer';
import Documents from './pages/Documents';
import Projects from './pages/Projects'
import Project from './pages/Project'
import Users from './pages/Users';
import { logout } from './lib/api';

import { singlePack } from './mock-data-2';
import { ontology } from './mock-config-data';
import {layout} from './layout';
import NLPViewer from '../nlpviewer';
import groupPlugin from '../plugins/group/Group';
import dialogueBoxPlugin from '../plugins/dialogue_box/DialogueBox';

const initialState = { state: 0 };
export const { Provider: AppProvider, Consumer: AppConsumer } = React.createContext(initialState);

function App() {
  return (
    <Router>
      <div>
        <header className="layout_header">
          <span>Stave</span>

          <nav>
            <ul>
              {/* <li>
                <Link to="/">All documents</Link>
              </li> */}
              <li>
                <Link to="/users">All Users</Link>
              </li>
              <li>
                <Link to="/projects">All Projects</Link>
              </li>
            </ul>
          </nav>

          <Logout />
        </header>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/documents/:id">
            <Viewer />
          </Route>          

          <Route path="/ontology/:id">
            <Ontology />
          </Route>

          <Route path="/projects">
            <Projects />
          </Route>

          <Route path="/project/:id">
            <Project />
          </Route>

          <Route path="/">
            <Projects />
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
      plugins={[groupPlugin, dialogueBoxPlugin]}
      layout={layout}
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

let EntryComponent = App;

if (process.env.REACT_APP_IS_DEMO === ('true' as any)) {
  EntryComponent = ViewWithDemoData;
}

export default EntryComponent;
