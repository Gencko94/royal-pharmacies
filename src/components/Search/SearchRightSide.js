import React from 'react';
import ContentLoader from 'react-content-loader';
import CategoryItemLoader from '../Category/CategoryItemLoader';
import CategoryProductItem from '../Category/CategoryProductItem';
import SortInfoPanel from '../Category/SortInfoPanel';
import VariantCategoryProductItem from '../Category/VariantCategoryProductItem';

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
}) {
  if (productsLoading) {
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
    <div className="py-2">
      <SortInfoPanel
        sortBy={sortBy}
        filters={filters}
        handleRemoveFilters={handleRemoveFilters}
        handleSortByChange={handleSortByChange}
      />
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
        <div className="p-4 text-2xl h-full flex items-center justify-center">
          <h1>We Couldn't Find any items that belongs to this category</h1>
        </div>
      )}
    </div>
  );
}
