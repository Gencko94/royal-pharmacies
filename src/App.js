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

  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <div className="">
      {isTabletOrAbove ? <Navbar /> : <MobileNavbar />}

      <Route exact path="/" component={Home} />
      <Route exact path="/user/account/:page" component={MyAccount} />
      {isTabletOrAbove ? <Footer /> : <MobileFooter />}
    </div>
  );
}

export default App;
