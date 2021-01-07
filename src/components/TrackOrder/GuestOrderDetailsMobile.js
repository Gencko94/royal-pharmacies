import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import { getSingleGuestOrder } from '../../Queries/Queries';

export default function GuestOrderDetailsMobile({
  id,
  isOpen,
  handleOrderDetailsClose,
}) {
  const { locale, formatMessage } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const containerVariants = {
    hidden: {
      y: '50%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
      },
    },
  };
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);
  const { data, isLoading } = useQuery(
    ['single-guest-order', id],
    getSingleGuestOrder,
    { retry: true, refetchOnWindowFocus: false }
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-body-light z-30 h-screen"
    >
      <div className=" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1">
        <button
          className="text-white text-center"
          onClick={handleOrderDetailsClose}
        >
          {locale === 'en' ? (
            <AiOutlineArrowLeft className="w-6 h-6 " />
          ) : (
            <AiOutlineArrowRight className="w-6 h-6 " />
          )}
        </button>
        <h1 className="font-semibold text-lg mx-4">
          {formatMessage({ id: 'order-details' })}
        </h1>
      </div>
      {isLoading && (
        <div
          className="flex justify-center items-center"
          style={{ height: 'calc(100vh - 51px)' }}
        >
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={40}
            width={40}
            visible={true}
          />
        </div>
      )}
      {!isLoading && (
        <div>
          <div className="p-2 border-b">
            <h1 className="font-bold text-lg">
              {formatMessage({ id: 'delivery' })}
            </h1>
          </div>
          <div className="p-2">
            <div className=" font-semibold">
              <h1 className="text-gray-700 font-bold">
                {formatMessage({
                  id: 'full-name',
                })}
              </h1>
              <h1 className="text-sm">{data.address.customer.name}</h1>
            </div>
            {data.address.customer.email && (
              <div className=" font-semibold">
                <h1 className="text-gray-700 font-bold ">
                  {formatMessage({
                    id: 'full-name',
                  })}
                </h1>
                <h1 className="text-sm">{data.address.customer.email}</h1>
              </div>
            )}
            <div className=" font-semibold">
              <h1 className="text-gray-700 font-bold">
                {formatMessage({
                  id: 'phone-number',
                })}
              </h1>
              <h1 className="text-sm">{data.address.customer.mobile}</h1>
            </div>
            <div className=" font-semibold">
              <h1 className="text-gray-700 font-bold ">
                {formatMessage({
                  id: 'location',
                })}
              </h1>
              <h1 className="text-sm">{`${
                data.address.type === 'map'
                  ? data.address.marked_address
                  : data.address.userTyped_address
              }`}</h1>
            </div>
            <div className="font-semibold">
              <h1 className="text-gray-700  font-bold">
                {formatMessage({
                  id: 'maps-detailed-address-apartment',
                })}
              </h1>
              <h1 className="text-sm">{data.address.apartment_house_number}</h1>
            </div>
            {data.address.building_tower_number && (
              <div className="font-semibold">
                <h1 className="text-gray-800  font-bold">
                  {formatMessage({
                    id: 'maps-detailed-address-building',
                  })}
                </h1>
                <h1 className="text-sm">
                  {data.address.building_tower_number}
                </h1>
              </div>
            )}
            {data.address.addition_direction && (
              <div className="font-semibold">
                <h1 className="text-gray-800 font-bold">
                  {formatMessage({
                    id: 'maps-details-extra-details',
                  })}
                </h1>
                <h1 className="text-sm">{data.address.addition_direction}</h1>
              </div>
            )}

            <div>
              {data.address.type === 'map' && data.address.lat && (
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.address.lat},${data.address.lng}&zoom=15&size=150x150&
              markers=color:blue%7C${data.address.lat}-${data.address.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                  alt="map"
                />
              )}
            </div>
          </div>
          <hr className="my-4" />
          <div className="p-2 border-b">
            <h1 className="font-bold text-lg">
              {formatMessage({ id: 'order-receipt' })}
            </h1>
          </div>
          <div className="p-2 text-sm">
            <div className="my-orders-items__table-desktop font-semibold text-center mb-2">
              <h1>#</h1>
              <h1>{formatMessage({ id: 'the-item' })}</h1>
              <h1>{formatMessage({ id: 'quantity' })}</h1>
              <h1>{formatMessage({ id: 'price' })}</h1>
              <h1>{formatMessage({ id: 'total' })}</h1>
            </div>

            {data.items.map((orderItem, i) => {
              return (
                <div
                  key={orderItem.id}
                  className="my-orders-item-desktop text-base text-center"
                >
                  <div className="">
                    <h1 className="">{i + 1}</h1>
                  </div>
                  <Link
                    to={`/${locale}/products/${orderItem.product.slug}/${orderItem.id}`}
                    className="hover:underline truncate uppercase font-semibold block"
                  >
                    {orderItem.product.translation[locale].title}
                  </Link>
                  <div className="">
                    <h1 className="">{orderItem.qty}</h1>
                  </div>
                  <div style={{ fontWeight: 900 }}>
                    <h1 className="">{orderItem.price} </h1>
                  </div>
                  <div style={{ fontWeight: 900 }} className="text-green-700">
                    <h1 className="">
                      {(orderItem.price * orderItem.qty).toFixed(3)}{' '}
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </h1>
                  </div>
                </div>
              );
            })}
            <hr className="my-3" />
            <div className="my-orders-receipt-summary font-bold">
              <h1>{formatMessage({ id: 'cart-total' })}</h1>
              <h1 className="text-center">
                {data.subtotal}{' '}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1>{formatMessage({ id: 'cart-delivery-cost' })}</h1>
              <h1 className="text-center">
                {data.shipping_cost === '0'
                  ? formatMessage({ id: 'cart-free' })
                  : data.shipping_cost}{' '}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              {data.coupon_cost !== '0.000' && (
                <h1 className="mb-2 text-green-700">
                  {formatMessage({ id: 'coupon-sale' })}
                </h1>
              )}
              {data.coupon_cost !== '0.000' && (
                <h1 className="mb-2 text-center text-green-700">
                  {data.coupon_cost}
                  <span className="mx-1">
                    {deliveryCountry?.currency.translation[locale].symbol}
                  </span>
                </h1>
              )}
              <h1
                className="text-green-700 text-lg font-bold"
                style={{ fontWeight: 900 }}
              >
                {formatMessage({ id: 'subtotal' })}
              </h1>
              <h1
                className="text-green-700 text-lg font-bold text-center"
                style={{ fontWeight: 900 }}
              >
                {data.total}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
