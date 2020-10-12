import React from 'react';
import { MdPayment } from 'react-icons/md';
import lostManWallet from '../../assets/illustrations/lostManWallet.svg';

export default function PaymentDetails({ isLightTheme }) {
  return (
    <div
      className={`rounded-lg overflow-hidden  ${
        isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider-wide'
      }`}
      style={{ minHeight: 'calc(100vh - 200px' }}
    >
      <div className="px-3 py-3 flex ">
        <h1 className="text-xl font-semibold"> Payment Methods</h1>
        <button
          className={`px-4 py-1 ml-auto font-semibold ${
            isLightTheme
              ? 'bg-btn-primary-light text-btn-secondary-light'
              : 'bg-btn-primary-dark text-btn-secondary-dark'
          } rounded`}
        >
          Edit
        </button>
      </div>
      <hr />
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-lg text-center font-semibold">
            You've not placed any Orders yet !
          </h1>
          <button
            className={` mt-3  font-semibold flex items-center rounded px-4 py-2  ${
              isLightTheme
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-btn-primary-dark text-btn-secondary-dark'
            } `}
          >
            <span className="mr-2 text-white ">
              <MdPayment className="w-20p h-20p" />
            </span>
            Add Payment Method
          </button>
        </div>
        <img src={lostManWallet} alt="map" style={{ height: '200px' }} />
      </div>
    </div>
  );
}
