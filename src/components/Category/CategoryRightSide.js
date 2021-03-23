import { AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import CategoryItemLoader from './CategoryItemLoader';
import CategoryProductItem from './CategoryProductItem';
import SortInfoPanel from './SortInfoPanel';
import VariantCategoryProductItem from './VariantCategoryProductItem';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import { DataProvider } from '../../contexts/DataContext';
export default function CategoryRightSide({
  products,
  productsLoading,
  resultsPerPage,
  sortBy,
  handleRemoveFilters,
  handleSortByChange,
  filters,
  setCartMenuOpen,
  handleResultPerPageChange,
  productsPageCount,
  handleProductChangePage,
  productsPage,
  category,
}) {
  const { formatMessage, locale } = useIntl();
  const { deliveryCountriesLoading, deliveryCountriesIdle } = React.useContext(
    DataProvider
  );
  if (
    !['best-seller', 'latest-products'].includes(category) &&
    (productsLoading || deliveryCountriesLoading || deliveryCountriesIdle)
  ) {
    return (
      <div className="py-2">
        <ContentLoader
          speed={2}
          viewBox="0 0 752 38"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="38" />
        </ContentLoader>
        <div
          className="category-page-items__grid py-2"
          style={{ minHeight: 'calc(100vh - 150px)' }}
        >
          {[
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
          ].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      </div>
    );
  }
  if (['best-seller', 'latest-products'].includes(category)) {
    return (
      <div className="py-2">
        <ContentLoader
          speed={2}
          viewBox="0 0 752 38"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="38" />
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
    <div className="h-full relative">
      {products?.length > 0 && (
        <SortInfoPanel
          category={category}
          sortBy={sortBy}
          resultsPerPage={resultsPerPage}
          handleSortByChange={handleSortByChange}
          handleResultPerPageChange={handleResultPerPageChange}
        />
      )}
      <AnimateSharedLayout>
        <motion.div layout className="flex items-center">
          {filters.length !== 0 && (
            <>
              <motion.h1 layout className="text-lg font-semibold">
                {formatMessage({ id: 'filtered-by' })}
              </motion.h1>
              <motion.div layout className="mx-1 flex items-center">
                {filters.map(item => {
                  return (
                    <motion.button
                      layout
                      className="mx-1 py-1 px-2 bg-main-color text-main-text rounded-full whitespace-no-wrap"
                      key={item.value}
                      onClick={() => handleRemoveFilters(item)}
                    >
                      {formatMessage({ id: item.type })} : {item.value}
                    </motion.button>
                  );
                })}
              </motion.div>
            </>
          )}
        </motion.div>
      </AnimateSharedLayout>

      {products?.length > 0 && !productsLoading && (
        <div
          className="category-page-items__grid py-2 min-h-full relative"
          style={{ minHeight: 'calc(100vh - 150px)' }}
        >
          {products?.map(item => {
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
        </div>
      )}
      {products?.length > 0 && !productsLoading && (
        <ReactPaginate
          previousLabel={
            locale === 'ar' ? (
              <GoChevronRight className="w-6 h-6 inline" />
            ) : (
              <GoChevronLeft className="w-6 h-6 inline" />
            )
          }
          nextLabel={
            locale === 'ar' ? (
              <GoChevronLeft className="w-6 h-6 inline" />
            ) : (
              <GoChevronRight className="w-6 h-6 inline" />
            )
          }
          breakLabel={'...'}
          breakClassName={'inline'}
          pageCount={productsPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          initialPage={productsPage - 1}
          disableInitialCallback={true}
          onPageChange={handleProductChangePage}
          containerClassName={'my-2 w-full text-center'}
          subContainerClassName={'p-3 inline'}
          pageLinkClassName="p-3"
          activeClassName={'bg-main-color font-bold text-main-text'}
          pageClassName=" inline-block mx-2 rounded-full text-lg"
          previousClassName="p-3 inline font-bold"
          nextClassName="p-3 inline font-bold"
          disabledClassName="text-gray-500"
        />
      )}
    </div>
  );
}
