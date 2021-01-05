import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';

export default function BrandsFilterMobile({
  handleBrandChange,
  brandFilters,
  handleClose,
  brands,
}) {
  const { formatMessage, locale } = useIntl();

  if (brands.length === 0) {
    return null;
  }
  return (
    <motion.div layout className="mb-4">
      <div className="px-3 py-2 border-b">
        <h1 className="font-semibold text-center">
          {formatMessage({ id: 'filter-by-brand' })}
        </h1>
      </div>
      <div className="px-3 flex flex-col justify-center">
        {brands.map(brand => {
          const isAvailable = brandFilters.find(i => i.id === brand.id);
          return (
            <div key={brand.id} className="flex items-center text-sm mb-1 my-1">
              <input
                id={brand.id}
                type="checkbox"
                className="form-checkbox border-gray-600 text-main-color"
                onChange={() => {
                  handleBrandChange({
                    id: brand.id,
                    label: brand.translation[locale].name,
                  });
                  handleClose();
                }}
                checked={isAvailable ? true : false}
              />
              <label htmlFor={brand.id} className=" mx-5">
                {brand.translation[locale].name}
              </label>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
