import React from 'react';
import GuestGoogleMapsAddress from '../../GuestGoogleMapsAddress';

export default function SelectGuestAddress({
  handleAddAddressAndInfo,
  guestAddress,
  name,
  phoneNumber,
  email,
  countryCode,
  setCountryCode,
}) {
  return (
    <div className="h-full" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <div className="rounded-sm border">
        <GuestGoogleMapsAddress
          handleAddAddressAndInfo={handleAddAddressAndInfo}
          guestAddress={guestAddress}
          name={name}
          phoneNumber={phoneNumber}
          email={email}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
      </div>
    </div>
  );
}
