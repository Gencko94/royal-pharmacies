import React from 'react';
import { useIntl } from 'react-intl';

import { scrollIntoView } from 'scroll-js';
import Variants from './Variants';
import Options from './Options';
import VariantsOnly from './VariantsOnly';
import { Link } from 'react-router-dom';
import offerbanner from '../../../assets/offerbanner.png';
import { DataProvider } from '../../../contexts/DataContext';
import { calculateDiscountPrice } from '../../../helpers/calculateDiscountPrice';
import RelatedItems from '../RelatedItems';
export default function VariantMiddleSection({
  data,
  selectedVariation,
  setSelectedVariant,
  ratingCount,
  averageRating,
  reviewsLoading,
  setDetailsTab,
  selectedOption,
  setSelectedOption,
}) {
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);

  const variantOnly = data.new_variation_addons[selectedVariation].options
    ? false
    : true;
  const option = variantOnly
    ? data.new_variation_addons[selectedVariation]
    : data.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ];
  const isSale = data.new_variation_addons[selectedVariation].options
    ? data.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ].promotion_price
      ? true
      : false
    : data.new_variation_addons[selectedVariation].promotion_price
    ? true
    : false;
  const resolvePlural = () => {
    switch (ratingCount) {
      case 1:
        return formatMessage({ id: 'one-rating' });

      case 2:
        return formatMessage({ id: 'two-ratings' });

      case ratingCount > 10:
        return formatMessage({ id: 'one-rating' });

      default:
        return formatMessage({ id: 'ratings' });
    }
  };
  const formatItemsPlural = n => {
    switch (n) {
      case 0:
        return (
          <span className="text-main-color">
            {formatMessage({ id: 'no-items-left' })}
          </span>
        );
      case 1:
        return (
          <span className="mx-1 text-yellow-700">
            {formatMessage({ id: 'one-item-left' })}
          </span>
        );

      case 2:
        return (
          <span className="mx-1 text-yellow-700">
            {formatMessage({ id: 'two-items-left' })}
          </span>
        );

      case n > 10:
        return (
          <span className="mx-1  text-yellow-700">
            {' '}
            {n} {formatMessage({ id: 'more-than-10-items-left' })}
          </span>
        );

      default:
        return (
          <span className="mx-1  text-yellow-700">
            {n} {formatMessage({ id: 'items-left' })}
          </span>
        );
    }
  };
  const resolveOptions = React.useCallback(() => {
    let arr = [];
    if (data.new_variation_addons[selectedVariation].options) {
      arr.push(
        <Options
          options={data.new_variation_addons[selectedVariation].options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedVariation={selectedVariation}
        />,
        <Variants
          variants={data.new_variation_addons}
          setSelectedVariant={setSelectedVariant}
          selectedOption={selectedOption}
          selectedVariation={selectedVariation}
        />
      );

      return arr;
    } else {
      arr.push(
        <VariantsOnly
          variants={data.new_variation_addons}
          setSelectedVariant={setSelectedVariant}
          selectedVariation={selectedVariation}
        />
      );
      return arr;
    }
  }, [
    data.new_variation_addons,
    selectedOption,
    selectedVariation,
    setSelectedOption,
    setSelectedVariant,
  ]);
  return (
    <div className="flex flex-col w-full self-start ">
      <Link
        to={`/${locale}/brands/${data.brand?.slug}`}
        className="hover:underline font-semibold text-sm text-gray-700 uppercase"
      >
        {data.brand?.translation[locale].name}
      </Link>
      <h1 className="font-bold text-2xl">
        {data.full_translation[locale].title}
      </h1>
      <h1 className=" font-semibold mb-1">
        {option.quantity < 20 ? (
          formatItemsPlural(option.quantity)
        ) : (
          <span className="text-green-700">
            {formatMessage({ id: 'in-stock' })}
          </span>
        )}
      </h1>

      <div className="flex items-center mb-1">
        <div className="flex items-center text-gray-600 text-sm">
          <h1 className="text-gray-600 text-sm">
            {formatMessage({ id: 'model-number' })} :
          </h1>
          <h1 className="mx-1">{option.sku}</h1>
        </div>
        {!reviewsLoading && ratingCount !== 0 && (
          <div
            onClick={() => {
              scrollIntoView(document.getElementById('details'));
              setDetailsTab(1);
            }}
            className="text-sm mx-2 flex items-center"
          >
            <div className="rounded p-1 text-xs bg-green-700 text-main-text cursor-pointer">
              {averageRating}
            </div>

            <div className="text-sm text-gray-600 flex items-center mx-1  hover:underline cursor-pointer">
              <h1 className="mx-1">
                ({ratingCount > 2 && ratingCount} {resolvePlural()})
              </h1>
            </div>
          </div>
        )}
      </div>
      <hr className="my-2" />
      <div className="py-1">
        <div className="font-bold">
          {isSale && (
            <div className=" flex items-center ">
              <h1>{formatMessage({ id: 'price-before' })} :</h1>
              <h1 className=" mx-2 text-base italic  line-through text-gray-700">
                {option.price}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          )}
          <div className="">
            <div className="flex items-center flex-1">
              <h1 className="    ">
                {isSale
                  ? formatMessage({ id: 'price-now' })
                  : formatMessage({ id: 'price' })}
              </h1>
              <h1 className=" text-xl mx-2  text-red-700">
                {isSale ? option.promotion_price : option.price}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" font-normal uppercase  text-gray-700">
                ({formatMessage({ id: 'vat-inclusive' })})
              </h1>
            </div>
            {isSale && (
              <div className="flex items-center   ">
                <h1>{formatMessage({ id: 'you-save' })} :</h1>
                <span className=" text-base mx-1 text-main-color">
                  {calculateDiscountPrice(option.price, option.promotion_price)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        {resolveOptions()}

        <hr className="my-2" />
      </div>
      <img src={offerbanner} alt="offer" />
      {data?.related_products && <RelatedItems data={data.related_products} />}
    </div>
  );
}
