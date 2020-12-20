import React from 'react';
import { useIntl } from 'react-intl';
// import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import LeftSideBrands from './LeftSideBrands';
// import { getCategories } from '../../Queries/Queries';

export default function CategoryLeftSide({
  productsLoading,

  setLowestPrice,

  setHighestPrice,
  handlePriceChange,
  products,

  categoryInfo,
  categoryInfoLoading,
  brandFilters,
  setBrandFilters,
  handleBrandChange,
  categoryIdLoading,
}) {
  console.log(products);
  const { locale, formatMessage } = useIntl();
  // if (categoryInfoLoading || categoryIdLoading || productsLoading) {
  //   return 'loading';
  // }
  return (
    <div className="py-2">
      {!categoryInfoLoading && !categoryIdLoading && (
        <div className="mb-4">
          <h1 className="text-xl font-semibold">
            {formatMessage({ id: 'categories' })}
          </h1>
          <hr className="my-2" />

          <div className="my-2">
            <div className="flex justify-between">
              <h1 className="font-semibold text-sm">
                {categoryInfo.translation[locale].name}
              </h1>
            </div>
            {categoryInfo.children.length !== 0 &&
              categoryInfo.children.map((subCategory, i) => (
                <Link
                  to={`/${locale}/categories/${subCategory.slug}`}
                  key={i}
                  className="text-sm block hover:underline hover:text-blue-700"
                >
                  {subCategory.translation[locale].name}
                </Link>
              ))}
          </div>
        </div>
      )}
      {/* Brands */}
      {products && !categoryIdLoading && (
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Brand</h1>
          <hr className="my-2" />
          <LeftSideBrands
            products={products}
            brandFilters={brandFilters}
            handleBrandChange={handleBrandChange}
          />
        </div>
      )}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Price (KW)</h1>
        <hr className="my-2" />
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Min"
            className=" flex-1 border min-w-0 p-1 rounded-sm"
            value=""
            onChange={e => setLowestPrice(e.target.value)}
          />
          <span className="text-gray-600 text-xs mx-1">To</span>
          <input
            type="number"
            placeholder="Max"
            className="flex-1 border min-w-0 p-1 rounded-sm mr-1"
            value=""
            onChange={e => setHighestPrice(e.target.value)}
          />
          <button
            onClick={handlePriceChange}
            className="p-1 bg-green-400 rounded"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
