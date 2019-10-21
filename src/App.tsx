import React, { useEffect } from 'react';
import './styles/normalize.css';
import './styles/global.css';
import './lib/log';
import TextViewer from './components/TextViewer';
import {
  TextViewerProvider,
  useTextViewerDispatch,
  useTextViewerState,
} from './contexts/text-viewer.context';
import { singlePack } from './lib/mock-data-2';
import { ontology } from './lib/mock-config-data';

function App() {
  return (
    <TextViewerProvider>
      <TextViewerFetchContainer />
    </TextViewerProvider>
  );
}

function TextViewerFetchContainer() {
  const dispatch = useTextViewerDispatch();
  const state = useTextViewerState();

  useEffect(() => {
    // here is where we send request to get the data
    dispatch({
      type: 'set-text-pack',
      textPack: singlePack,
    });

    dispatch({
      type: 'set-ontology',
      ontology: ontology,
    });
  }, [dispatch]);

  if (!state.textPack || !state.ontology) {
    return <div>loading...</div>;
  }

  return <TextViewer textPack={state.textPack} ontology={state.ontology} />;
}

export default App;
