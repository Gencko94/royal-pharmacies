import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai';
import Ink from 'react-ink';
import { useIntl } from 'react-intl';

export default function AvailableAddressesMobile({
  userAddresses,
  setShowMap,
  selectedAddress,
  setSelectedAddress,
  handleStepForward,
}) {
  const { formatMessage } = useIntl();
  const [infoTabOpen, setInfoTabOpen] = React.useState(null);

  const infoVariants = {
    partial: {
      right: 0,
      top: 0,
      bottom: 0,
      width: '20%',
    },
    full: {
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
    },
  };
  const handleAddressSelection = address => {
    if (selectedAddress?.id === address.id) {
      setSelectedAddress(null);
    } else {
      setSelectedAddress(address);
    }
  };
  const handleInfoTabOpen = id => {
    if (infoTabOpen === id) {
      setInfoTabOpen(null);
    } else {
      setInfoTabOpen(id);
    }
  };
  return (
    <div className="min-h-full">
      <div className=" p-2 flex items-center justify-between bg-main-color text-main-text">
        <h1 className="text-sm font-semibold">
          {formatMessage({ id: 'select-address-header' })}
        </h1>
        <button
          onClick={handleStepForward}
          className={`${
            selectedAddress
              ? 'bg-body-light text-main-color'
              : 'bg-gray-600 cursor-not-allowed'
          } rounded p-1 text-xs uppercase font-semibold `}
          disabled={!selectedAddress}
        >
          {formatMessage({ id: 'btn-proceed' })}
        </button>
      </div>
      <AnimateSharedLayout>
        <motion.div layout className="p-2 locations-grid__mobile">
          {userAddresses.map(address => {
            return (
              <motion.div
                layout
                key={address.id}
                className={`${
                  selectedAddress?.id === address.id &&
                  'shadow-itemsSlider-shallow'
                } rounded border relative  bg-body-light`}
              >
                <motion.div layout>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${address.lat},${address.lng}&zoom=15&size=350x250&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                      alt="thumbnail"
                    />
                    <motion.div
                      variants={infoVariants}
                      initial="partial"
                      animate={infoTabOpen === address.id ? 'full' : 'partial'}
                      layout
                      exit="partial"
                      onClick={() => handleInfoTabOpen(address.id)}
                      className="absolute overflow-hidden p-2 text-main-text  transition cursor-pointer duration-150 opacity-50 bg-gray-800 hover:opacity-75"
                    >
                      <AiOutlineInfoCircle
                        style={{ left: '10px' }}
                        className="absolute  top-1/2 transform  -translate-y-1/2  w-5 h-5"
                      />
                      <AnimatePresence>
                        {infoTabOpen === address.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, marginLeft: '35px' }}
                            exit={{ opacity: 0 }}
                            layout
                            className="text-xs"
                          >
                            <div>
                              <h1>
                                {formatMessage({
                                  id: 'maps-detailed-address-apartment-short',
                                })}
                                :
                              </h1>
                              <h1>{address.apartment_house_number}</h1>
                            </div>
                            <div>
                              <h1>
                                {formatMessage({
                                  id: 'maps-detailed-address-building-short',
                                })}
                                :
                              </h1>
                              <h1>{address.building_tower_number}</h1>
                            </div>
                            <div>
                              <h1>
                                {formatMessage({
                                  id: 'maps-detailed-address-phone-short',
                                })}
                                :
                              </h1>
                              <h1>{address.phone_number}</h1>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  <div className="p-1">
                    <div
                      className="text-xs mb-2 font-semibold"
                      style={{ height: '50px' }}
                    >
                      <h1>{address.marked_address}</h1>
                    </div>
                    <button
                      onClick={() => handleAddressSelection(address)}
                      className={`w-full text-sm p-1 rounded uppercase ${
                        selectedAddress?.id === address.id
                          ? 'bg-green-700 shadow'
                          : 'bg-main-color'
                      } text-main-text`}
                    >
                      {selectedAddress?.id === address.id
                        ? formatMessage({ id: 'selected-btn' })
                        : formatMessage({ id: 'select-btn' })}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          <div className="p-3 flex items-center justify-center ">
            <button
              onClick={() => setShowMap(true)}
              className="p-3 flex items-center justify-center place-self-center justify-self-center bg-main-color hover:bg-red-900 transition duration-150 relative rounded-lg text-main-text"
            >
              <Ink background={true} />
              <AiOutlinePlus className="h-8 w-8" />
            </button>
          </div>
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
}
