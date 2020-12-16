import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CategoryProductItem from '../Category/CategoryProductItem';
import CategoryItemLoader from '../Category/CategoryItemLoader';
import ContentLoader from 'react-content-loader';
import VariantCategoryProductItem from '../Category/VariantCategoryProductItem';
export default function CategoryMobileItemGrid({
  productsLoading,
  products,
  categoryInfoLoading,
  categoryInfo,
}) {
  if (productsLoading || categoryInfoLoading) {
    return (
      <div className="py-2 min-h-screen">
        <ContentLoader
          speed={2}
          viewBox="0 0 752 38"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="38" />
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
      {/* <div
        className="py-16 px-2 flex justify-center items-center"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/original/${categoryInfo.image.link})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <h1 className="text-2xl text-main-text font-bold">
          {categoryInfo.translation[locale].name}
        </h1>
      </div> */}

      <hr />
      {products.length !== 0 && (
        <div className="search-page-items-mobile__grid px-1 my-1">
          {products.map(item => {
            return item.type === 'simple' ? (
              <CategoryProductItem key={item.id} item={item} />
            ) : (
              <VariantCategoryProductItem key={item.id} item={item} />
            );
          })}
        </div>
      )}
    </div>
  );
}
