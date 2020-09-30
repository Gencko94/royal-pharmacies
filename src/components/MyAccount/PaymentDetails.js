import React from 'react';
import shoppingLost from '../../assets/illustrations/shoppingLost.svg';

export default function PaymentDetails() {
  const orders = [];
  return (
    <div className="text-black  ">
      <div className="px-3 py-3   ">
        <h1 className="text-xl font-semibold text-center">Payment Details</h1>
      </div>
      <hr />
      {orders.length === 0 && (
        <div
          className="  flex flex-col justify-around items-center p-4 "
          style={{ minHeight: '500px' }}
        >
          <h1 className="text-lg font-bold text-center">
            You've Not added any Payment Details yet !
          </h1>
          <img
            style={{ height: '200px' }}
            src={shoppingLost}
            alt="shoppingLost"
          />
        </div>
      )}
    </div>
  );
}
