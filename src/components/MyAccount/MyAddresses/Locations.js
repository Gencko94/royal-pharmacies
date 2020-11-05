import React from 'react';
import { useIntl } from 'react-intl';
import Location from './Location';

export default function Locations({ locations }) {
  const { formatMessage } = useIntl();
  return (
    <div className="h-full">
      <div className="flex p-3 bg-main-color text-main-text">
        <h1 className="text-lg">{formatMessage({ id: 'my-addresses' })}</h1>
      </div>
      <div className="p-3 locations-grid__desktop">
        {locations.map((location, i) => {
          return <Location key={i} data={location} />;
        })}
      </div>
    </div>
  );
}
