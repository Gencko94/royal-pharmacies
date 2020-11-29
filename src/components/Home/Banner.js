import React from 'react';
export default function Banner({ url }) {
  console.log(url);
  return (
    <img
      src={`${process.env.REACT_APP_IMAGES_URL}/original/${url}`}
      alt="garnier"
      className="w-full h-auto rounded"
    />
  );
}
