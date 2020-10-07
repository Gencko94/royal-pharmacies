import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/styles.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DataContextProvider from './contexts/DataContext';
import Register from './pages/Register';
import Login from './pages/Login';

const localCart = localStorage.getItem('cartItems');
if (!localCart) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

ReactDOM.render(
  <DataContextProvider>
    <Router>
      <div className="font-body antialiased relative ">
        <Route exact path="/app/register" component={Register} />
        <Route exact path="/app/login" component={Login} />
        <Route component={App} />
      </div>
    </Router>
  </DataContextProvider>,
  document.getElementById('root')
);
