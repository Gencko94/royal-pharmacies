import React from 'react';
import { useMediaQuery } from 'react-responsive';
import BannerLazyImage from '../../helpers/BannerLazyImage';

export default function Banner({ url }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <div className="">
      <BannerLazyImage
        src={url}
        origin="original"
        alt="banner"
        pb={isTabletOrAbove ? 'calc(100% * 300/1440)' : 'calc(100% * 300/800)'}
      />
    </div>
  );
}
