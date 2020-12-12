import React from 'react';
import { useIntl } from 'react-intl';

export default function SizesAndColors({
  sizes,
  selectedOption,
  setSelectedOption,
  variation,
}) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2">
        {formatMessage({ id: 'single-product-size' })}:
      </h1>
      <div className="single-product-sizes__container my-1">
        {sizes.map((size, i) => {
          const selected = selectedOption[variation] === i;
          return (
            <button
              onClick={() =>
                setSelectedOption(prev => {
                  return {
                    ...prev,
                    [variation]: i,
                  };
                })
              }
              key={size.addon_item_id}
              className={`
                
                 hover:bg-main-color hover:text-main-text transition duration-150
              
              } p-2 uppercase border text-sm text-center ${
                selected
                  ? 'bg-main-color text-main-text'
                  : 'text-body-text-light'
              } `}
            >
              {size.addon_item_value}
            </button>
          );
        })}
      </div>
      <hr className="my-2" />
    </div>
  );
}
