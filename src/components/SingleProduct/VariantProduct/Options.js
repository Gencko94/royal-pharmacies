import React from 'react';
import { useIntl } from 'react-intl';

export default function Options({
  options,
  selectedOption,
  setSelectedOption,
  selectedVariation,
}) {
  const { locale } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2">
        {options[selectedOption[selectedVariation]][`name_${locale}`]}
      </h1>
      <div className="single-product-sizes__container my-1">
        {options.map((option, i) => {
          const selected = selectedOption[selectedVariation] === i;
          return (
            <button
              onClick={() =>
                setSelectedOption(prev => {
                  return {
                    ...prev,
                    [selectedVariation]: i,
                  };
                })
              }
              key={option.addon_item_id}
              className={`
                
                 hover:bg-main-color hover:text-main-text transition duration-150
              
              } p-2 uppercase border text-sm text-center ${
                selected
                  ? 'bg-main-color text-main-text'
                  : 'text-body-text-light'
              } `}
            >
              {option.addon_item_value}
            </button>
          );
        })}
      </div>
      <hr className="my-2" />
    </div>
  );
}
