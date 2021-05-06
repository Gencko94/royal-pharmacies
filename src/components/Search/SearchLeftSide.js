import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import LeftSidePrice from '../Category/LeftSidePrice';

export default function SearchLeftSide({
  productsLoading,
  products,
  brandFilters,
  priceFilters,
  handleSubmitFilters,
  filters,
}) {
  const { formatMessage } = useIntl();
  const [selectedBrands, setSelectedBrands] = React.useState(() => {
    if (brandFilters.length > 0) return brandFilters;
    return [];
  });
  const [selectedPrice, setSelectedPrice] = React.useState(() => {
    if (priceFilters) return priceFilters;
    return null;
  });
  React.useState(() => {
    setSelectedBrands(() => {
      if (brandFilters.length > 0) return brandFilters;
      return [];
    });
    setSelectedPrice(() => {
      if (priceFilters) return priceFilters;
      return null;
    });
  }, [priceFilters, brandFilters]);
  return (
    <div className="py-2">
      {/* Brands */}

      {/* Price */}

      {filters.length > 0 || products?.length > 0 ? (
        <LeftSidePrice
          priceFilters={priceFilters}
          // productsLength={products?.length}
          productsLoading={productsLoading}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />
      ) : (
        productsLoading && (
          <div className="py-2">
            <ContentLoader
              speed={2}
              viewBox="0 0 300 150"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="35" />
              <rect x="0" y="40" rx="5" ry="5" width="100%" height="15" />
              <rect x="0" y="65" rx="5" ry="5" width="100%" height="15" />
              <rect x="0" y="90" rx="5" ry="5" width="100%" height="15" />
              <rect x="0" y="115" rx="5" ry="5" width="100%" height="15" />
            </ContentLoader>
          </div>
        )
      )}
      {filters.length > 0 || products?.length > 0 ? (
        <div className="p-2">
          <button
            disabled={!selectedPrice && selectedBrands.length === 0}
            className="p-2 uppercase bg-green-700 text-main-text rounded w-full"
            onClick={() => {
              handleSubmitFilters(selectedPrice, selectedBrands);
            }}
          >
            {formatMessage({ id: 'submit' })}
          </button>
        </div>
      ) : null}
    </div>
  );
}
