import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import logomrg from '../../assets/mrg.png';
export default function ThirdSection() {
  return (
    <div
      className={`pt-4 px-8 pb-2 bg-first-nav-light text-first-nav-text-light  flex items-center justify-between  `}
    >
      <div className="flex items-center ">
        <img src={logomrg} alt="logo" className="w-32 h-10 mr-2" />

        <h1 className=" font-semibold text-sm">
          &copy; 2020 MRG . All Rights Reserved
        </h1>
      </div>
      <div className="flex justify-evenly">
        <button className="mr-4">
          <FaFacebook className=" text-blue-600 h-25p w-20p" />
        </button>
        <button className="mr-4">
          <FaTwitter className=" text-blue-400 h-25p w-20p" />
        </button>
        <button className="mr-4">
          <FaInstagram className="h-25p w-20p text-red-400" />
        </button>
        <button className="mr-4">
          <FaLinkedin className="h-25p w-20p text-blue-600" />
        </button>
      </div>
    </div>
  );
}
