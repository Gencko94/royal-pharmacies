import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import GoogleMapsAddress from '../GoogleMapsAddress';
import Locations from './MyAddresses/Locations';
import NoAddresses from './MyAddresses/NoAddresses';
import { motion } from 'framer-motion';

import { AuthProvider } from '../../contexts/AuthContext';

export default function MyAddresses() {
  const [showMap, setShowMap] = React.useState(false);
  const { userAddresses, userAddressesLoading } = React.useContext(
    AuthProvider
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
  if (userAddressesLoading)
    return (
      <div className="flex h-full justify-center items-center">
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full"
    >
      {!showMap &&
        (userAddresses.length === 0 ? (
          <NoAddresses setShowMap={setShowMap} />
        ) : (
          <Locations locations={userAddresses} setShowMap={setShowMap} />
        ))}
      {showMap && (
        <div className="relative h-full">
          <GoogleMapsAddress setShowMap={setShowMap} />
        </div>
      )}
    </motion.div>
  );
}
