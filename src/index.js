import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/styles.css';
import './css/rtl.css';
import App from './App';
import DataContextProvider from './contexts/DataContext';

import SearchContext from './contexts/SearchContext';
import AuthContext from './contexts/AuthContext';
import CartAndWishlistContext from './contexts/CartAndWishlistContext';

const localCart = localStorage.getItem('lclc');
if (!localCart) {
  localStorage.setItem('lclc', JSON.stringify([]));
}
const localWish = localStorage.getItem('localWish');
if (!localWish) {
  localStorage.setItem('localWish', JSON.stringify([]));
}
const visitedItems = localStorage.getItem('browse-history');
if (!visitedItems) {
  localStorage.setItem('browse-history', JSON.stringify([]));
}
const prefferedLanguage = localStorage.getItem('prefferedLanguage');
if (!prefferedLanguage) {
  localStorage.setItem('prefferedLanguage', 'en');
}
const myLocalLocations = localStorage.getItem('myLocalLocations');
if (!myLocalLocations) {
  localStorage.setItem('myLocalLocations', JSON.stringify([]));
}
const deliveryCountry = localStorage.getItem('deliveryCountry');
if (!deliveryCountry) {
  localStorage.setItem(
    'deliveryCountry',
    JSON.stringify({ deliveryCountry: { en: 'Kuwait', ar: 'الكويت' } })
  );
}

ReactDOM.render(
  <App />,

  document.getElementById('root')
);
