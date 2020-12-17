import React from 'react';
import ContentLoader from 'react-content-loader';
import CategoryItemLoader from '../Category/CategoryItemLoader';
import SearchProductItem from './SearchProductItem';
import SearchSortPanel from './SearchSortPanel';
import VariantSearchProductItem from './VariantSearchProductItem';

export default function SearchRightSide({
  products,
  productsLoading,
  handleSortBy,
  query,
}) {
  console.log(products);
  if (productsLoading) {
    return (
      <div>
        <ContentLoader
          speed={2}
          viewBox="0 0 752 25"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="25" />
        </ContentLoader>
        <div className="search-page-items__grid py-2  min-h-screen">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SearchSortPanel
        handleSortBy={handleSortBy}
        products={products}
        query={query}
      />
      {products.length !== 0 && (
        <div className="search-page-items__grid py-2 ">
          {products.map(item => {
            return item.type === 'simple' ? (
              <SearchProductItem key={item.id} item={item} query={query} />
            ) : (
              <VariantSearchProductItem key={item.id} item={item} />
            );
          })}
        </div>
      )}
    </div>
  );
}
