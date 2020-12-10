import React from 'react';
import CategoryItemLoader from './CategoryItemLoader';
import CategoryProductItem from './CategoryProductItem';
import SortInfoPanel from './SortInfoPanel';

export default function CategoryRightSide({
  products,
  productsLoading,
  categoryInfoLoading,
  handleSortBy,
}) {
  console.log(products);
  if (productsLoading || categoryInfoLoading) {
    return (
      <div className="search-page-items__grid py-2  min-h-screen">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
          return <CategoryItemLoader key={i} />;
        })}
      </div>
    );
  }
  return (
    <div className="py-2">
      <SortInfoPanel handleSortBy={handleSortBy} />
      {products.length !== 0 && (
        <div className="search-page-items__grid py-2 ">
          {products.map(item => {
            return <CategoryProductItem key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}
