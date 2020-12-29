import React from 'react';
import GuestGoogleMapsAddress from '../../GuestGoogleMapsAddress';

export default function SelectGuestAddress({ handleAddAddressAndInfo }) {
  return (
    <div className="h-full" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <div className="rounded-sm border">
        <GuestGoogleMapsAddress
          handleAddAddressAndInfo={handleAddAddressAndInfo}
        />
      </div>
    </div>
  );
}
