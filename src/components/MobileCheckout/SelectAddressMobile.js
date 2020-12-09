import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import GoogleMapsAddress from '../GoogleMapsAddress';

export default function SelectAddressMobile({ handleStepForward }) {
  const [showMap, setShowMap] = React.useState(false);
  const { userAddresses, userAddressesLoading } = React.useContext(
    AuthProvider
  );
  return (
    <div className="h-full">
      <div className=" border mb-2 h-full">
        <GoogleMapsAddress
          setShowMap={setShowMap}
          handleStepForward={handleStepForward}
        />
      </div>
    </div>
  );
}
