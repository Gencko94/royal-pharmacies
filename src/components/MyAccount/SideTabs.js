import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SideTabs({ selectedIndex, isLightTheme }) {
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
    <div
      className={`flex flex-col  rounded overflow-hidden ${
        isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider-wide'
      }`}
    >
      {options.map((option, i) => (
        <div key={i}>
          <button
            onClick={() => history.push(`${mapNametoPage[option]}`)}
            className={`px-6 py-4 w-full ${
              selectedIndex === i
                ? isLightTheme
                  ? 'bg-btn-primary-light text-btn-secondary-light'
                  : 'bg-btn-primary-dark text-btn-secondary-dark'
                : isLightTheme
                ? 'bg-btn-secondary-light'
                : 'bg-first-nav-light text-first-nav-text-light'
            }   hover:bg-red-500 hover:text-gray-100 `}
          >
            {option}
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
