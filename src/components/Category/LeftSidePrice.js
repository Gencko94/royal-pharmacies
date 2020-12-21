import React from 'react';
import { useIntl } from 'react-intl';
import { Range } from 'react-range';
import { DataProvider } from '../../contexts/DataContext';
export default function LeftSidePrice({
  handlePriceChange,
  priceFilters,
  handleChangePriceInput,
  handleSubmitPrice,
}) {
  const { locale, formatMessage } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const min = 0;
  const max = 10000;
  return (
    <div className="mb-4">
      <h1 className="text-xl font-semibold">
        {formatMessage({ id: 'price' })}{' '}
        {deliveryCountry?.currency.translation[locale].symbol}
      </h1>
      <hr className="my-2" />
      <div className="p-3">
        <Range
          step={0.1}
          min={min}
          rtl={locale === 'ar'}
          max={max}
          values={priceFilters}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '15px',
                width: '15px',
                borderRadius: '50%',
                backgroundColor: '#999',
              }}
            />
          )}
        />
      </div>
      <div
        className="mb-3"
        style={{ display: 'grid', gridTemplateColumns: '0.5fr 1fr 0.5fr' }}
      >
        <div className="text-center">{min}</div>
        <div className="text-center">
          <input
            type="number"
            value={priceFilters[0]}
            onChange={handleChangePriceInput}
            className="p-1 text-center border rounded-lg min-w-0"
          />
        </div>
        <div className="text-center">{max}</div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="px-2 py-1 bg-green-700 text-main-text rounded"
          onClick={handleSubmitPrice}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
