import React from 'react';
import { useIntl } from 'react-intl';

export default function Variants({
  variants,
  setSelectedVariant,
  selectedOption,
  selectedVariation,
}) {
  const { locale } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2">
        {variants[selectedVariation][`name_${locale}`]}
      </h1>
      <div className="single-product-colors__container">
        {Object.keys(variants).map(variation => {
          return (
            <button
              onClick={() => setSelectedVariant(variation)}
              key={variants[variation].addon_item_id}
            >
              <img
                alt={variants[variation].id}
                className={`${selectedVariation === variation && 'border'}`}
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${
                  variants[variation].options[selectedOption[variation]]?.image
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
