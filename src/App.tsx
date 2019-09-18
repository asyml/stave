import React, { useEffect } from 'react';
import './styles/normalize.css';
import './styles/global.css';
import TextViewer from './components/TextViewer';
import {
  TextViewerProvider,
  useTextViewerDispatch,
  useTextViewerState,
} from './contexts/text-viewer.context';
import { singlePack } from './lib/mock-data-2';

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
      textPach: singlePack,
    });
  }, [dispatch]);

  if (!state.textPack) {
    return <div>loading...</div>;
  }

  return <TextViewer textPack={state.textPack} />;
}

export default App;
