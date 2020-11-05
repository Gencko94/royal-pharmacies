import React from 'react';
import lostManWallet from '../../assets/illustrations/lostManWallet.svg';
import { MdPayment } from 'react-icons/md';
import { useIntl } from 'react-intl';
export default function PaymentDetailsMobile() {
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
            className="mt-5"
            style={{ height: '200px' }}
            src={lostManWallet}
            alt="shoppingLost"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg text-center font-bold">
              {formatMessage({ id: 'no-payment-method' })}
            </h1>
            <button className=" mt-3 font-semibold flex items-center justify-center rounded px-2 py-1 bg-main-color text-main-text">
              <h1>{formatMessage({ id: 'add-payment-method' })}</h1>
              <MdPayment className="w-20p h-20p mx-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
