import React from 'react';
import { useIntl } from 'react-intl';
import Location from './Location';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Locations({
  locations,
  handleDeleteLocation,
  handleShowMap,
}) {
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(null);
  const { formatMessage } = useIntl();
  const handleRemoveLocation = location => {
    handleDeleteLocation(location);
    setDeleteButtonLoading(location.lat);
  };
  return (
    <div className="h-full">
      <div className="flex p-3 items-center justify-between bg-main-color text-main-text">
        <h1 className="text-lg">{formatMessage({ id: 'my-addresses' })}</h1>
        <button onClick={handleShowMap}>
          <AiOutlinePlus className="h-6 w-6" />
        </button>
      </div>
      <div className="p-3 locations-grid__desktop">
        {locations.map((location, i) => {
          return (
            <Location
              key={i}
              data={location}
              handleRemoveLocation={handleRemoveLocation}
              deleteButtonLoading={deleteButtonLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
