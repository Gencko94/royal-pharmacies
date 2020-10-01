import React from 'react';
import manWithMap from '../../assets/illustrations/manWithMap.svg';
import { FaMapMarkedAlt } from 'react-icons/fa';
export default function MyAddressesMobile() {
  const orders = [];
  return (
    <div className="text-black  ">
      <div className="px-3 py-3   ">
        <h1 className="text-xl font-semibold text-center">Addresses</h1>
      </div>
      <hr />
      {orders.length === 0 && (
        <div
          className="  flex flex-col justify-center items-center p-4 "
          style={{ minHeight: '500px' }}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg text-center font-bold">
              You've Not added any Addresses yet !
            </h1>
            <button className=" mt-3 font-semibold flex items-center rounded px-3 py-1 bg-red-600 text-gray-100">
              <span className="mr-2 text-white ">
                <FaMapMarkedAlt className="w-20p h-20p" />
              </span>
              Add new Address
            </button>
          </div>
          <img style={{ height: '300px' }} src={manWithMap} alt="manWithMap" />
        </div>
      )}
    </div>
  );
}
