import React from 'react';
import LeftSideBrands from './LeftSideBrands';
import LeftSidePrice from './LeftSidePrice';

export default function CategoryLeftSide({
  handlePriceChange,

  categoryInfoLoading,
  brandFilters,
  handleChangePriceInput,
  handleBrandChange,
  priceFilters,
  handleSubmitPrice,
  productsLoading,
  products,
  brands,
}) {
  return (
    <div>
      {/* Category tree */}

      <LeftSideBrands
        brands={brands}
        brandFilters={brandFilters}
        handleBrandChange={handleBrandChange}
        categoryInfoLoading={categoryInfoLoading}
        productsLoading={productsLoading}
      />

      {/* Price */}
      <LeftSidePrice
        priceFilters={priceFilters}
        handlePriceChange={handlePriceChange}
        handleChangePriceInput={handleChangePriceInput}
        handleSubmitPrice={handleSubmitPrice}
        productsLoading={productsLoading}
        productsLength={products?.length}
        categoryInfoLoading={categoryInfoLoading}
      />
    </div>
  );
}
