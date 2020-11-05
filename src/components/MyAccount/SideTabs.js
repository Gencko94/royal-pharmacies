import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Avatar from './Avatar';
export default function SideTabs({ selectedIndex, isLightTheme }) {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const options = [
    'my-profile',
    'my-addresses',
    'my-orders',
    'my-payment-details',
    'order-history',
  ];
  const mapNametoPage = {
    'my-profile': 'profile',
    'my-addresses': 'addresses',
    'my-orders': 'orders',
    'my-payment-details': 'payment',
    'order-history': 'order-history',
  };
  return (
    <div className=" flex flex-col self-start ">
      <Avatar />

      <div
        className={`flex flex-col rounded-lg   overflow-hidden ${
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
              {formatMessage({ id: option })}
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
