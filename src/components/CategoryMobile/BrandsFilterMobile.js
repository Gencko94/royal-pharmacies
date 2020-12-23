import { motion } from 'framer-motion';
import React from 'react';
import { CgRadioCheck, CgRadioChecked } from 'react-icons/cg';
import { useIntl } from 'react-intl';

export default function BrandsFilterMobile({
  products,
  handleBrandChange,
  brandFilters,
  handleClose,
}) {
  const { formatMessage, locale } = useIntl();
  const brands = React.useMemo(() => {
    let brands = [];
    products.forEach(product => {
      if (product.brand) {
        brands.push(product.brand.translation[locale].name);
      }
    });
    brands = [...new Set([...brands])];
    return brands;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (brands.length === 0) {
    return null;
  }
  return (
    <motion.div layout className="mb-4">
      <div className="px-3 py-2 border-b">
        <h1 className="font-semibold">
          {formatMessage({ id: 'filter-by-brand' })}
        </h1>
      </div>
      <div className="px-3 flex flex-col justify-center">
        {brands.map(brand => {
          return (
            <button
              key={brand}
              onClick={() => {
                handleBrandChange(brand);
                handleClose();
              }}
              className={`px-3 py-2 font-semibold flex items-center justify-between ${
                brandFilters === brand && 'bg-main-color text-main-text'
              }  w-full`}
            >
              <span>{brand}</span>
              {brandFilters === brand ? <CgRadioChecked /> : <CgRadioCheck />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
