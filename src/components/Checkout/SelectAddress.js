import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../../contexts/AuthContext';
import GoogleMapsAddress from '../GoogleMapsAddress';
import AvailableAddresses from './AvailableAddresses';

export default function SelectAddress({
  handleStepForward,
  selectedAddress,
  setSelectedAddress,
}) {
  const [showMap, setShowMap] = React.useState(false);
  const { userAddresses, userAddressesLoading } = React.useContext(
    AuthProvider
  );

  if (userAddressesLoading)
    return (
      <div
        className="flex h-full justify-center items-center"
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={true}
        />
      </div>
    );
  return (
    <div className="h-full" style={{ minHeight: 'calc(100vh - 150px)' }}>
      {userAddresses.length !== 0 && !showMap && (
        <AvailableAddresses
          userAddresses={userAddresses}
          setShowMap={setShowMap}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          handleStepForward={handleStepForward}
        />
      )}

      {(userAddresses.length === 0 || showMap) && (
        <div className="rounded-sm border">
          <GoogleMapsAddress setShowMap={setShowMap} />
        </div>
      )}
    </div>
  );
}
