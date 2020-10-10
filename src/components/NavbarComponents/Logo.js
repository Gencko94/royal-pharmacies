import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logomrg.png';
export default function Logo({ withTypography = false }) {
  return (
    <div className="mr-2 px-1 flex  items-center text-sm  ">
      <Link to="/">
        <img src={logo} alt="alattiah" className="w-32 h-10" />
      </Link>
      {withTypography && (
        <div className="flex flex-col font-bold ml-2">
          <h1 className="font-cairo ">العطية مول</h1>
          <h1 className="">Alatiah Mall</h1>
        </div>
      )}
    </div>
  );
}
