import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function OrderPlaced() {
  const { formatMessage, locale } = useIntl();
  return (
    <div className="h-full">
      <div className="rounded-lg border mb-2 h-full">
        <div
          className="flex flex-col justify-center items-center "
          style={{ height: '430px' }}
        >
          <h1 className="text-lg">
            {formatMessage({ id: 'order-placed-msg' })}
          </h1>
          <Link to={`/${locale}/user/account/orders`}>My Orders</Link>
        </div>
      </div>
    </div>
  );
}
