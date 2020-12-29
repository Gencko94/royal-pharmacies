import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';
import { Link } from 'react-router-dom';
export default function VariantRelatedItem({ item }) {
  const { locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);

  const [selectedVariation, setSelectedVariant] = React.useState(() => {
    return Object.keys(item.new_variation_addons)[0];
  });
  const [selectedOption] = React.useState(() => {
    let keys = {};
    Object.keys(item.new_variation_addons).forEach(variation => {
      keys[variation] = 0;
    });
    return keys;
  });

  const variantOnly = item.new_variation_addons[selectedVariation].options
    ? false
    : true;
  const option = variantOnly
    ? item.new_variation_addons[selectedVariation]
    : item.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ];
  const isSale = item.new_variation_addons[selectedVariation].options
    ? item.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ].promotion_price
      ? true
      : false
    : item.new_variation_addons[selectedVariation].promotion_price
    ? true
    : false;

  const resolveAddons = () => {
    if (!variantOnly) {
      return Object.keys(item.new_variation_addons).map((variation, i) => {
        return item.new_variation_addons[variation].options[
          selectedOption[variation]
        ].image ? (
          <img
            key={i}
            onClick={() => setSelectedVariant(variation)}
            className={`cursor-pointer ${
              selectedVariation === variation && 'border'
            }`}
            alt={item.new_variation_addons[variation].id}
            src={`${process.env.REACT_APP_IMAGES_URL}/small/${
              item.new_variation_addons[variation].options[
                selectedOption[variation]
              ]?.image
            }`}
          />
        ) : (
          <button
            onClick={() => setSelectedVariant(variation)}
            className={`p-1 ${
              selectedVariation === variation
                ? 'bg-main-color text-main-text'
                : ''
            } rounded flex items-center justify-center`}
          >
            {item.new_variation_addons[variation].addon_item_value.substr(0, 1)}
          </button>
        );
      });
    } else {
      return Object.keys(item.new_variation_addons).map((variation, i) => {
        return item.new_variation_addons[variation].image ? (
          <img
            onClick={() => {
              setSelectedVariant(variation);
            }}
            key={i}
            className={`cursor-pointer ${
              selectedVariation === variation && 'border'
            }`}
            alt={option.id}
            src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.new_variation_addons[variation].image}`}
          />
        ) : (
          <button
            key={i}
            onClick={() => setSelectedVariant(variation)}
            className={`p-1 ${
              selectedVariation === variation
                ? 'bg-main-color text-main-text'
                : ''
            } rounded flex items-center justify-center`}
          >
            {item.new_variation_addons[variation].addon_item_value.substr(0, 1)}
          </button>
        );
      });
    }
  };
  const resolveImage = () => {
    if (item.new_variation_addons[selectedVariation].options) {
      return (
        <LazyImage
          src={
            item.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || item.image?.link
          }
          origin="small"
          alt={item.translation[locale].title}
          pb="calc(100% * 250/210)"
        />
      );
    } else {
      return (
        <LazyImage
          src={
            item.new_variation_addons[selectedVariation].image ||
            item.image?.link
          }
          origin="small"
          alt={item.translation[locale].title}
          pb="calc(100% * 250/210)"
        />
      );
    }
  };

  const resolveName = () => {
    const variationName =
      item.new_variation_addons[selectedVariation].addon_item_value;
    return `${item.translation[locale].title} ${variationName}`;
  };
  return (
    <div>
      <div className="relative">
        <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
          {resolveImage()}
        </Link>
      </div>
      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '55px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            to={`/${locale}/products/${item.slug}/${item.id}`}
          >
            <h1 className="font-semibold text-xs text-clamp-2">
              {resolveName()}
            </h1>
          </Link>
        </div>

        <div className="p-2 flex items-center justify-between">
          {isSale ? (
            <div className=" flex items-center">
              <h1 className="font-semibold text-lg text-main-color">
                {option.promotion_price}
                <span className="mx-1 text-sm">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" text-sm mx-1 italic  line-through text-gray-700">
                {option.price}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="font-semibold text-lg text-main-color">
              {option.price}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
        <div
          className="p-1"
          style={{
            display: 'grid',
            gap: '0.2rem',
            gridTemplateColumns: 'repeat(auto-fill,32px)',
          }}
        >
          {resolveAddons()}
        </div>
      </div>
    </div>
  );
}
