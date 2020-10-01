import React from 'react';
import { AiFillShopping } from 'react-icons/ai';
import shoppingLost from '../../assets/illustrations/shoppingLost.svg';

export default function MyOrders() {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-2xl"
      style={{ minHeight: 'calc(100vh - 200px' }}
    >
      <div className="px-3 py-3 flex  text-gray-900">
        <h1 className="text-2xl font-semibold"> Orders</h1>
        <button className="px-4 py-1 ml-auto font-semibold bg-red-600 text-gray-100 rounded">
          Edit
        </button>
      </div>
      <hr />
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-lg text-center font-semibold">
            You've not placed any Orders yet !
          </h1>
          <button className=" mt-3  font-semibold flex items-center rounded px-4 py-2 bg-red-600 text-gray-100">
            <span className="mr-2 text-white ">
              <AiFillShopping className="w-20p h-20p" />
            </span>
            Add new Address
          </button>
        </div>
        <img src={shoppingLost} alt="map" style={{ height: '200px' }} />
      </div>
    </div>
  );
}
