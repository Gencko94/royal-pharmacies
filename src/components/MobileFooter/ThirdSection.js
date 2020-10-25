import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import logomrg from '../../assets/logomrg.png';
export default function ThirdSection() {
  return (
    <div className="p-4 pb-2 text-gray-100 bg-gray-900 ">
      <div className="flex justify-evenly mb-2">
        <button className="text-blue-600 transition duration-150">
          <FaFacebook className="h-25p w-20p" />
        </button>
        <button>
          <FaTwitter className=" text-blue-400 h-25p w-20p" />
        </button>
        <button>
          <FaInstagram className="h-25p w-20p text-red-400" />
        </button>
        <button>
          <FaLinkedin className="h-25p w-20p text-blue-600" />
        </button>
      </div>
      <div className="flex items-center">
        <img src={logomrg} alt="logo" className="w-32 h-10 mr-2" />

        <h1 className=" font-semibold text-sm">
          &copy; 2020 MRG . All Rights Reserved
        </h1>
      </div>
    </div>
  );
}
