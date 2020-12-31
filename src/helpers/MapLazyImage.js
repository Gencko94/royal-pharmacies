import React from 'react';
import LazyLoad from 'react-lazyload';
import itemplaceholder from '../assets/imgplaceholder.png';
export default function MapLazyImage({ alt, lat, width, height, lng }) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#fff',
        paddingBottom: `calc(100% * ${height}/${width})`,
        width: '100%',
      }}
    >
      <LazyLoad
        placeholder={<img src={itemplaceholder} alt={alt} />}
        className="max-h-full"
      >
        <img
          src={
            lat
              ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=${width}x${height}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
              : itemplaceholder
          }
          alt={alt}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            display: 'block',
            left: 0,
            right: 0,
          }}
          className="mx-auto my-0 absolute"
        />
      </LazyLoad>
    </div>
  );
}
