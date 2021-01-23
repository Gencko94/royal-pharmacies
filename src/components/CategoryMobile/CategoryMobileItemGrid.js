import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CategoryProductItem from '../Category/CategoryProductItem';
import CategoryItemLoader from '../Category/CategoryItemLoader';
import ContentLoader from 'react-content-loader';
import VariantCategoryProductItem from '../Category/VariantCategoryProductItem';
import { useIntl } from 'react-intl';
export default function CategoryMobileItemGrid({
  productsLoading,
  products,
  setCartMenuOpen,
  filteredProducts,
  filteredProductsLoading,
  filtersApplied,
}) {
  const { formatMessage } = useIntl();
  if (productsLoading || filteredProductsLoading) {
    return (
      <div className="p-2 min-h-screen">
        <ContentLoader
          speed={2}
          viewBox="0 0 500 45"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="45" />
        </ContentLoader>
        <div className="search-page-items-mobile__grid mt-2 min-h-screen">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div id="products_grid-mobile" className="mb-4">
      {products.length !== 0 && (
        <div className="search-page-items-mobile__grid my-1">
          {!filtersApplied &&
            products.map(item => {
              return item.type === 'variation' &&
                Object.entries(item.new_variation_addons).length > 0 ? (
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
            !filteredProductsLoading &&
            filteredProducts &&
            filteredProducts.map(item => {
              return item.type === 'variation' &&
                Object.entries(item.new_variation_addons).length > 0 ? (
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
      {products.length === 0 && (
        <div className="p-6 flex items-center justify-center text-xl">
          {formatMessage({ id: 'no-products' })}
        </div>
      )}
      {filtersApplied &&
        !filteredProductsLoading &&
        filteredProducts.length === 0 && (
          <div className="p-6 flex items-center justify-center text-xl">
            {formatMessage({ id: 'no-filter-results' })}
          </div>
        )}
    </div>
  );
}
