import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/mrgnavlogo.png';

export default function NavLogoMobile() {
  return (
    <div className=" grid place-items-center   text-sm  ">
      <Link to="/" className="text-second-nav-light">
        <img src={logo} alt="MRG-logo" className="w-20" />
      </Link>
    </div>
  );
}
