import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import GoogleMapsAddress from '../GoogleMapsAddress';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import AvailableAddressesMobile from './AvailableAddressesMobile';
export default function SelectAddressMobile({ handleSelectAddress }) {
  const [showMap, setShowMap] = React.useState(false);
  const { userAddresses, userAddressesLoading } = React.useContext(
    AuthProvider
  );
  if (userAddressesLoading)
    return (
      <div
        className="flex h-full justify-center items-center"
        style={{ minHeight: 'calc(100vh - 102px)' }}
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
    <div className="h-full">
      {userAddresses.length !== 0 && !showMap && (
        <AvailableAddressesMobile
          userAddresses={userAddresses}
          setShowMap={setShowMap}
          handleSelectAddress={handleSelectAddress}
        />
      )}
      {(userAddresses.length === 0 || showMap) && (
        <div className=" border mb-2 h-full">
          <GoogleMapsAddress setShowMap={setShowMap} />
        </div>
      )}
    </div>
  );
}
