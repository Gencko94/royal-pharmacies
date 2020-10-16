import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/styles.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataContextProvider from './contexts/DataContext';
import Register from './pages/Register';
import Login from './pages/Login';
import ScrollToTopOnMount from './helpers/ScrollToTopOnMount';

const localCart = localStorage.getItem('cartItems');
if (!localCart) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}
const visitedItems = localStorage.getItem('visitedItems');
if (!visitedItems) {
  localStorage.setItem('visitedItems', JSON.stringify([]));
}

ReactDOM.render(
  <DataContextProvider>
    <Router>
      <ScrollToTopOnMount />
      <Switch>
        <Route exact path="/app/register" component={Register} />
        <Route exact path="/app/login" component={Login} />
        <Route component={App} />
      </Switch>
    </Router>
  </DataContextProvider>,
  document.getElementById('root')
);
