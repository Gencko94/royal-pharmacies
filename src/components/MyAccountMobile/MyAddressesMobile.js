import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NoAddresses from '../MyAccount/MyAddresses/NoAddresses';
import GoogleMapsAddress from '../GoogleMapsAddress';
import LocationsMobile from './MyAddressesMobile/LocationsMobile';
import { motion } from 'framer-motion';

import { AuthProvider } from '../../contexts/AuthContext';
export default function MyAddressesMobile() {
  const {
    userAddresses,

    userAddressesLoading,
  } = React.useContext(AuthProvider);
  const [showMap, setShowMap] = React.useState(false);

  if (userAddressesLoading)
    return (
      <div
        className=" p-4 flex justify-center items-center "
        style={{ minHeight: 'calc(-173px + 100vh)' }}
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
  const containerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };
  console.log(userAddresses);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {!showMap &&
        (userAddresses.length === 0 ? (
          <NoAddresses setShowMap={setShowMap} />
        ) : (
          <LocationsMobile locations={userAddresses} setShowMap={setShowMap} />
        ))}
      {showMap && (
        <div className="relative" style={{ minHeight: 'calc(-176px + 100vh)' }}>
          <GoogleMapsAddress setShowMap={setShowMap} />
        </div>
      )}
    </motion.div>
  );
}
