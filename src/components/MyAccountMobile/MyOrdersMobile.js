import React from 'react';
import shoppingLost from '../../assets/illustrations/shoppingLost.svg';
import { AiFillShopping } from 'react-icons/ai';
export default function MyOrdersMobile() {
  const orders = [];
  return (
    <div className="text-black  ">
      <div className="px-3 py-3   ">
        <h1 className="text-xl font-semibold text-center">Orders</h1>
      </div>
      <hr />
      {orders.length === 0 && (
        <div
          className="  flex flex-col justify-around items-center p-4 "
          style={{ minHeight: '500px' }}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg text-center font-bold">
              You've not placed any Orders yet !
            </h1>
            <button className=" mt-3 font-semibold flex items-center rounded px-3 py-1 bg-red-600 text-gray-100">
              <span className="mr-1 text-white ">
                <AiFillShopping className="w-20p h-20p" />
              </span>
              Start shopping now !
            </button>
          </div>
          <img
            style={{ height: '200px' }}
            src={shoppingLost}
            alt="lostManWallet"
          />
        </div>
      )}
    </div>
  );
}
