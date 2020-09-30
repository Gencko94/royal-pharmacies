import React from 'react';
import lostManWallet from '../../assets/illustrations/lostManWallet.svg';

export default function MyAddresses() {
  const orders = [];
  return (
    <div className="text-black  ">
      <div className="px-3 py-3   ">
        <h1 className="text-xl font-semibold text-center">Addresses</h1>
      </div>
      <hr />
      {orders.length === 0 && (
        <div
          className="  flex flex-col justify-around items-center p-4 "
          style={{ minHeight: '500px' }}
        >
          <h1 className="text-lg text-center font-bold">
            You've Not added any orders yet !
          </h1>
          <img
            style={{ height: '200px' }}
            src={lostManWallet}
            alt="lostManWallet"
          />
        </div>
      )}
    </div>
  );
}
