import React from 'react';
import mastercard from '../../assets/paymentLogos/mastercard.png';
import knet from '../../assets/paymentLogos/knet.png';
import sadad from '../../assets/paymentLogos/sadad.png';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
export default function AcceptedPayments() {
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
      if (payment.key === 'bookeey') {
        arr.push(<img key={payment.key} src={sadad} alt={payment.key} />);
      }
    });
    return arr;
  };
  return (
    <div className="mb-2">
      <h1 className="mb-2 text-center font-semibold">
        {formatMessage({ id: 'accepted-payments' })}
      </h1>
      <div className="flex items-center justify-evenly mb-2">
        {resolveFlags()}
        {/* <img src={knet} alt="knet" />
        <img src={visa} alt="visa" />
        <img src={mastercard} alt="mastercard" />
        <img src={sadad} alt="sadad" /> */}
      </div>
    </div>
  );
}
