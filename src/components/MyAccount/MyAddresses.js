import React from 'react';
import manWithMap from '../../assets/illustrations/manWithMap.svg';
import { FaMapMarkedAlt } from 'react-icons/fa';

export default function MyAddresses() {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl">
      <div className="px-3 py-3 flex  text-gray-900">
        <h1 className="text-2xl font-semibold"> Addresses</h1>
        <button className="px-4 py-1 ml-auto font-semibold bg-red-600 text-gray-100 rounded">
          Edit
        </button>
      </div>
      <hr />
      <div
        style={{ minHeight: '470px' }}
        className="flex flex-col justify-center"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-lg text-center font-semibold">
            You've not added any addresses yet !
          </h1>
          <button className=" mt-3  font-semibold flex items-center rounded px-4 py-2 bg-red-600 text-gray-100">
            <span className="mr-2 text-white ">
              <FaMapMarkedAlt className="w-20p h-20p" />
            </span>
            Add new Address
          </button>
        </div>
        <img src={manWithMap} alt="map" style={{ height: '300px' }} />
      </div>
    </div>
  );
}
