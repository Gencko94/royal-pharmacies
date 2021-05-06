import { motion } from 'framer-motion';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
export default function LeftSidePrice({
  productsLoading,
  categoryInfoLoading,
  // productsLength,
  setSelectedPrice,
  selectedPrice,
}) {
  const { locale, formatMessage } = useIntl();
  const {
    deliveryCountry,
    deliveryCountriesLoading,
    deliveryCountriesIdle,
  } = React.useContext(DataProvider);
  const prices = React.useMemo(() => [1, 5, 10, 20, 50, 100], []);

  // if (
  //   productsLoading ||
  //   categoryInfoLoading ||
  //   deliveryCountriesLoading ||
  //   deliveryCountriesIdle
  // ) {
  //   return (
  //     <div className="py-2">
  //       <ContentLoader
  //         speed={2}
  //         viewBox="0 0 300 150"
  //         backgroundColor="#f3f3f3"
  //         foregroundColor="#ecebeb"
  //       >
  //         <rect x="0" y="0" rx="5" ry="5" width="100%" height="35" />
  //         <rect x="0" y="40" rx="5" ry="5" width="100%" height="15" />
  //         <rect x="0" y="65" rx="5" ry="5" width="100%" height="15" />
  //         <rect x="0" y="90" rx="5" ry="5" width="100%" height="15" />
  //         <rect x="0" y="115" rx="5" ry="5" width="100%" height="15" />
  //       </ContentLoader>
  //     </div>
  //   );
  // }
  // if (!productsLoading && productsLength === 0) {
  //   return null;
  // }
  return (
    <motion.div layout className="mb-4">
      <h1 className="text-lg font-bold py-2">
        {formatMessage({ id: 'filter-by-price' })}
      </h1>
      <hr />
      {prices.map(price => {
        const selected = selectedPrice === price;
        return (
          <div key={price} className="flex items-center my-1 text-lg">
            <input
              id={price}
              type="radio"
              className="border-gray-600 text-main-color"
              onChange={() => {
                setSelectedPrice(price);
              }}
              checked={selected ? true : false}
            />
            <label htmlFor={price} className=" mx-5">
              {`${formatMessage({ id: 'less-than' })} ${price} ${
                deliveryCountry?.currency.translation[locale].symbol
              }`}
            </label>
          </div>
        );
      })}
    </motion.div>
  );
}
