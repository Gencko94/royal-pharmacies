import React from 'react';
import { BeatLoader } from 'react-spinners';
import { DataProvider } from '../../contexts/DataContext';
import GoogleMapsAddress from '../GoogleMapsAddress';
import Locations from './MyAddresses/Locations';
import NoAddresses from './MyAddresses/NoAddresses';

export default function MyAddresses({ isLightTheme }) {
  const [showMap, setShowMap] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const {
    getUserLocation,
    handleAddLocation,
    handleRemoveLocation,
  } = React.useContext(DataProvider);
  const [locations, setLocations] = React.useState([]);
  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleSaveLocation = location => {
    handleAddLocation(location).then(res => {
      if (res.message === 'ok') {
        setShowMap(false);
        console.log(res.locations);
        setLocations(res.locations);
      }
    });
  };
  const handleDeleteLocation = location => {
    handleRemoveLocation(location)
      .then(res => {
        if (res.message === 'ok') {
          setLocations(res.locations);
        }
      })
      .catch(err => console.log(err));
  };
  React.useEffect(() => {
    getUserLocation().then(res => {
      if (res.message === 'No Locations Found') {
        setLoading(false);
      } else {
        setLocations(res.locations);
        setLoading(false);
      }
    });
  }, [getUserLocation]);
  return (
    <div
      className={`rounded-lg overflow-hidden ${
        isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider-wide'
      }`}
    >
      {loading && (
        <div className="flex h-full justify-center items-center">
          <BeatLoader size={10} color={'#b72b2b'} />
        </div>
      )}
      {!loading &&
        !showMap &&
        (locations.length === 0 ? (
          <NoAddresses
            isLightTheme={isLightTheme}
            handleShowMap={handleShowMap}
          />
        ) : (
          <Locations
            locations={locations}
            handleDeleteLocation={handleDeleteLocation}
            handleShowMap={handleShowMap}
          />
        ))}
      {showMap && (
        <GoogleMapsAddress
          setShowMap={setShowMap}
          setLocations={setLocations}
          handleSaveLocation={handleSaveLocation}
        />
      )}
    </div>
  );
}
