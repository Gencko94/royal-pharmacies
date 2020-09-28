import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import DataContextProvider from './contexts/DataContext';
ReactDOM.render(
  <DataContextProvider>
    <Router>
      <App />
    </Router>
  </DataContextProvider>,
  document.getElementById('root')
);
