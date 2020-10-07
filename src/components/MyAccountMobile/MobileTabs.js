import React from 'react';
import { useHistory } from 'react-router-dom';

export default function MobileTabs({ selectedIndex, setSelectedIndex }) {
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
    <div className="overflow-hidden">
      <ul className=" mobile-tabs overflow-x-scroll  whitespace-no-wrap bg-red-100 p-2">
        {options.map((option, i) => {
          return (
            <li key={i} className="inline-block  ">
              <button
                onClick={() => history.push(`${mapNametoPage[option]}`)}
                className={`p-3 ${
                  selectedIndex === i ? 'bg-red-700 text-white' : 'bg-red-100'
                } hover:bg-red-700 hover:text-white transition duration-150 font-semibold rounded`}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
