import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/App';

hydrate(
  <App data={window.INITIAL_DATA} />,
  document.getElementById('app'),
);
