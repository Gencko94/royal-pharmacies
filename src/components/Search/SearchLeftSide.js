import React from 'react';
import LeftSideBrands from '../Category/LeftSideBrands';
import LeftSidePrice from '../Category/LeftSidePrice';

export default function SearchLeftSide({
  productsLoading,

  handlePriceChange,
  products,

  brandFilters,
  handleChangePriceInput,
  handleBrandChange,
  priceFilters,
  handleSubmitPrice,
}) {
  return (
    <div className="py-2">
      {/* Brands */}
      {!productsLoading && (
        <LeftSideBrands
          products={products}
          brandFilters={brandFilters}
          handleBrandChange={handleBrandChange}
        />
      )}
      {/* Price */}
      {!productsLoading && (
        <LeftSidePrice
          products={products}
          priceFilters={priceFilters}
          handlePriceChange={handlePriceChange}
          handleChangePriceInput={handleChangePriceInput}
          handleSubmitPrice={handleSubmitPrice}
        />
      )}
    </div>
  );
}
