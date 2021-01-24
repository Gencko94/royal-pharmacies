import React from 'react';
import mastercard from '../../assets/paymentLogos/mastercard.png';
import knet from '../../assets/paymentLogos/knet.png';

import amex from '../../assets/paymentLogos/amex.png';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
export default function AcceptedPaymentsMobile() {
  const { deliveryCountry } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
  const resolveFlags = () => {
    let arr = [];
    if (!deliveryCountry) return;
    deliveryCountry.payment.forEach(payment => {
      if (payment.status === 0) return null;
      if (payment.key === 'knet') {
        arr.push(<img key={payment.key} src={knet} alt={payment.key} />);
      }
      if (payment.key === 'credit') {
        arr.push(<img key={payment.key} src={mastercard} alt={payment.key} />);
      }

      if (payment.key === 'amex') {
        arr.push(<img key={payment.key} src={amex} alt={payment.key} />);
      }
    });
    return arr;
  };
  return (
    <div className="bg-gray-200 -mx-2 p-2 border-b">
      <h1 className="mb-2 text-center font-semibold">
        {formatMessage({ id: 'accepted-payments' })}
      </h1>
      <div className="flex items-center justify-evenly mb-2">
        {resolveFlags()}
      </div>
    </div>
  );
}
