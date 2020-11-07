import React from 'react';
import { BeatLoader } from 'react-spinners';
import { DataProvider } from '../../contexts/DataContext';
import GoogleMapsAddress from '../GoogleMapsAddress';
import Locations from './MyAddresses/Locations';
import NoAddresses from './MyAddresses/NoAddresses';
import { useQuery, useMutation, queryCache } from 'react-query';

export default function MyAddresses({ isLightTheme }) {
  const { isLoading, data, refetch } = useQuery('addresses', async () => {
    const res = await getUserLocation();
    console.log(res);
    if (res.message === 'No Locations Found') {
      return [];
    } else {
      return res.locations;
    }
  });
  const [mutate] = useMutation(
    async ({ location }) => {
      const res = await handleAddLocation(location);
      if (res.message === 'ok') {
        return res.locations;
      }
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('addresses', () => {
          return data;
        });
        refetch();
        setShowMap(false);
      },
    }
  );
  const [showMap, setShowMap] = React.useState(false);
  const {
    getUserLocation,
    handleAddLocation,
    handleRemoveLocation,
  } = React.useContext(DataProvider);
  const [, setLocations] = React.useState([]);
  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleSaveLocation = async location => {
    try {
      await mutate({
        location,
      });
    } catch (error) {}
    // handleAddLocation(location).then(res => {
    //   if (res.message === 'ok') {
    //     setShowMap(false);
    //     console.log(res.locations);
    //     setLocations(res.locations);
    //   }
    // });
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
  // React.useEffect(() => {
  //   getUserLocation().then(res => {
  //     if (res.message === 'No Locations Found') {
  //       setLoading(false);
  //     } else {
  //       setLocations(res.locations);
  //       setLoading(false);
  //     }
  //   });
  // }, [getUserLocation]);

  if (isLoading)
    return (
      <div
        className={`rounded-lg overflow-hidden ${
          isLightTheme
            ? 'shadow-itemsSlider-shallow'
            : 'shadow-itemsSlider-wide'
        }`}
      >
        <div className="flex h-full justify-center items-center">
          <BeatLoader size={10} color={'#b72b2b'} />
        </div>
      </div>
    );
  return (
    <div
      className={`rounded-lg overflow-hidden ${
        isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider-wide'
      }`}
    >
      {!isLoading &&
        !showMap &&
        (data.length === 0 ? (
          <NoAddresses
            isLightTheme={isLightTheme}
            handleShowMap={handleShowMap}
          />
        ) : (
          <Locations
            locations={data}
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
