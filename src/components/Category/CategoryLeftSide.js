import React from 'react';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import LeftSideBrands from './LeftSideBrands';
import LeftSidePrice from './LeftSidePrice';

export default function CategoryLeftSide({
  categoryInfoLoading,
  brandFilters,
  priceFilters,
  productsLoading,
  products,
  brands,
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
    <div className="self-start sticky top-0">
      {/* Category tree */}

      <LeftSideBrands
        brands={brands}
        categoryInfoLoading={categoryInfoLoading}
        productsLoading={productsLoading}
        setSelectedBrands={setSelectedBrands}
        selectedBrands={selectedBrands}
      />

      {/* Price */}
      <LeftSidePrice
        productsLoading={productsLoading}
        productsLength={products?.length}
        categoryInfoLoading={categoryInfoLoading}
        setSelectedPrice={setSelectedPrice}
        selectedPrice={selectedPrice}
      />
      {!productsLoading &&
        !deliveryCountriesIdle &&
        !deliveryCountriesLoading &&
        !categoryInfoLoading &&
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
