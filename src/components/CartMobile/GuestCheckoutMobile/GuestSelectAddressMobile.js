import React from 'react';
import GuestGoogleMapsAddress from '../../GuestGoogleMapsAddress';

export default function GuestSelectAddressMobile({
  handleAddAddressAndInfo,
  guestAddress,
  name,
  phoneNumber,
  email,
}) {
  return (
    <div className="h-full">
      <div className=" border mb-2 h-full">
        <GuestGoogleMapsAddress
          handleAddAddressAndInfo={handleAddAddressAndInfo}
          guestAddress={guestAddress}
          name={name}
          phoneNumber={phoneNumber}
          email={email}
        />
      </div>
    </div>
  );
}
