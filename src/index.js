import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/styles.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataContextProvider from './contexts/DataContext';
import Register from './pages/Register';
import Login from './pages/Login';
ReactDOM.render(
  <DataContextProvider>
    <Router>
      <div className="font-body antialiased  overflow-x-hidden overflow-y-hidden">
        <Route exact path="/app/register" component={Register} />
        <Route exact path="/app/login" component={Login} />
        <Route exact path="/" component={App} />
      </div>
    </Router>
  </DataContextProvider>,
  document.getElementById('root')
);
