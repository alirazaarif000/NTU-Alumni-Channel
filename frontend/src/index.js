import React from 'react';
import ReactDOM from 'react-dom';

import DataProvider from './redux/store';
import App from './App';

import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);