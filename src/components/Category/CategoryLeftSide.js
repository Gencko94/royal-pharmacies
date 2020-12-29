import React from 'react';
import ContentLoader from 'react-content-loader';
import LeftSideBrands from './LeftSideBrands';
import LeftSideCategories from './LeftSideCategories';
import LeftSidePrice from './LeftSidePrice';

export default function CategoryLeftSide({
  productsLoading,
  handlePriceChange,
  products,
  categoryInfo,
  categoryInfoLoading,
  brandFilters,
  handleChangePriceInput,
  handleBrandChange,
  priceFilters,
  handleSubmitPrice,
  productsFetching,
  filtersApplied,
  filteredProductsLoading,
  filteredProducts,
}) {
  return (
    <div>
      {/* Category tree */}
      {!filtersApplied && !productsLoading && products?.length > 0 && (
        <LeftSideCategories
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
          productsLoading={productsLoading}
        />
      )}
      {/* Doing this because of the memo in brands */}
      {(productsLoading || productsFetching || filteredProductsLoading) && (
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
      )}
      {!productsLoading && !productsFetching && products?.length > 0 && (
        <LeftSideBrands
          products={products}
          brandFilters={brandFilters}
          handleBrandChange={handleBrandChange}
        />
      )}
      {/* Price */}
      <LeftSidePrice
        priceFilters={priceFilters}
        handlePriceChange={handlePriceChange}
        handleChangePriceInput={handleChangePriceInput}
        handleSubmitPrice={handleSubmitPrice}
        productsLoading={productsLoading}
        filtersApplied={filtersApplied}
        filteredProductsLoading={filteredProductsLoading}
        filteredProductsLength={filteredProducts?.length}
        productsLength={products?.length}
      />
    </div>
  );
}
