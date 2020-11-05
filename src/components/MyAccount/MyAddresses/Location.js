import React from 'react';

export default function Location({ data }) {
  const key = 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg';
  return (
    <div className="rounded border shadow-itemsSlider-shallow bg-body-light">
      <div>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.lat},${data.lng}&zoom=15&size=200x100&key=${key}`}
          alt="thumbnail"
        />
      </div>
      <div className="p-2">
        <h1>{data.street}</h1>
        <h1>{data.governate}</h1>
      </div>
    </div>
  );
}
