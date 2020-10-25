import React from 'react';
import { useHistory } from 'react-router-dom';
import guest from '../../assets/svgs/guest.svg';
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
    <div className=" flex flex-col ">
      <div className="flex   py-5 px-1 bg-nav-cat-light ">
        <div className="mr-2" style={{ flexBasis: '20%' }}>
          <img src={guest} alt="user" />
        </div>
        <div className="flex flex-col font-semibold ">
          <h1>John Doe</h1>
          <h1 className="text-xs">John@Doe.com</h1>
        </div>
      </div>

      <div
        className={`flex flex-col flex-1 justify-start rounded   overflow-hidden ${
          isLightTheme
            ? 'shadow-itemsSlider-shallow'
            : 'shadow-itemsSlider-wide'
        }`}
      >
        {options.map((option, i) => (
          <div key={i}>
            <button
              onClick={() => history.push(`${mapNametoPage[option]}`)}
              className={`px-6 py-4 w-full ${
                selectedIndex === i
                  ? isLightTheme
                    ? 'bg-btn-primary-light text-btn-secondary-light font-semibold'
                    : 'bg-btn-primary-dark text-btn-secondary-dark '
                  : isLightTheme
                  ? 'bg-btn-secondary-light '
                  : 'bg-first-nav-light text-first-nav-text-light '
              }   hover:bg-btn-primary-light  hover:text-btn-secondary-light hover:font-semibold transition duration-150 `}
            >
              {option}
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
