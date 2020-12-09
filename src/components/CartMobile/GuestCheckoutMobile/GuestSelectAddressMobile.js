import React from 'react';
import { useIntl } from 'react-intl';
import GuestGoogleMapsAddress from '../../GuestGoogleMapsAddress';

export default function GuestSelectAddressMobile({
  handleStepForward,
  setGuestAddress,
}) {
  return (
    <div className="h-full">
      <div className=" border mb-2 h-full">
        <GuestGoogleMapsAddress
          setGuestAddress={setGuestAddress}
          handleStepForward={handleStepForward}
        />
        {/* <div className="flex justify-end items-center p-2">
          <button
            disabled={!guestAddress}
            className={`px-3 py-1 ${
              guestAddress
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-gray-500 text-main-text cursor-not-allowed'
            } rounded font-semibold`}
            onClick={handleStepForward}
          >
            {formatMessage({ id: 'next' })}
          </button>
        </div> */}
      </div>
    </div>
  );
}
