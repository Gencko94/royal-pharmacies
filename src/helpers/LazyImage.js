import React from 'react';
import LazyLoad from 'react-lazyload';
import itemplaceholder from '../assets/imgplaceholder.png';
export default function LazyImage({ src, height, alt, origin, placeholder }) {
  return (
    <LazyLoad
      offset={300}
      style={{
        backgroundColor: '#fff',
        height,
        borderRadius: '0.5em',
        overflow: 'hidden',
      }}
      placeholder={
        <img src={placeholder ? placeholder : itemplaceholder} alt={alt} />
      }
    >
      <img
        src={
          src
            ? `${process.env.REACT_APP_IMAGES_URL}/${
                origin || 'original'
              }/${src}`
            : placeholder
            ? placeholder
            : itemplaceholder
        }
        alt={alt}
        style={{
          height: '100%',
          width: '100%',
          display: 'block',
          objectFit: 'contain',
        }}
      />
    </LazyLoad>
  );
}
