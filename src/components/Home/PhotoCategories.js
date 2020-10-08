import React from 'react';
import { useMediaQuery } from 'react-responsive';
export default function PhotoCategories({ data, title }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,minmax(150px,1fr)',
    gap: '8px',
  };
  const mobileGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(150px,1fr) minmax(150px,1fr)',
    gap: '8px',
  };

  return (
    <div className="py-6">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold flex-grow">{title}</h1>
        <button className="p-0">See all</button>
      </div>
      {isTabletOrAbove && (
        <div style={gridStyle}>
          {data.map((item, i) => {
            return <img key={i} src={item} alt={i} />;
          })}
        </div>
      )}
      {!isTabletOrAbove && (
        <div style={mobileGridStyle}>
          {data.map((item, i) => {
            return <img key={i} src={item} alt={i} />;
          })}
        </div>
      )}
    </div>
  );
}
