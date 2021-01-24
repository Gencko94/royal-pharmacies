import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import MapLazyImage from '../../../helpers/MapLazyImage';
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
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="rounded border shadow-itemsSlider-shallow flex flex-col bg-body-light"
    >
      <motion.div layout style={{ position: 'relative' }}>
        {data.type === 'map' ? (
          <MapLazyImage
            height={150}
            width={200}
            lat={data.lat}
            lng={data.lng}
            alt={data.address_name}
          />
        ) : (
          <div className="p-2 text-sm border-b" style={{ height: '150px' }}>
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
          </div>
        )}

        {data.type === 'map' && (
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
        )}
      </motion.div>
      <motion.div layout className="p-2 flex flex-1 flex-col">
        <div className="text-xs text-gray-600 font-semibold">
          <h1>{data.address_name}</h1>
        </div>
        <div className="text-sm mb-2 font-semibold flex-1">
          <h1>
            {data.type === 'text'
              ? data.userTyped_address
              : data.marked_address}
          </h1>
          {data.addition_direction && <h1>{data.addition_direction}</h1>}
        </div>
        <button
          onClick={() => handleRemoveLocation(data.id)}
          className={` ${
            deleteButtonLoading === data.id ? 'bg-gray-300' : 'bg-main-color'
          } text-main-text rounded  p-2 uppercase   text-sm w-full flex justify-center mt-auto`}
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
      </motion.div>
    </motion.div>
  );
}
