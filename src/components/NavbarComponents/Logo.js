import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
export default function Logo() {
  return (
    <div className="mr-4 px-1 ">
      <Link to="/">
        <img src={logo} alt="alattiah" className="w-10 h-10" />
      </Link>
    </div>
  );
}
