import React from 'react';
import { useIntl } from 'react-intl';

export default function VariantsOnly({
  variants,
  setSelectedVariant,
  selectedVariation,
}) {
  const { locale } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2">
        {variants[selectedVariation][`name_${locale}`]}
      </h1>
      <div className="single-product-sizes__container">
        {Object.keys(variants).map(variation => {
          if (variants[variation].image) {
            return (
              <button
                className={`${
                  selectedVariation === variation && 'border shadow'
                }`}
                onClick={() => setSelectedVariant(variation)}
                key={variants[variation].addon_item_id}
              >
                <img
                  alt={variants[variation].id}
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${variants[variation].image}`}
                />
                <h1 className="mt-1 text-sm font-semibold">
                  {variants[variation].addon_item_value}
                </h1>
              </button>
            );
          } else {
            return (
              <button
                className={`${
                  selectedVariation === variation &&
                  'bg-main-color text-main-text'
                } p-2 uppercase border flex items-center justify-center`}
                onClick={() => setSelectedVariant(variation)}
                key={variants[variation].addon_item_id}
              >
                {variants[variation].addon_item_value}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}
