import React from 'react';
import { useIntl } from 'react-intl';
import miniBanner from '../../assets/banners/miniBanner.gif';
import Colors from './VariantProduct/Colors/ColorsAndSizes';
import { scrollIntoView } from 'scroll-js';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { DataProvider } from '../../contexts/DataContext';
export default function MiddleSection({
  data,
  selectedVariation,
  color,
  setColor,
  setSelectedVariant,
  ratingCount,
  averageRating,
  reviewsLoading,
  setDetailsTab,
}) {
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
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
  return (
    <div className="flex flex-col w-full self-start ">
      <h1 className="font-semibold text-xl">
        {data.translation[locale].title}
      </h1>
      <div className="flex items-center ">
        <Rating
          initialRating={averageRating}
          readonly
          emptySymbol={<AiOutlineStar className="text-main-color" />}
          fullSymbol={<AiFillStar className="text-main-color" />}
          className=" pt-1"
        />
      </div>
      <h1 className=" font-semibold mb-1 text-green-700">
        {formatMessage({ id: 'in-stock' })}
      </h1>
      <div className="flex items-center mb-1">
        <div className="flex items-center text-gray-600 text-sm">
          <h1 className="text-gray-600 text-sm">
            {formatMessage({ id: 'model-number' })} :
          </h1>
          <h1 className="mx-1">
            {data.type === 'simple'
              ? data.simple_addons.sku
              : data.variation_addons[selectedVariation].sku}
          </h1>
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
              {ratingCount}
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
      <div className="flex items-start py-1">
        <div className=" flex-1 text-sm  font-bold">
          {data.type === 'simple'
            ? data.simple_addons.promotion_price && (
                <div className=" flex items-center ">
                  <h1>{formatMessage({ id: 'price-before' })} :</h1>
                  <h1 className=" mx-2 text-base italic  line-through text-gray-700">
                    {data.simple_addons.promotion_price} KD
                  </h1>{' '}
                </div>
              )
            : data.variation_addons[selectedVariation].promotion_price && (
                <div className=" flex items-center ">
                  <h1>{formatMessage({ id: 'price-before' })} :</h1>
                  <h1 className=" mx-2 text-base italic  line-through text-gray-700">
                    {data.variation_addons[selectedVariation].promotion_price}
                    <span className="mx-1">
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </span>
                  </h1>{' '}
                </div>
              )}
          <div className="">
            <div className="flex items-center flex-1">
              <h1 className="    ">
                {data.type === 'simple'
                  ? data.simple_addons.promotion_price
                    ? formatMessage({ id: 'price-now' })
                    : formatMessage({ id: 'price' })
                  : data.variation_addons[selectedVariation].promotion_price
                  ? formatMessage({ id: 'price-now' })
                  : formatMessage({ id: 'price' })}
              </h1>
              <h1 className=" text-xl mx-2  text-red-700">
                {data.type === 'simple'
                  ? data.simple_addons.price
                  : data.variation_addons[selectedVariation].price}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" font-normal uppercase  text-gray-700">
                ({formatMessage({ id: 'vat-inclusive' })})
              </h1>
            </div>
            {data.type === 'simple'
              ? data.simple_addons.promotion_price && (
                  <div className="flex items-center   ">
                    <h1>{formatMessage({ id: 'you-save' })} :</h1>
                    <h1 className="text-base text-red-700 mx-2">18%</h1>
                  </div>
                )
              : data.variation_addons[selectedVariation].promotion_price && (
                  <div className="flex items-center   ">
                    <h1>{formatMessage({ id: 'you-save' })} :</h1>
                    <h1 className="text-base text-red-700 mx-2">18%</h1>
                  </div>
                )}
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <hr className="my-2" />
        {data.type === 'variation' &&
          data.variation_addons[selectedVariation].addons_details.Color && (
            <Colors
              data={data.variation_addons}
              colors={data.colors}
              color={color}
              setColor={setColor}
              availableColors={data.availableColors}
              setSelectedVariant={setSelectedVariant}
            />
          )}
        <hr className="my-2" />
      </div>
      <img src={miniBanner} alt="offer" className="mt-2" />
    </div>
  );
}
