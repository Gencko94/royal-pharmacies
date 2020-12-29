import React from 'react';
import ContentLoader from 'react-content-loader';
import LeftSideBrands from '../Category/LeftSideBrands';
import LeftSidePrice from '../Category/LeftSidePrice';

export default function SearchLeftSide({
  productsLoading,

  filteredProducts,
  filtersApplied,
  filteredProductsLoading,
  handlePriceChange,
  products,
  productsFetching,
  brandFilters,
  handleChangePriceInput,
  handleBrandChange,
  priceFilters,
  handleSubmitPrice,
}) {
  return (
    <div className="">
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
          handleBrandChange={handleBrandChange}
        />
      )}
      {/* Price */}

      <LeftSidePrice
        products={products}
        priceFilters={priceFilters}
        handlePriceChange={handlePriceChange}
        handleChangePriceInput={handleChangePriceInput}
        handleSubmitPrice={handleSubmitPrice}
        filteredProductsLength={filteredProducts?.length}
        productsLength={products?.length}
        filtersApplied={filtersApplied}
        filteredProductsLoading={filteredProductsLoading}
      />
    </div>
  );
}
