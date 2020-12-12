import React from 'react';
import { useIntl } from 'react-intl';

export default function SizesOnly({
  sizes,
  selectedVariation,
  setSelectedVariant,
}) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2">
        {formatMessage({ id: 'single-product-size' })}:
      </h1>
      <div className="single-product-sizes__container">
        {Object.keys(sizes).map(variation => {
          const selected = selectedVariation === variation;
          return (
            <button
              onClick={() => setSelectedVariant(variation)}
              key={sizes[variation].addon_item_id}
              // disabled={!available}
              className={`
                
                 hover:bg-main-color hover:text-main-text transition duration-150
              
              } p-2 uppercase border text-sm text-center ${
                selected
                  ? 'bg-main-color text-main-text'
                  : 'text-body-text-light'
              } `}
            >
              {sizes[variation].addon_item_value}
            </button>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
