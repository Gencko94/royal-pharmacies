import React from 'react';

export default function GoogleMapsAddress() {
  const [coordinates, setCoordinates] = React.useState({
    latitude: null,
    longitude: null,
  });
  const [locationSet, setLocationSet] = React.useState(false);
  const apikey = 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg';

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  const locationSuccess = position => {
    const { latitude, longitude } = position.coords;
    setCoordinates({ latitude, longitude });
    setLocationSet(true);
  };

  const locationError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User Denied the request for Geolocation. ');
        break;
      case error.POSITION.UNAVAILABLE:
        alert('Location information is Unavailable ');
        break;
      case error.TIMEOUT:
        alert('The Request to get user location was timed out. ');
        break;
      case error.UNKNOWN_ERROR:
        alert('An Unknown Error has Occured.');
        break;

      default:
        alert('An Unknown Error has Occured.');
    }
  };

  React.useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=51.165690999999995,10.451526&key=${apikey}`
    ).then(res => res.json().then(console.log(res)));
  }, []);
  return (
    <div>
      <h1>{coordinates.latitude}</h1>
      <h1>{coordinates.longitude}</h1>
      <button onClick={getLocation}>Get location</button>
      {locationSet && (
        <img
          src={`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=${apikey}`}
          alt=""
        />
      )}
    </div>
  );
}
