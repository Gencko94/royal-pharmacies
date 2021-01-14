import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../../contexts/DataContext';

export default function OrderPlacedMobile() {
  const { formatMessage, locale } = useIntl();
  const { settings, deliveryCountry } = React.useContext(DataProvider);
  const formatDaysPlural = () => {
    switch (parseInt(deliveryCountry?.delivery_time)) {
      case 1:
        return formatMessage({ id: 'one-day' });

      case 2:
        return formatMessage({ id: 'two-days' });

      case parseInt(
        deliveryCountry?.delivery_time > 10 && deliveryCountry?.delivery_time
      ):
        return formatMessage({ id: 'more-than-10-days' });

      default:
        return formatMessage({ id: 'days' });
    }
  };
  React.useEffect(() => {
    localStorage.setItem('localCart', JSON.stringify([]));
  }, []);
  return (
    <div
      className="flex flex-col justify-center items-center px-10 "
      style={{ minHeight: 'calc(100vh - 237px)' }}
    >
      <div className="flex flex-col h-full justify-center items-center ">
        <h1 className="font-bold text-2xl mb-2 text-center">
          {formatMessage({ id: 'order-placed-msg' })}
        </h1>

        <h1 className="font-semibold mb-2 text-center">
          {formatMessage({ id: 'expected-delivery-msg' })}{' '}
          <strong>{formatDaysPlural()}</strong>
        </h1>
        <h1 className="font-semibold mb-2 text-center">
          {formatMessage({ id: 'checkout-help-center-msg' })}
        </h1>
        <div className="flex  items-center justify-center mt-2 mb-4 ">
          <div className="p-1  rounded-full bg-main-color ">
            <IoMdCall className=" h-25p w-25p text-main-text" />
          </div>
          <div className="flex flex-col text-center mx-6 font-semibold">
            <h1>{formatMessage({ id: 'footer-help-center' })}</h1>
            <h1>
              {formatMessage({ id: 'footer-call' })} {settings?.store_mobile}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 mb-4">
          <div className="p-1  rounded-full bg-main-color">
            <MdEmail className=" h-25p w-25p text-main-text" />
          </div>
          <div className="flex text-center font-semibold flex-col mx-6">
            <h1>{formatMessage({ id: 'footer-contact-email' })}</h1>
            <h1>{settings?.store_email}</h1>
          </div>
        </div>
        <h1 className="font-bold text-lg text-center">
          {formatMessage({ id: 'thank-you-for-shopping-msg' })}
        </h1>
        <Link
          to={`/${locale}/`}
          className="font-semibold rounded uppercase p-2 text-sm bg-main-color text-main-text"
        >
          {formatMessage({ id: 'back-to-home' })}
        </Link>
      </div>
    </div>
  );
}
