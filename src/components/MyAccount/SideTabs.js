import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SideTabs({ selectedIndex, setSelectedIndex }) {
  const history = useHistory();
  const options = [
    'My Profile',
    'My Addresses',
    'My Orders',
    'My Payment Details',
    'Order History',
  ];
  const mapNametoPage = {
    'My Profile': 'profile',
    'My Addresses': 'addresses',
    'My Orders': 'orders',
    'My Payment Details': 'payment',
    'My Order History': 'order_history',
  };
  return (
    <div className="flex flex-col  rounded overflow-hidden shadow-lg">
      {options.map((option, i) => (
        <div key={i}>
          <button
            onClick={() => history.push(`${mapNametoPage[option]}`)}
            className={`px-6 py-4 w-full ${
              selectedIndex === i ? 'bg-red-500 text-gray-100' : ''
            }  text-lg hover:bg-red-500 hover:text-gray-100 font-semibold`}
          >
            {option}
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
