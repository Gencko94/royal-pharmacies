import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import mapStyles from '../helpers/mapStyles';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import PlacesSearch from './Cart/GuestCheckout/GoogleMaps/PlacesSearch';
import { useMediaQuery } from 'react-responsive';
import LocationForm from './LocationForm';
import { useIntl } from 'react-intl';
const libraries = ['places'];

const center = {
  lat: 29.3759,
  lng: 47.9774,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
export default function GoogleMapsAddress({ setShowMap }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const [outOfBorder, setOutOfBorder] = React.useState(false);
  const { formatMessage, locale } = useIntl();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    language: locale,
  });

  const [marker, setMarker] = React.useState(null);
  const [markerInfoWindowDetails, setMarkerInfoWindowDetails] = React.useState(
    null
  );
  const [markerAddress, setMarkerAddress] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    setMarker({ lat, lng });
    setMarkerInfoWindowDetails(null);
  }, []);

  React.useEffect(() => {
    if (marker) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=${locale}`
        )
        .then(res => {
          if (res.data.results.length === 0) {
            setMarkerAddress(null);
            setMarkerInfoWindowDetails(null);
            setOutOfBorder(true);
            return;
          }
          if (
            res.data.results[0].address_components.find(address =>
              address.types.includes('country')
            ).short_name !== 'KW' ||
            res.data.results.length === 0
          ) {
            setOutOfBorder(true);
          } else {
            if (outOfBorder === true) {
              setOutOfBorder(false);
            }
          }
          setMarkerAddress(`${res.data.results[0].formatted_address}`);
          setMarkerInfoWindowDetails(
            `${res.data.results[0].address_components
              .map(address => address.short_name)
              .join(', ')}`
          );
        })
        .catch(err => {});
    } else {
      setMarkerAddress(null);
      setMarkerInfoWindowDetails(null);
    }
  }, [marker, locale]);

  if (loadError)
    return (
      <div className="flex justify-center items-center h-full">
        <h1>{formatMessage({ id: 'error-loading-maps' })}</h1>
      </div>
    );
  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={!isLoaded}
        />
      </div>
    );
  return (
    <div
      className={`${
        isTabletOrAbove
          ? 'my-addresses-desktop-maps__grid'
          : 'my-addresses-mobile-maps__grid'
      }`}
    >
      <div className="relative h-full">
        <PlacesSearch panTo={panTo} markerAddress={markerAddress} />

        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: isTabletOrAbove ? '100%' : '300px',
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
          {marker && (
            <Marker position={{ lat: marker?.lat, lng: marker?.lng }} />
          )}
          {outOfBorder && (
            <div
              className="absolute mx-2 rounded p-2  bg-main-color text-main-text text-center"
              style={{ top: '110px', left: '2%', right: '2%', width: '94%' }}
            >
              <h1 className="text-sm">
                {formatMessage({ id: 'out-of-border' })}
              </h1>
            </div>
          )}
          {markerInfoWindowDetails && (
            <InfoWindow
              onCloseClick={() => setMarkerInfoWindowDetails(null)}
              position={{ lat: marker?.lat, lng: marker?.lng }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -50),
              }}
            >
              <div className="p-2">
                <div>
                  <h1>{markerInfoWindowDetails}</h1>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <LocationForm
        markerAddress={markerAddress}
        marker={marker}
        setShowMap={setShowMap}
        setMarker={setMarker}
        outOfBorder={outOfBorder}
      />
    </div>
  );
}
