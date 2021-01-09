import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { AiOutlineInfoCircle, AiOutlinePlus } from 'react-icons/ai';
import Ink from 'react-ink';
import { useIntl } from 'react-intl';

export default function AvailableAddressesMobile({
  userAddresses,
  setShowMap,

  handleSelectAddress,
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
      </div>
      <AnimateSharedLayout>
        <motion.div layout className="p-2 locations-grid__mobile">
          {userAddresses.map(address => {
            return (
              <motion.div
                layout
                key={address.id}
                className={` rounded border relative  bg-body-light`}
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
                      className="absolute overflow-hidden p-2 text-main-text  transition cursor-pointer duration-150 opacity-75 bg-gray-800"
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
                    <div className="text-xs text-gray-600 font-semibold">
                      <h1>{address.address_name}</h1>
                    </div>
                    <div
                      className="text-xs mb-2 font-semibold"
                      style={{ height: '50px' }}
                    >
                      <h1>
                        {address.marked_address || address.userTyped_addres}
                      </h1>
                      <h1>{address.addition_direction}</h1>
                    </div>
                    <button
                      onClick={() => handleSelectAddress(address)}
                      className={`w-full text-sm p-1 rounded uppercase 
                          bg-main-color
                      } text-main-text`}
                    >
                      {formatMessage({ id: 'select-btn' })}
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
