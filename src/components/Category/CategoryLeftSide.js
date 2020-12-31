import React from 'react';
import LeftSideBrands from './LeftSideBrands';
import LeftSideCategories from './LeftSideCategories';
import LeftSidePrice from './LeftSidePrice';

export default function CategoryLeftSide({
  handlePriceChange,

  categoryInfo,
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

      <LeftSideCategories
        categoryInfo={categoryInfo}
        categoryInfoLoading={categoryInfoLoading}
        productsLoading={productsLoading}
        productsLength={products?.length}
      />

      {/* Doing this because of the memo in brands */}

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
      />
    </div>
  );
}
