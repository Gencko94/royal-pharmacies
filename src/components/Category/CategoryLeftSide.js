import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import LeftSideBrands from './LeftSideBrands';
import LeftSidePrice from './LeftSidePrice';

export default function CategoryLeftSide({
  productsLoading,
  handlePriceChange,
  products,
  categoryInfo,
  categoryInfoLoading,
  brandFilters,
  handleChangePriceInput,
  handleBrandChange,
  priceFilters,
  handleSubmitPrice,
}) {
  const { locale, formatMessage } = useIntl();

  return (
    <div className="py-2">
      {!categoryInfoLoading && (
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
      {!productsLoading && (
        <LeftSideBrands
          products={products}
          brandFilters={brandFilters}
          handleBrandChange={handleBrandChange}
        />
      )}
      {/* Price */}
      {!productsLoading && (
        <LeftSidePrice
          products={products}
          priceFilters={priceFilters}
          handlePriceChange={handlePriceChange}
          handleChangePriceInput={handleChangePriceInput}
          handleSubmitPrice={handleSubmitPrice}
        />
      )}
    </div>
  );
}
