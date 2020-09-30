import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route } from 'react-router-dom';
import MobileNavbar from './components/MobileNavbar';
import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import MyAccount from './pages/MyAccount';
import Loadable from 'react-loadable';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function App() {
  const Home = Loadable({
    loader: () => import('./pages/Home'),
    loading: () => 'Loading',
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
      <Route exact path="/user/account" component={MyAccount} />
    </div>
  );
}

export default App;
