import { motion } from 'framer-motion';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import CategoryItemLoader from '../Category/CategoryItemLoader';
import CategoryProductItem from '../Category/CategoryProductItem';
import VariantCategoryProductItem from '../Category/VariantCategoryProductItem';
import SearchSortInfoPanel from './SearchSortInfoPanel';
export default function SearchRightSide({
  data,
  productsLoading,
  sortBy,

  handleRemoveFilters,
  handleSortByChange,
  filters,
  setCartMenuOpen,
  resultsPerPage,
  handleResultPerPageChange,
  query,
}) {
  const { formatMessage } = useIntl();

  return (
    <div id="top" style={{ minHeight: 'calc(100vh - 150px)' }}>
      {filters.length > 0 || data?.pages[0].products.length > 0 ? (
        <SearchSortInfoPanel
          sortBy={sortBy}
          handleSortByChange={handleSortByChange}
          productsCount={data?.pages[0].products?.length}
          handleResultPerPageChange={handleResultPerPageChange}
          resultsPerPage={resultsPerPage}
          query={query}
        />
      ) : (
        productsLoading && (
          <ContentLoader
            speed={2}
            viewBox="0 0 752 40"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
          </ContentLoader>
        )
      )}
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
                  onClick={() => handleRemoveFilters(item)}
                >
                  {formatMessage({ id: item.type })} : {item.value}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      )}
      {productsLoading && (
        <div className="py-2">
          <div
            className="category-page-items__grid py-2"
            style={{ minHeight: 'calc(100vh - 150px)' }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
              return <CategoryItemLoader key={i} />;
            })}
          </div>
        </div>
      )}
      {data?.pages[0].products?.length > 0 && !productsLoading && (
        <div
          className="category-page-items__grid py-2 min-h-full relative"
          style={{ minHeight: 'calc(100vh - 150px)' }}
        >
          {data?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group?.products.map(item => {
                  return item.type === 'variation' &&
                    Object.keys(item.new_variation_addons).length > 0 ? (
                    <VariantCategoryProductItem
                      key={item.id}
                      setCartMenuOpen={setCartMenuOpen}
                      item={item}
                    />
                  ) : (
                    <CategoryProductItem
                      key={item.id}
                      setCartMenuOpen={setCartMenuOpen}
                      item={item}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {data?.pages[0].products.length === 0 && (
        <div className="p-6 flex items-center justify-center text-xl flex-col h-full">
          {formatMessage({ id: 'no-products' })}
        </div>
      )}
    </div>
  );
}
