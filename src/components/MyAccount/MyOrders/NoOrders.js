import React from 'react';
import { AiFillShopping } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import shoppingLost from '../../../assets/illustrations/shoppingLost.svg';
export default function NoOrders() {
  const { formatMessage, locale } = useIntl();
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <img
        src={shoppingLost}
        alt="map"
        className="mb-6"
        style={{ height: '200px' }}
      />
      <div className="flex flex-col items-center ">
        <h1 className="text-lg text-center font-bold">
          {formatMessage({ id: 'no-orders-placed' })}
        </h1>
        <Link
          to={`/${locale}/`}
          className={` mt-3  font-semibold flex items-center rounded px-4 py-2  
            bg-main-color text-main-text`}
        >
          <h1 className="mx-2 uppercase">
            {formatMessage({ id: 'start-shopping-now' })}
          </h1>
          <AiFillShopping className="w-20p h-20p" />
        </Link>
      </div>
    </div>
  );
}
