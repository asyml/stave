import React from 'react';
import './App.css';
import TextViewer from './components/TextViewer';
import { mockSinglePacks } from './lib/mock-data';

function App() {
  return (
    <div className="App">
      <div className="text-viewer-container">
        <TextViewer {...mockSinglePacks[0]} />
      </div>
    </div>
  );
}

export default App;
