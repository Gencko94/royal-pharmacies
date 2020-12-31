import React from 'react';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import knet from '../../assets/paymentLogos/knet.png';
import mastercard from '../../assets/paymentLogos/mastercard.png';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import cod from '../../assets/paymentLogos/cod.png';
import amex from '../../assets/paymentLogos/amex.png';
import { DataProvider } from '../../contexts/DataContext';
export default function PersonalInformationMobile({
  handleStepBack,
  selectedAddress,
  paymentMethod,
  setPaymentMethod,
  handleCheckout,
  checkoutLoading,
}) {
  const { formatMessage } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);

  const resolveFlags = () => {
    let arr = [];
    if (!deliveryCountry) return;
    deliveryCountry.payment.forEach(payment => {
      if (payment.status === 0) return null;
      if (payment.key === 'knet') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={knet} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">K-net</div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }
      if (payment.key === 'credit') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={mastercard} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">Credit Card</div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }

      if (payment.key === 'amex') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={amex} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">American Express</div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }
      if (payment.key === 'cod') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={cod} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">Cash on Delivery</div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }
    });
    return arr;
  };
  const handlePaymentChange = method => {
    setPaymentMethod(method);
  };
  return (
    <div className="h-full  ">
      <div className=" mb-2 border h-full  ">
        <div className="quick-checkout-personal-info-mobile__container p-2">
          <div className="flex flex-col justify-center font-semibold text-sm  ">
            <div className="relative  mb-4 ">
              <h1>{formatMessage({ id: 'selected-address' })}</h1>
              <div className="my-1 p-2 border rounded-lg flex">
                <div className="flex-1">
                  <div className="">
                    <h1 className="text-gray-600">
                      {formatMessage({
                        id:
                          'maps-detailed-address-street_neighborhood_governate',
                      })}
                      :
                    </h1>
                    <h1>{selectedAddress.marked_address}</h1>
                  </div>
                  <div className="">
                    <h1 className="text-gray-600">
                      {formatMessage({
                        id: 'maps-detailed-address-apartment',
                      })}
                      :
                    </h1>
                    <h1>{selectedAddress.apartment_house_number}</h1>
                  </div>
                  <div className="">
                    <h1 className="text-gray-600">
                      {formatMessage({
                        id: 'maps-detailed-address-building',
                      })}{' '}
                      :{' '}
                    </h1>
                    <h1>{selectedAddress.building_tower_number}</h1>
                  </div>
                  <div className="">
                    <h1 className="text-gray-600">
                      {formatMessage({
                        id: 'maps-details-extra-details',
                      })}{' '}
                      :{' '}
                    </h1>
                    <h1>{selectedAddress.addition_direction || ' - '}</h1>
                  </div>
                </div>
                <div>
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${selectedAddress.lat},${selectedAddress.lng}&zoom=15&size=200x200&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                    alt="thumbnail"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="font-semibold self-start">
            <div className=" mb-4 relative  ">
              <h1 className="">
                {' '}
                {formatMessage({ id: 'select-payment-method' })}
              </h1>
              <div className="mt-1">
                <div className="flex flex-col ">{resolveFlags()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center p-2">
          <button
            className="px-3 py-1 bg-main-color text-main-text rounded font-semibold mr-3"
            onClick={handleStepBack}
          >
            {formatMessage({ id: 'btn-back-to-addresses' })}
          </button>
          <button
            disabled={!paymentMethod}
            className={`
              ${
                paymentMethod
                  ? 'bg-main-color text-main-text'
                  : 'bg-gray-600 text-gray-100'
              }
             flex items-center justify-center uppercase px-3 py-1 mx-3  rounded font-semibold`}
            onClick={handleCheckout}
          >
            {checkoutLoading ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={24}
                width={24}
                visible={true}
              />
            ) : (
              formatMessage({ id: 'proceed-to-payment' })
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
