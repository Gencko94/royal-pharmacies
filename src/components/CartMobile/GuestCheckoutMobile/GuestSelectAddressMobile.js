import React from 'react';
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
      </div>
    </div>
  );
}
