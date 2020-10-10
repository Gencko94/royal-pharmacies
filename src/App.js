import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route } from 'react-router-dom';
import MobileNavbar from './components/MobileNavbar';
import Navbar from './components/Navbar';
import Loadable from 'react-loadable';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './components/Footer';
import MobileFooter from './components/MobileFooter';

function App() {
  const Home = Loadable({
    loader: () => import('./pages/Home'),
    loading: () => (
      <div style={{ minHeight: 'calc(100vh - 140px)' }}>Loading</div>
    ),
  });
  const MyAccount = Loadable({
    loader: () => import('./pages/MyAccount'),
    loading: () => 'Loading',
  });
  const SingleProduct = Loadable({
    loader: () => import('./pages/SingleProduct'),
    loading: () => 'Loading',
  });
  const SingleProductMobile = Loadable({
    loader: () => import('./pages/SingleProductMobile'),
    loading: () => 'Loading',
  });
  const Cart = Loadable({
    loader: () => import('./pages/Cart'),
    loading: () => 'Loading',
  });
  const CartMobile = Loadable({
    loader: () => import('./pages/CartMobile'),
    loading: () => 'Loading',
  });

  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <div className="relative font-body antialiased relative">
      {isTabletOrAbove ? <Navbar /> : <MobileNavbar />}

      <Route exact path="/" component={Home} />
      <Route exact path="/user/account/:page" component={MyAccount} />
      <Route
        exact
        path="/cart"
        render={props => {
          if (isTabletOrAbove) {
            return <Cart {...props} />;
          } else {
            return <CartMobile {...props} />;
          }
        }}
      />
      <Route
        exact
        path="/products/:id"
        render={props => {
          if (isTabletOrAbove) {
            return <SingleProduct {...props} />;
          } else {
            return <SingleProductMobile {...props} />;
          }
        }}
      />
      {isTabletOrAbove ? <Footer /> : <MobileFooter />}
    </div>
  );
}

export default App;
