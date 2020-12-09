import React from 'react';
import GuestGoogleMapsAddress from '../../GuestGoogleMapsAddress';

export default function SelectGuestAddress({
  handleStepForward,
  setGuestAddress,
}) {
  return (
    <div className="h-full" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <div className="rounded-sm border">
        <GuestGoogleMapsAddress
          setGuestAddress={setGuestAddress}
          handleStepForward={handleStepForward}
        />
      </div>
    </div>
  );
}
