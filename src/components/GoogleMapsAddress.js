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
const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '500px',
};
const center = {
  lat: 29.3759,
  lng: 47.9774,
};
const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
export default function GoogleMapsAddress({ setAddress }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg',
    libraries,
  });
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
      <div
        style={{ minHeight: '400px' }}
        className="flex justify-center items-center"
      >
        <BeatLoader size={7} color={'#b72b2b'} />
      </div>
    );
  return (
    <div className="relative">
      <PlacesSearch panTo={panTo} markerAddress={markerAddress} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
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
    </div>
  );
}