import React from 'react';
import { useIntl } from 'react-intl';
import { AiOutlinePlus } from 'react-icons/ai';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import LocationMobile from './LocationMobile';
import { AuthProvider } from '../../../contexts/AuthContext';

export default function LocationsMobile({ locations, setShowMap }) {
  const { deleteAddressMutation } = React.useContext(AuthProvider);
  const { formatMessage } = useIntl();
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(null);
  const handleRemoveLocation = async id => {
    try {
      setDeleteButtonLoading(id);
      await deleteAddressMutation(id);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div style={{ minHeight: 'calc(-173px + 100vh)' }}>
      <div className="flex p-3 items-center justify-between bg-main-color text-main-text">
        <h1 className="text-lg">
          {formatMessage({ id: 'we-have-found' })}
          <span className="mx-1">{locations.length}</span>
          {locations.length === 1
            ? formatMessage({ id: 'one-address' })
            : formatMessage({ id: 'addresses' })}
        </h1>
        <button onClick={() => setShowMap(true)}>
          <AiOutlinePlus className="h-6 w-6" />
        </button>
      </div>
      <AnimateSharedLayout>
        <motion.div
          layout
          initial={false}
          className="p-2 locations-grid__mobile"
        >
          <AnimatePresence>
            {locations.map(location => {
              return (
                <LocationMobile
                  key={location.id}
                  address={location}
                  handleRemoveLocation={handleRemoveLocation}
                  deleteButtonLoading={deleteButtonLoading}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
}
