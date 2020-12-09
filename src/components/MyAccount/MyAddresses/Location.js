import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function Location({
  data,
  handleRemoveLocation,
  deleteButtonLoading,
}) {
  const { formatMessage } = useIntl();
  const [infoTabOpen, setInfoTabOpen] = React.useState(null);
  const handleInfoTabOpen = id => {
    if (infoTabOpen === id) {
      setInfoTabOpen(null);
    } else {
      setInfoTabOpen(id);
    }
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
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="rounded border shadow-itemsSlider-shallow bg-body-light"
    >
      <div style={{ minHeight: '150px', position: 'relative' }}>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.lat},${data.lng}&zoom=15&size=200x150&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
          alt="thumbnail"
        />
        <motion.div
          variants={infoVariants}
          initial="partial"
          animate={infoTabOpen === data.id ? 'full' : 'partial'}
          layout
          exit="partial"
          onClick={() => handleInfoTabOpen(data.id)}
          className="absolute overflow-hidden p-2 text-main-text  transition cursor-pointer duration-150 opacity-50 bg-gray-800 hover:opacity-75"
        >
          <AiOutlineInfoCircle
            style={{ left: '10px' }}
            className="absolute  top-1/2 transform  -translate-y-1/2  w-5 h-5"
          />
          <AnimatePresence>
            {infoTabOpen === data.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, marginLeft: '35px' }}
                exit={{ opacity: 0 }}
                layout
                className="text-sm"
              >
                <div>
                  <h1>
                    {formatMessage({
                      id: 'maps-detailed-address-apartment-short',
                    })}
                    :
                  </h1>
                  <h1>{data.apartment_house_number}</h1>
                </div>
                <div>
                  <h1>
                    {formatMessage({
                      id: 'maps-detailed-address-building-short',
                    })}
                    :
                  </h1>
                  <h1>{data.building_tower_number}</h1>
                </div>
                <div>
                  <h1>
                    {formatMessage({
                      id: 'maps-detailed-address-phone-short',
                    })}
                    :
                  </h1>
                  <h1>{data.phone_number}</h1>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="p-2">
        <div className="text-sm mb-2 font-semibold" style={{ height: '50px' }}>
          <h1>{data.marked_address}</h1>
        </div>
        <button
          onClick={() => handleRemoveLocation(data.id)}
          className={` ${
            deleteButtonLoading === data.id ? 'bg-gray-300' : 'bg-main-color'
          } text-main-text rounded   p-2 uppercase   text-sm w-full flex justify-center`}
        >
          {deleteButtonLoading === data.id ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
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
  );
}
