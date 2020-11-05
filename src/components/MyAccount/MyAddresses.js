import React from 'react';
import { BeatLoader } from 'react-spinners';
import { DataProvider } from '../../contexts/DataContext';
import GoogleMapsAddress from '../GoogleMapsAddress';
import Locations from './MyAddresses/Locations';
import NoAddresses from './MyAddresses/NoAddresses';

export default function MyAddresses({ isLightTheme }) {
  const [showMap, setShowMap] = React.useState(false);
  const [showNoAddresses, setShowNoAddresses] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { getUserLocation } = React.useContext(DataProvider);
  const [locationsFound, setLocationsFound] = React.useState();
  const handleShowMap = () => {
    setShowNoAddresses(false);
    setShowMap(true);
  };
  React.useEffect(() => {
    getUserLocation().then(res => {
      if (res.message === 'No Locations Found') {
        setShowNoAddresses(true);
        setLoading(false);
      } else {
        setLocationsFound(res.locations);
        console.log(res.locations);
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
      {showNoAddresses && !loading && (
        <NoAddresses
          isLightTheme={isLightTheme}
          handleShowMap={handleShowMap}
        />
      )}
      {showMap && <GoogleMapsAddress setShowMap={setShowMap} />}
      {!loading && locationsFound && <Locations locations={locationsFound} />}
    </div>
  );
}
