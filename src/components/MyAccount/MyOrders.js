import React from 'react';
import frustration from '../../assets/emojies/Frustration.svg';
export default function MyOrders() {
  const orders = [];
  return (
    <div className="text-black  ">
      <div className="px-3 py-3  bg-red-600 ">
        <h1 className="text-lg font-semibold">My Orders</h1>
      </div>
      {orders.length === 0 && (
        <div
          className=" bg-red-100  flex flex-col justify-center items-center p-6 "
          style={{ minHeight: '400px' }}
        >
          <h1 className="text-xl">You've Not added any orders Yet !</h1>
          <img
            style={{ height: '200px' }}
            src={frustration}
            alt="frustration"
          />
        </div>
      )}
    </div>
  );
}
