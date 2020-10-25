import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/mrgnavlogo.png';
// import MrgLogo from '../../assets/MrgLogo';
export default function Logo({ withTypography = false }) {
  return (
    <div
      className=" grid place-items-center   text-sm  "
      style={{ flexBasis: '15%' }}
    >
      <Link to="/" className="text-second-nav-light">
        <img src={logo} alt="MRG-logo" className="w-24" />
        {/* <MrgLogo /> */}
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
