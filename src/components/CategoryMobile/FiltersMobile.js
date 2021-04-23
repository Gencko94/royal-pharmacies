import React from 'react';
import { motion } from 'framer-motion';
import PriceFilterMobile from './PriceFilterMobile';
import BrandsFilterMobile from './BrandsFilterMobile';
import { useIntl } from 'react-intl';
export default function FiltersMobile({
  handleClose,
  brandFilters,
  priceFilters,
  products,
  brands,
  handleSubmitFilters,
}) {
  const { formatMessage } = useIntl();
  const [selectedBrands, setSelectedBrands] = React.useState(() => {
    if (brandFilters.length > 0) return brandFilters;
    return [];
  });
  const [selectedPrice, setSelectedPrice] = React.useState(() => {
    if (priceFilters) return priceFilters;
    return null;
  });
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      style={{ maxHeight: '100vh', overflow: 'auto' }}
    >
      {brands && (
        <BrandsFilterMobile
          brands={brands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />
      )}
      {/* Price */}

      <PriceFilterMobile
        products={products}
        handleClose={handleClose}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />
      <div className="p-3">
        <button
          className="p-2 uppercase bg-green-700 text-main-text rounded w-full"
          onClick={() => {
            handleSubmitFilters(selectedPrice, selectedBrands);
            handleClose();
          }}
        >
          {formatMessage({ id: 'submit' })}
        </button>
      </div>
    </motion.div>
  );
}
