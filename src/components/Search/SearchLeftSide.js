import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import LeftSideBrands from '../Category/LeftSideBrands';
import LeftSidePrice from '../Category/LeftSidePrice';

export default function SearchLeftSide({
  productsLoading,
  filteredProducts,
  filtersApplied,
  filteredProductsLoading,
  products,
  productsFetching,
  brandFilters,
  priceFilters,
  handleSubmitFilters,
}) {
  const { deliveryCountriesLoading, deliveryCountriesIdle } = React.useContext(
    DataProvider
  );
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
    <div>
      {/* Brands */}
      {productsLoading ||
        (productsFetching && (
          <ContentLoader
            speed={2}
            viewBox="0 0 300 150"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
            <rect x="0" y="40" rx="5" ry="5" width="100%" height="15" />
            <rect x="0" y="65" rx="5" ry="5" width="100%" height="15" />
            <rect x="0" y="90" rx="5" ry="5" width="100%" height="15" />
            <rect x="0" y="115" rx="5" ry="5" width="100%" height="15" />
          </ContentLoader>
        ))}
      {!productsLoading && !productsFetching && (
        <LeftSideBrands
          products={products}
          brandFilters={brandFilters}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />
      )}
      {/* Price */}

      <LeftSidePrice
        products={products}
        priceFilters={priceFilters}
        filteredProductsLength={filteredProducts?.length}
        productsLength={products?.length}
        filtersApplied={filtersApplied}
        filteredProductsLoading={filteredProductsLoading}
        productsLoading={productsLoading}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />
      {!productsLoading &&
        !deliveryCountriesIdle &&
        !deliveryCountriesLoading &&
        products.length > 0 && (
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
        )}
    </div>
  );
}
