import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import miniBanner from '../../assets/banners/miniBanner.gif';
import Colors from './Colors';
import Sizes from './Sizes';
export default function MiddleSection({
  data,
  selectedVariation,
  deliveryCountry,
  size,
  setSize,
  color,
  setColor,
  setSelectedVariant,
  setSelectedSize,
  selectedSize,
}) {
  const { formatMessage, locale } = useIntl();
  const resolvePlural = () => {
    switch (data.reviews.length) {
      case 1:
        return formatMessage({ id: 'one-review' });

      case 2:
        return formatMessage({ id: 'two-reviews' });

      case data.reviews.length > 10:
        return formatMessage({ id: 'one-review' });

      default:
        return formatMessage({ id: 'reviews' });
    }
  };
  return (
    <div className="flex flex-col w-full self-start ">
      <h1 className="font-semibold text-xl">
        {data.translation[locale].title}
      </h1>
      <div className="flex items-center ">
        <Rating
          initialRating={4.5}
          readonly
          emptySymbol={<AiOutlineStar className="text-main-color" />}
          fullSymbol={<AiFillStar className="text-main-color" />}
          className=" pt-1"
        />
        {/* <div className="text-sm mx-2">
          <div className="text-sm text-gray-600 flex items-center">
            <h1>{data.reviews.length > 2 && data.reviews.length}</h1>
            <h1 className="mx-1">{resolvePlural()}</h1>
          </div>
        </div> */}
      </div>
      <h1 className=" font-semibold mb-1 text-green-700">
        {formatMessage({ id: 'in-stock' })}
      </h1>
      <h1 className="text-sm   mb-1 text-gray-700">
        {formatMessage({ id: 'model-number' })} :{' '}
        {data.type === 'simple'
          ? data.simple_addons.sku
          : data.variation_addons[selectedVariation].sku}
      </h1>
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
                    {data.variation_addons[selectedVariation].promotion_price}{' '}
                    KD
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
                KD
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
        <div className="p-1 text-xs text-main-text bg-green-800 rounded-sm">
          <h1>{formatMessage({ id: 'free-delivery-to' })} Kuwait</h1>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        {/* {data.type === 'variation' &&
          data.variation_addons[selectedVariation].addons_details.Size && (
          <Sizes
          data={data.variation_addons}
              sizes={data.sizes}
              size={size}
              setSize={setSize}
              availableSizes={data.availableSizes}
            />
          )} */}
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
