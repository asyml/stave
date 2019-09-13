import React, { useEffect } from 'react';
import './styles/normalize.css';
import './styles/global.css';
import TextViewer from './components/TextViewer';
import {
  TextViewerProvider,
  useTextViewerDispatch,
  useTextViewerState
} from './contexts/text-viewer.context';
import { mockSinglePacks } from './lib/mock-data';

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
    dispatch({
      type: 'set-text-pack',
      textPach: mockSinglePacks[0]
    });
  }, [dispatch]);

  if (!state.textPack) {
    return <div>loading...</div>;
  }

  return <TextViewer textPack={state.textPack} />;
}

export default App;
