import React from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import PlacesSearch from './Cart/GuestCheckout/GoogleMaps/PlacesSearch';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';
import { useMediaQuery } from 'react-responsive';
const libraries = ['places'];

const center = {
  lat: 29.3759,
  lng: 47.9774,
};
const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
export default function GoogleMapsAddress({
  setAddress,
  addMutation,
  AddButtonLoading,
}) {
  const { isTabletOrAbove } = useMediaQuery({ query: '(min-width:768px)' });
  const { formatMessage } = useIntl();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg',
    libraries,
  });
  const [defaultLocationChecked, setDefaultLocationChecked] = React.useState(
    false
  );
  const [marker, setMarker] = React.useState(null);
  const [markerDetails, setMarkerDetails] = React.useState(null);
  const [markerAddress, setMarkerAddress] = React.useState(null);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);
  const handleAddLocation = async () => {
    try {
      await addMutation({
        lat: marker.lat,
        lng: marker.lng,
        defaultLocation: defaultLocationChecked,
        street: markerAddress.street,
        governate: markerAddress.governate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (marker) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg`
        )
        .then(res => {
          setMarkerAddress({
            street: res.data.results[0].address_components[0].short_name,
            governate: res.data.results[0].address_components[1].short_name,
          });
          setAddress({
            lat: marker.lat,
            lon: marker.long,
            street: res.data.results[0].address_components[0].short_name,
            governate: res.data.results[0].address_components[1].short_name,
          });
        })
        .catch(err => console.log(err));
    }
  }, [marker, setAddress]);
  React.useEffect(() => {
    if (marker) {
      setMarkerDetails({
        lat: marker.lat,
        lng: marker.lng,
      });
    }
  }, [marker]);
  React.useEffect(() => {
    if (markerDetails) {
      setMarkerAddress(null);
    }
  }, [markerDetails]);
  if (loadError) return 'Error loading maps';
  if (!isLoaded)
    return (
      <div className="flex h-full justify-center items-center">
        <BeatLoader size={10} color={'#b72b2b'} />
      </div>
    );
  return (
    <div className="relative h-full">
      <PlacesSearch panTo={panTo} markerAddress={markerAddress} />

      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: isTabletOrAbove
            ? 'cale(-135px + 100vh)'
            : 'calc(-170px + 100vh)',
        }}
        zoom={15}
        center={center}
        options={options}
        clickableIcons={false}
        onLoad={onMapLoad}
        onClick={e => {
          setMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
        {markerDetails && (
          <InfoWindow
            onCloseClick={() => setMarkerDetails(null)}
            position={{ lat: marker.lat, lng: marker.lng }}
            options={{
              pixelOffset: new window.google.maps.Size(0, -50),
            }}
          >
            <div className="p-2">
              <BeatLoader size={7} color={'#b72b2b'} loading={!markerAddress} />
              {markerAddress && (
                <div>
                  <h1>{markerAddress.street}</h1>
                  <h1>{markerAddress.governate}</h1>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className="p-2 flex items-center justify-between ">
        <div className="flex items-center">
          <label>{formatMessage({ id: 'mark-as-default' })}</label>
          <input
            className=" mx-2"
            type="checkbox"
            checked={defaultLocationChecked}
            onChange={() => setDefaultLocationChecked(!defaultLocationChecked)}
          />
        </div>
        <button
          onClick={handleAddLocation}
          disabled={!markerDetails}
          className={`${
            !markerDetails
              ? 'btn-disabled'
              : AddButtonLoading
              ? 'bg-gray-300 text-main-text'
              : 'bg-main-color text-main-text'
          }   p-1 px-2 rounded    flex items-center justify-center font-semibold`}
        >
          {AddButtonLoading ? (
            <MoonLoader size={19} color="#b72b2b" />
          ) : (
            <h1>{formatMessage({ id: 'confirm-location' })}</h1>
          )}
        </button>
      </div>
    </div>
  );
}
