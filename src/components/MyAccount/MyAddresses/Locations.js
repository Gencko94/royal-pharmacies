import React from 'react';
import { useIntl } from 'react-intl';
import Location from './Location';
import { AiOutlinePlus } from 'react-icons/ai';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { AuthProvider } from '../../../contexts/AuthContext';
import Ink from 'react-ink';

export default function Locations({ locations, setShowMap }) {
  const { formatMessage } = useIntl();
  const { deleteAddressMutation } = React.useContext(AuthProvider);
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(null);
  const handleRemoveLocation = async id => {
    try {
      setDeleteButtonLoading(id);
      await deleteAddressMutation(id);
      setShowMap(false);
    } catch (error) {
      setDeleteButtonLoading(null);
      console.log(error.response);
    }
  };
  return (
    <div className="h-full">
      <div className=" p-3  bg-main-color text-main-text">
        <h1 className="text-lg">{formatMessage({ id: 'my-addresses' })}</h1>
      </div>
      <AnimateSharedLayout>
        <motion.div layout className="p-3 locations-grid__desktop">
          <AnimatePresence>
            {locations.map(location => {
              return (
                <Location
                  key={location.id}
                  data={location}
                  handleRemoveLocation={handleRemoveLocation}
                  deleteButtonLoading={deleteButtonLoading}
                />
              );
            })}
          </AnimatePresence>
          <motion.button
            layout
            key="add-button"
            onClick={() => setShowMap(true)}
            className="p-3 flex items-center justify-center self-center justify-self-center bg-main-color hover:bg-red-900 transition duration-150 relative rounded-lg text-main-text"
          >
            <Ink background={true} />
            <AiOutlinePlus className="h-8 w-8" />
          </motion.button>
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
}
