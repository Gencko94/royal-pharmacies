import React from 'react';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
export default function PriceFilterMobile({ selectedPrice, setSelectedPrice }) {
  const prices = React.useMemo(() => [1, 5, 10, 20, 50, 100], []);
  const { locale, formatMessage } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);

  return (
    <div className="my-2 px-3">
      <h1 className="font-bold text-center">
        {formatMessage({ id: 'filter-by-price' })} (
        {deliveryCountry?.currency.translation[locale].symbol})
      </h1>
      <hr className="my-2" />

      {prices.map(price => {
        const selected = selectedPrice === price;
        return (
          <div key={price} className="flex items-center text-sm mb-1 my-1">
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
    </div>
  );
}
