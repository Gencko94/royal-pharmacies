import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/styles.css';
import './css/rtl.css';
import App from './App';
import DataContextProvider from './contexts/DataContext';

import SearchContext from './contexts/SearchContext';

const localCart = localStorage.getItem('cartItems');
if (!localCart) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}
const visitedItems = localStorage.getItem('visitedItems');
if (!visitedItems) {
  localStorage.setItem('visitedItems', JSON.stringify([]));
}
const prefferedLanguage = localStorage.getItem('prefferedLanguage');
if (!prefferedLanguage) {
  localStorage.setItem('prefferedLanguage', 'en');
}
ReactDOM.render(
  <DataContextProvider>
    <SearchContext>
      <div className={` antialiased relative`}>
        <App />
      </div>
    </SearchContext>
  </DataContextProvider>,

  document.getElementById('root')
);
