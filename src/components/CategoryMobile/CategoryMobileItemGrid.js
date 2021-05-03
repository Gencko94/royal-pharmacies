import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CategoryProductItem from '../Category/CategoryProductItem';
import CategoryItemLoader from '../Category/CategoryItemLoader';
import ContentLoader from 'react-content-loader';
import VariantCategoryProductItem from '../Category/VariantCategoryProductItem';
import { DataProvider } from '../../contexts/DataContext';
export default function CategoryMobileItemGrid({
  productsLoading,
  products,
  setCartMenuOpen,
}) {
  const { deliveryCountriesLoading, deliveryCountriesIdle } = React.useContext(
    DataProvider
  );
  if (productsLoading || deliveryCountriesLoading || deliveryCountriesIdle) {
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
    <div id="products_grid-mobile" className="mb-4 px-2">
      {products?.length !== 0 && (
        <div className="search-page-items-mobile__grid my-1">
          {products.map(item => {
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
    </div>
  );
}
