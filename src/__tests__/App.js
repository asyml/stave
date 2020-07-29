import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App';

it('renders for basic smoke test', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});