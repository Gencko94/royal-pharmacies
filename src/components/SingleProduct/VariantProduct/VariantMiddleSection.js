import React from 'react';
import { useIntl } from 'react-intl';

import miniBanner from '../../../assets/banners/miniBanner.gif';

import { scrollIntoView } from 'scroll-js';
import ColorsAndSizes from './Colors/ColorsAndSizes';
import SizesAndColors from './Sizes/SizesAndColors';
import ColorsOnly from './Colors/ColorsOnly';
import SizesOnly from './Sizes/SizesOnly';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { DataProvider } from '../../../contexts/DataContext';
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

  const resolveOptions = React.useCallback(() => {
    let arr = [];
    if (data.new_variation_addons[selectedVariation].name_en === 'Color') {
      if (data.new_variation_addons[selectedVariation].options) {
        console.log(data.new_variation_addons[selectedVariation]);
        if (
          data.new_variation_addons[selectedVariation].options[
            selectedOption[selectedVariation]
          ].name_en === 'Size'
        ) {
          arr.push(
            <SizesAndColors
              sizes={data.new_variation_addons[selectedVariation].options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              variation={selectedVariation}
            />,
            <ColorsAndSizes
              colors={data.new_variation_addons}
              setSelectedVariant={setSelectedVariant}
              selectedOption={selectedOption}
            />
          );
        }
        return arr;
      } else {
        arr.push(
          <ColorsOnly
            colors={data.new_variation_addons}
            setSelectedVariant={setSelectedVariant}
          />
        );
        return arr;
      }
    } else if (
      data.new_variation_addons[selectedVariation].name_en === 'Size'
    ) {
      console.log('size');
      arr.push(
        <SizesOnly
          sizes={data.new_variation_addons}
          selectedVariation={selectedVariation}
          setSelectedVariant={setSelectedVariant}
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
      <h1 className="font-bold text-2xl">{data.translation[locale].title}</h1>
      <div className="flex items-center ">
        <Rating
          initialRating={averageRating}
          readonly
          emptySymbol={<AiOutlineStar className="text-main-color" />}
          fullSymbol={<AiFillStar className="text-main-color" />}
          className=" pt-1"
        />
      </div>

      <div className="flex items-center mb-1">
        <div className="flex items-center text-gray-600 text-sm">
          <h1 className="text-gray-600 text-sm">
            {formatMessage({ id: 'model-number' })} :
          </h1>
          <h1 className="mx-1">
            {data.new_variation_addons[selectedVariation].id}
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
          {data.new_variation_addons[selectedVariation].options
            ? data.new_variation_addons[selectedVariation].options[
                selectedOption[selectedVariation]
              ].promotion_price && (
                <div className=" flex items-center ">
                  <h1>{formatMessage({ id: 'price-before' })} :</h1>
                  <h1 className=" mx-2 text-base italic  line-through text-gray-700">
                    {
                      data.new_variation_addons[selectedVariation].options[
                        selectedOption[selectedVariation]
                      ].promotion_price
                    }
                    <span className="mx-1">
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </span>
                  </h1>
                </div>
              )
            : data.new_variation_addons[selectedVariation].promotion_price && (
                <div className=" flex items-center ">
                  <h1>{formatMessage({ id: 'price-before' })} :</h1>
                  <h1 className=" mx-2 text-base italic  line-through text-gray-700">
                    {
                      data.new_variation_addons[selectedVariation]
                        .promotion_price
                    }
                    <span className="mx-1">
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </span>
                  </h1>
                </div>
              )}
          <div className="">
            <div className="flex items-center flex-1">
              <h1 className="    ">
                {data.new_variation_addons[selectedVariation].options
                  ? data.new_variation_addons[selectedVariation].options[
                      selectedOption[selectedVariation]
                    ].promotion_price
                    ? formatMessage({ id: 'price-now' })
                    : formatMessage({ id: 'price' })
                  : data.new_variation_addons[selectedVariation].promotion_price
                  ? formatMessage({ id: 'price-now' })
                  : formatMessage({ id: 'price' })}
              </h1>
              <h1 className=" text-xl mx-2  text-red-700">
                {data.new_variation_addons[selectedVariation].options
                  ? data.new_variation_addons[selectedVariation].options[
                      selectedOption[selectedVariation]
                    ].price
                  : data.new_variation_addons[selectedVariation].price}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" font-normal uppercase  text-gray-700">
                ({formatMessage({ id: 'vat-inclusive' })})
              </h1>
            </div>
            {data.new_variation_addons[selectedVariation].options
              ? data.new_variation_addons[selectedVariation].options[
                  [selectedOption[selectedVariation]]
                ].promotion_price && (
                  <div className="flex items-center   ">
                    <h1>{formatMessage({ id: 'you-save' })} :</h1>
                    <h1 className="text-base text-red-700 mx-2">18%</h1>
                  </div>
                )
              : data.new_variation_addons[selectedVariation]
                  .promotion_price && (
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
        {resolveOptions()}

        <hr className="my-2" />
      </div>
      <img src={miniBanner} alt="offer" className="mt-2" />
    </div>
  );
}
