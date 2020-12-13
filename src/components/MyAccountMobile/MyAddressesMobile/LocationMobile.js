import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function LocationMobile({
  address,
  handleRemoveLocation,
  deleteButtonLoading,
}) {
  const [infoTabOpen, setInfoTabOpen] = React.useState(false);
  const { formatMessage } = useIntl();
  const handleInfoTabOpen = id => {
    setInfoTabOpen(!infoTabOpen);
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    },
    exited: {
      opacity: 0,
      clipPath: 'polygon(0 54%, 100% 53%, 100% 53%, 0 54%)',
    },
  };
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
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="rounded border bg-body-light"
    >
      <motion.div
        layout
        key={address.id}
        className={`
         
         rounded border relative  bg-body-light`}
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
              animate={infoTabOpen ? 'full' : 'partial'}
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
                {infoTabOpen && (
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
              onClick={() => handleRemoveLocation(address.id)}
              className={` 
                  bg-main-color
               text-main-text rounded   px-2 py-1 text-sm w-full flex justify-center`}
            >
              {deleteButtonLoading === address.id ? (
                <Loader
                  type="ThreeDots"
                  color="#fff"
                  height={20}
                  width={20}
                  visible={true}
                />
              ) : (
                <h1>{formatMessage({ id: 'remove-location' })}</h1>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
