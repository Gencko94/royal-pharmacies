import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/mrgnavlogo.png';
// import MrgLogo from '../../assets/MrgLogo';
export default function Logo() {
  return (
    <div
      className=" grid place-items-center   text-sm  "
      style={{ flexBasis: '15%' }}
    >
      <Link to="/" className="text-second-nav-light">
        <img src={logo} alt="MRG-logo" className="w-24" />
      </Link>
    </div>
  );
}
