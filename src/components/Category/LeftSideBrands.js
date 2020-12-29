import React from 'react';
import { useIntl } from 'react-intl';

export default function LeftSideBrands({
  products,
  handleBrandChange,
  brandFilters,
}) {
  const { formatMessage, locale } = useIntl();
  const brands = React.useMemo(() => {
    let brands = [];
    products.forEach(product => {
      if (product.brand) {
        brands.push({
          label: product.brand.translation[locale].name,
          id: product.brand.id,
        });
      }
    });
    brands = [...new Set(brands.map(o => JSON.stringify(o)))].map(s =>
      JSON.parse(s)
    );
    return brands;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h1 className="text-xl py-3 font-semibold">
        {formatMessage({ id: 'filter-by-brand' })}
      </h1>
      <hr />
      <div className="flex flex-col justify-center">
        {brands.map(brand => {
          const isAvailable = brandFilters.find(i => i.id === brand.id);

          return (
            <div key={brand.id} className="flex items-center mb-2 my-1">
              <input
                id={brand.id}
                type="checkbox"
                className="form-checkbox border-gray-600 text-main-color"
                onChange={() => handleBrandChange(brand)}
                checked={isAvailable ? true : false}
              />
              <label
                htmlFor={brand.id}
                className="hover:underline hover:text-blue-700 cursor-pointer  mx-5"
              >
                {brand.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
