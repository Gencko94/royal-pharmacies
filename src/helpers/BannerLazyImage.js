import React from 'react';
import LazyLoad from 'react-lazyload';
import { useMediaQuery } from 'react-responsive';
import desktopplaceholder from '../assets/DesktopBannerPlaceholder.png';
import mobileplaceholder from '../assets/MobileBannerPlaceholder.png';
export default function BannerLazyImage({ src, pb, alt, origin }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#fff',
        paddingBottom: pb,
        width: '100%',
      }}
    >
      <LazyLoad
        offset={400}
        placeholder={
          <img
            src={isTabletOrAbove ? desktopplaceholder : mobileplaceholder}
            alt={alt}
          />
        }
        className="max-h-full"
      >
        <img
          src={
            src
              ? `${process.env.REACT_APP_IMAGES_URL}/${
                  origin || 'original'
                }/${src}`
              : isTabletOrAbove
              ? desktopplaceholder
              : mobileplaceholder
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
