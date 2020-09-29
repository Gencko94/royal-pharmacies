import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route } from 'react-router-dom';
import MobileNavbar from './components/MobileNavbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
function App() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <>
      {isTabletOrAbove ? <Navbar /> : <MobileNavbar />}

      <Route exact path="/" component={Home} />
    </>
  );
}

export default App;
