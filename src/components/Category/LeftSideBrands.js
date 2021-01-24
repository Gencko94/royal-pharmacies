import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';

export default function LeftSideBrands({
  brands,
  handleBrandChange,
  brandFilters,
  categoryInfoLoading,
  productsLoading,
}) {
  const { formatMessage, locale } = useIntl();

  if (categoryInfoLoading || productsLoading) {
    return (
      <div className="py-2">
        <ContentLoader
          speed={2}
          viewBox="0 0 300 150"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
          <rect x="0" y="40" rx="5" ry="5" width="100%" height="15" />
          <rect x="0" y="65" rx="5" ry="5" width="100%" height="15" />
          <rect x="0" y="90" rx="5" ry="5" width="100%" height="15" />
          <rect x="0" y="115" rx="5" ry="5" width="100%" height="15" />
        </ContentLoader>
      </div>
    );
  }
  if (brands?.length === 0 || !brands) {
    return null;
  }

  return (
    <div className="mb-4">
      <h1 className="text-lg py-2 font-bold">
        {formatMessage({ id: 'filter-by-brand' })}
      </h1>
      <hr />
      <div className="flex flex-col justify-center">
        {brands?.map(brand => {
          const isAvailable = brandFilters.find(i => i.id === brand.id);

          return (
            <div key={brand.id} className="flex items-center my-2">
              <input
                id={brand.id}
                type="checkbox"
                className="form-checkbox border-gray-600 text-main-color"
                onChange={() =>
                  handleBrandChange({
                    id: brand.id,
                    label: brand.translation[locale].name,
                  })
                }
                checked={isAvailable ? true : false}
              />
              <label
                htmlFor={brand.id}
                className="hover:underline text-sm hover:text-blue-700 cursor-pointer font-semibold  mx-5"
              >
                {brand.translation[locale].name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
