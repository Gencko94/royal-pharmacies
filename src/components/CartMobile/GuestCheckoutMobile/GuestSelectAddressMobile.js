import React from 'react';
import GuestGoogleMapsAddress from '../../GuestGoogleMapsAddress';

export default function GuestSelectAddressMobile({
  handleAddAddressAndInfo,
  guestAddress,
  name,
  phoneNumber,
  email,
  countryCode,
  setCountryCode,
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
          setCountryCode={setCountryCode}
          countryCode={countryCode}
        />
      </div>
    </div>
  );
}
