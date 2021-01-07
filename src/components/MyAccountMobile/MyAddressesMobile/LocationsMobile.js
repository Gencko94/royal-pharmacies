import React from 'react';
import { useIntl } from 'react-intl';
import { AiOutlinePlus } from 'react-icons/ai';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import LocationMobile from './LocationMobile';
import { AuthProvider } from '../../../contexts/AuthContext';
import ErrorSnackbar from '../../ErrorSnackbar';
import Ink from 'react-ink';

export default function LocationsMobile({ locations, setShowMap }) {
  const { deleteAddressMutation } = React.useContext(AuthProvider);
  const { formatMessage } = useIntl();
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const handleRemoveLocation = async id => {
    try {
      setDeleteButtonLoading(id);
      await deleteAddressMutation(id);
    } catch (error) {
      setDeleteButtonLoading(null);
      setErrorOpen(true);
      setErrorMessage({ id: 'something-went-wrong-snackbar' });
    }
  };
  return (
    <div style={{ minHeight: 'calc(-173px + 100vh)' }}>
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className="p-3 font-semibold bg-main-color text-main-text">
        <h1 className="">
          {formatMessage({ id: 'we-have-found' })}
          <span className="mx-1">{locations.length}</span>
          {locations.length === 1
            ? formatMessage({ id: 'one-address' })
            : formatMessage({ id: 'addresses' })}
        </h1>
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
