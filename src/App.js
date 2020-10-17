import React, { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route } from 'react-router-dom';
import MobileNavbar from './components/MobileNavbar';
import Navbar from './components/Navbar';
import Loadable from 'react-loadable';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './components/Footer';
import MobileFooter from './components/MobileFooter';

const Home = React.lazy(() => import('./pages/Home'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));
const MyAccountMobile = React.lazy(() => import('./pages/MyAccountMobile'));
const SingleProduct = React.lazy(() => import('./pages/SingleProduct'));
const SingleProductMobile = React.lazy(() =>
  import('./pages/SingleProductMobile')
);
const Cart = React.lazy(() => import('./pages/Cart'));
const CartMobile = React.lazy(() => import('./pages/CartMobile'));

function App() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <div className="font-body antialiased">
      {isTabletOrAbove ? <Navbar /> : <MobileNavbar />}

      <Suspense
        fallback={<div style={{ minHeight: 'calc(100vh - 140px)' }}></div>}
      >
        <Route exact path="/" component={Home} />
      </Suspense>

      <Suspense
        fallback={<div style={{ minHeight: 'calc(100vh - 140px)' }}></div>}
      >
        <Route
          exact
          path="/user/account/:page"
          render={props => {
            if (isTabletOrAbove) {
              return <MyAccount {...props} />;
            } else {
              return <MyAccountMobile {...props} />;
            }
          }}
        />
      </Suspense>

      <Suspense
        fallback={<div style={{ minHeight: 'calc(100vh - 140px)' }}></div>}
      >
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
      </Suspense>

      <Suspense
        fallback={<div style={{ minHeight: 'calc(100vh - 140px)' }}></div>}
      >
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
      </Suspense>

      {isTabletOrAbove ? <Footer /> : <MobileFooter />}
    </div>
  );
}

export default App;
