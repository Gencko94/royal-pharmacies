import React from 'react';
import { useIntl } from 'react-intl';

export default function ColorsAndSizes({
  colors,
  setSelectedVariant,
  selectedOption,
}) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2">
        {formatMessage({ id: 'single-product-color' })}:
      </h1>
      <div className="single-product-colors__container">
        {Object.keys(colors).map(variation => {
          return (
            <button
              onClick={() => setSelectedVariant(variation)}
              key={colors[variation].addon_item_id}
            >
              <img
                alt={colors[variation].id}
                // style={{ width: '50px', height: '75px' }}
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${
                  colors[variation].options[selectedOption[variation]]?.image
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
