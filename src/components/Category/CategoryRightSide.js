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
import placeholder from '../../assets/illustrationplaceholder.png';
export default function CategoryRightSide({
  products,
  productsLoading,
  resultsPerPage,
  sortBy,
  filteredProducts,
  filteredProductsLoading,
  filtersApplied,
  handleRemoveFilters,
  handleSortByChange,
  filters,
  setCartMenuOpen,
  handleResultPerPageChange,
  productsPageCount,
  filteredPageCount,
  handleFilteredChangePage,
  handleProductChangePage,
  filteredPage,
  productsPage,
  category,
}) {
  console.log(filteredProducts, 'filteredPRoducts');
  console.log(filtersApplied, 'filtersAPplied');
  const { formatMessage } = useIntl();
  if (
    !['best-seller', 'latest-products'].includes(category) &&
    productsLoading
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      </div>
    );
  }
  if (
    ['best-seller', 'latest-products'].includes(category) &&
    filteredProductsLoading
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div id="top" className="h-full">
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
      {filtersApplied && filteredProductsLoading && (
        <div
          className="category-page-items__grid py-2 min-h-full"
          style={{ minHeight: 'calc(100vh - 150px)' }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      )}
      {(!filtersApplied && products?.length > 0 && !productsLoading) ||
      (filtersApplied &&
        filteredProducts?.length > 0 &&
        !filteredProductsLoading) ? (
        <div
          className="category-page-items__grid py-2 min-h-full"
          style={{ minHeight: 'calc(100vh - 150px)' }}
        >
          {!filtersApplied &&
            products?.map(item => {
              return item.type === 'variation' &&
                item.new_variation_addons.length > 0 ? (
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
          {filtersApplied &&
            filteredProductsLoading &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
              return <CategoryItemLoader key={i} />;
            })}
          {filtersApplied &&
            !filteredProductsLoading &&
            filteredProducts?.length > 0 &&
            filteredProducts.map(item => {
              return item.type === 'variation' &&
                item.new_variation_addons.length > 0 ? (
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
      ) : null}
      {(!filtersApplied && products?.length > 0 && !productsLoading) ||
      (filtersApplied &&
        filteredProducts?.length > 0 &&
        !filteredProductsLoading) ? (
        <ReactPaginate
          previousLabel={<GoChevronLeft className="w-6 h-6 inline" />}
          nextLabel={<GoChevronRight className="w-6 h-6 inline" />}
          breakLabel={'...'}
          breakClassName={'inline'}
          pageCount={filtersApplied ? filteredPageCount : productsPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          initialPage={filtersApplied ? filteredPage - 1 : productsPage - 1}
          disableInitialCallback={true}
          onPageChange={
            filtersApplied ? handleFilteredChangePage : handleProductChangePage
          }
          containerClassName={'my-2 w-full text-center'}
          subContainerClassName={'p-3 inline'}
          pageLinkClassName="p-3"
          activeClassName={'bg-main-color font-bold text-main-text'}
          pageClassName=" inline-block mx-2 rounded-full text-lg"
          previousClassName="p-3 inline font-bold"
          nextClassName="p-3 inline font-bold"
          disabledClassName="text-gray-500"
        />
      ) : null}
      {products?.length === 0 && (
        <div className="p-6 flex flex-col items-center justify-center text-xl h-full">
          <img src={placeholder} alt="No products" className="mb-4" />
          {formatMessage({ id: 'no-products' })}
        </div>
      )}
      {filtersApplied &&
        !filteredProductsLoading &&
        filteredProducts?.length === 0 && (
          <div className="p-6 flex items-center flex-col justify-center text-xl h-full">
            <img src={placeholder} alt="No products" className="mb-4" />
            {formatMessage({ id: 'no-filter-results' })}
          </div>
        )}
    </div>
  );
}
