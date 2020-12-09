import React from 'react';
import LazyLoad from 'react-lazyload';

export default function LazyImage({ src, pb, alt }) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#f7f7fa',
        paddingBottom: pb,
        width: '100%',
      }}
    >
      <div className="absolute top-0 left-0">
        <LazyLoad>
          <img src={src} alt={alt} />
        </LazyLoad>
      </div>
    </div>
  );
}
