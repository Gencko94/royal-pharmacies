import React from 'react';
import lostManWallet from '../../assets/illustrations/lostManWallet.svg';
import { MdPayment } from 'react-icons/md';
export default function PaymentDetailsMobile() {
  const orders = [];
  return (
    <div className="text-black  ">
      <div className="px-3 py-3   ">
        <h1 className="text-xl font-semibold text-center">Payment Details</h1>
      </div>
      <hr />
      {orders.length === 0 && (
        <div
          className="  flex flex-col justify-center items-center p-4 "
          style={{ minHeight: '500px' }}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg text-center font-bold">
              You've not added any Payment details yet !
            </h1>
            <button className=" mt-3 font-semibold flex items-center rounded px-3 py-1 bg-red-600 text-gray-100">
              <span className="mr-1 text-white ">
                <MdPayment className="w-20p h-20p" />
              </span>
              Add Payment method
            </button>
          </div>
          <img
            className="mt-5"
            style={{ height: '200px' }}
            src={lostManWallet}
            alt="shoppingLost"
          />
        </div>
      )}
    </div>
  );
}
