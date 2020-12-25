import { motion } from 'framer-motion';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import CategoryItemLoader from '../Category/CategoryItemLoader';
import CategoryProductItem from '../Category/CategoryProductItem';
import VariantCategoryProductItem from '../Category/VariantCategoryProductItem';
import SearchSortInfoPanel from './SearchSortInfoPanel';

export default function SearchRightSide({
  products,
  productsLoading,
  sortBy,
  filteredProducts,
  filteredProductsLoading,
  filtersApplied,
  handleRemoveFilters,
  handleSortByChange,
  filters,
  setCartMenuOpen,
  resultsPerPage,
  handleResultPerPageChange,
}) {
  const { formatMessage } = useIntl();
  if (productsLoading) {
    return (
      <div className="py-2">
        <ContentLoader
          speed={2}
          viewBox="0 0 752 51"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="51" />
        </ContentLoader>
        <div
          className="category-page-items__grid py-2"
          style={{ minHeight: 'calc(100vh - 150px)' }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="h-full">
      <SearchSortInfoPanel
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}
        productsCount={products?.length}
        handleResultPerPageChange={handleResultPerPageChange}
        resultsPerPage={resultsPerPage}
      />
      {filters.length !== 0 && (
        <div className="flex items-center">
          <motion.h1 layout className="text-lg font-semibold">
            {formatMessage({ id: 'filtered-by' })}
          </motion.h1>
          <motion.div layout className="mx-1 flex items-center">
            {filters.map(item => {
              return (
                <motion.button
                  layout
                  className="mx-1 py-1 px-2 bg-main-color text-main-text rounded-full"
                  key={item.value}
                  onClick={() => handleRemoveFilters(item.type)}
                >
                  {formatMessage({ id: item.type })} : {item.value}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      )}
      {products.length !== 0 && (
        <div
          className="category-page-items__grid py-2 "
          style={{ minHeight: 'calc(100vh - 150px)' }}
        >
          {!filtersApplied &&
            products.map(item => {
              return item.type === 'simple' ? (
                <CategoryProductItem
                  key={item.id}
                  setCartMenuOpen={setCartMenuOpen}
                  item={item}
                />
              ) : (
                <VariantCategoryProductItem
                  key={item.id}
                  setCartMenuOpen={setCartMenuOpen}
                  item={item}
                />
              );
            })}
          {filtersApplied &&
            filteredProductsLoading &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
              return <CategoryItemLoader key={i} />;
            })}
          {filtersApplied &&
            !filteredProductsLoading &&
            filteredProducts &&
            filteredProducts.map(item => {
              return item.type === 'simple' ? (
                <CategoryProductItem
                  key={item.id}
                  setCartMenuOpen={setCartMenuOpen}
                  item={item}
                />
              ) : (
                <VariantCategoryProductItem
                  key={item.id}
                  setCartMenuOpen={setCartMenuOpen}
                  item={item}
                />
              );
            })}
        </div>
      )}
      {products.length === 0 && (
        <div className="p-6 flex items-center justify-center text-xl h-full">
          {formatMessage({ id: 'no-products' })}
        </div>
      )}
    </div>
  );
}
