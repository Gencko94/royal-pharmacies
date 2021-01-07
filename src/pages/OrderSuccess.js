import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import Language from '../components/NavbarComponents/Language';
import { DataProvider } from '../contexts/DataContext';

export default function OrderSuccess() {
  const { formatMessage, locale } = useIntl();
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { settings, deliveryCountry } = React.useContext(DataProvider);
  const formatDaysPlural = () => {
    switch (parseInt(deliveryCountry?.delivery_time)) {
      case 1:
        return formatMessage({ id: 'one-day' });

      case 2:
        return formatMessage({ id: 'two-days' });

      case parseInt(deliveryCountry?.delivery_time > 10):
        return formatMessage({ id: 'more-than-10-days' });

      default:
        return formatMessage({ id: 'days' });
    }
  };
  return (
    <div className=" text-gray-900 px-2 flex justify-center items-center   h-screen relative">
      <div className="max-w-screen-sm flex items-center justify-center flex-col">
        <Link to={`/${locale}/`}>
          <img
            src={settings?.store_logo_color}
            alt="logo"
            className=" mb-5"
            style={{ width: '100px', height: '50px' }}
          />
        </Link>
        <h1 className="font-bold text-2xl text-center mb-2">
          {formatMessage({ id: 'order-placed-msg' })}
        </h1>

        <h1 className="font-semibold text-xl mb-2">
          {formatMessage({ id: 'expected-delivery-msg' })}{' '}
          <strong>{formatDaysPlural()}</strong>
        </h1>
        <div className="flex  items-center justify-center mt-2 mb-4 ">
          <div className="p-1  rounded-full bg-main-color ">
            <IoMdCall className=" h-25p w-25p text-main-text" />
          </div>
          <div className="flex flex-col text-center mx-6 font-semibold">
            <h1 className="font-bold">
              {formatMessage({ id: 'footer-help-center' })}
            </h1>
            <h1>
              {formatMessage({ id: 'footer-call' })} {settings?.store_mobile}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 mb-4">
          <div className="p-1  rounded-full bg-main-color">
            <MdEmail className=" h-25p w-25p text-main-text" />
          </div>
          <div className="flex text-center  flex-col mx-6 font-semibold">
            <h1 className="font-bold">
              {formatMessage({ id: 'footer-contact-email' })}
            </h1>
            <h1>{settings?.store_email}</h1>
          </div>
        </div>
        <h1 className="font-bold text-2xl">
          {formatMessage({ id: 'thank-you-for-shopping-msg' })}
        </h1>
      </div>
      <div
        className={`${
          isTabletOrAbove
            ? 'credentials-language__container'
            : 'credentials-language__container-mobile'
        }`}
      >
        <Language />
      </div>
    </div>
  );
}
