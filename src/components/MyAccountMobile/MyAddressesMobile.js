import React from 'react';
import manWithMap from '../../assets/illustrations/manWithMap.svg';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { useIntl } from 'react-intl';
export default function MyAddressesMobile() {
  const { formatMessage } = useIntl();
  const orders = [];
  return (
    <div
      className="  flex flex-col justify-center items-center p-4 "
      style={{ height: 'calc(-173px + 100vh)' }}
    >
      {orders.length === 0 && (
        <>
          <img
            style={{ height: '300px' }}
            className="mt-5"
            src={manWithMap}
            alt="manWithMap"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg text-center font-bold">
              {formatMessage({ id: 'no-addresses-yet' })}
            </h1>
            <button className=" mt-3 font-semibold flex items-center justify-center rounded px-2 py-1 bg-main-color text-main-text">
              <h1>{formatMessage({ id: 'add-new-address' })}</h1>
              <FaMapMarkedAlt className="w-20p h-20p mx-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
