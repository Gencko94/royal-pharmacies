import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

export default function MobileTabs({ selectedIndex }) {
  const { formatMessage } = useIntl();
  const history = useHistory();
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
    <div className="overflow-hidden">
      <ul className=" mobile-tabs overflow-x-scroll  whitespace-no-wrap bg-red-100 p-2">
        {options.map((option, i) => {
          return (
            <li key={i} className="inline-block mx-1  ">
              <button
                onClick={() => history.push(`${mapNametoPage[option]}`)}
                className={`p-3 ${
                  selectedIndex === i ? 'bg-red-700 text-white' : 'bg-red-100'
                } hover:bg-red-700 hover:text-white transition duration-150  rounded`}
              >
                {formatMessage({ id: option })}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
