import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route } from 'react-router-dom';
import MobileNavbar from './components/MobileNavbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
function App() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <div className="font-body antialiased overflow-hidden">
      {isTabletOrAbove ? <Navbar /> : <MobileNavbar />}

      <Route path="/" component={Home} />
    </div>
  );
}

export default App;
