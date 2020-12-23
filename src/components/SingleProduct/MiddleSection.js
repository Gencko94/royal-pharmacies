import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { scrollIntoView } from 'scroll-js';

import { DataProvider } from '../../contexts/DataContext';
export default function MiddleSection({
  data,
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
        return formatMessage({ id: 'more-than-10-ratings' });

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
  return (
    <div className="flex flex-col w-full self-start ">
      <Link
        to={`/${locale}/brands/${data.brand?.slug}`}
        className="hover:underline font-semibold text-sm text-gray-700 uppercase"
      >
        {data.brand?.translation[locale].name}
      </Link>
      <h1 className="font-semibold text-xl">
        {data.translation[locale].title}
      </h1>

      <h1 className=" font-semibold mb-1">
        {data.simple_addons.quantity < 20 ? (
          formatItemsPlural(data.simple_addons.quantity)
        ) : (
          <span className="mx-1  text-green-700">
            {formatMessage({ id: 'in-stock' })}
          </span>
        )}
      </h1>
      <div className="flex items-center mb-1">
        <div className="flex items-center text-gray-600 text-sm">
          <h1 className="text-gray-600 text-sm">
            {formatMessage({ id: 'model-number' })} :
          </h1>
          <h1 className="mx-1">{data.simple_addons.sku}</h1>
        </div>
        {!reviewsLoading && ratingCount !== 0 && (
          <div
            onClick={() => {
              scrollIntoView(document.getElementById('details'));
              setDetailsTab(1);
            }}
            className="mx-2 flex items-center"
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
      <div className="flex items-start py-1">
        <div className=" flex-1 font-bold">
          {data.simple_addons.promotion_price && (
            <div className=" flex items-center ">
              <h1>{formatMessage({ id: 'price-before' })} :</h1>
              <h1 className=" mx-2 italic  line-through text-gray-700">
                {data.simple_addons.promotion_price}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>{' '}
            </div>
          )}
          <div className="">
            <div className="flex items-center flex-1">
              <h1 className="    ">
                {data.simple_addons.promotion_price
                  ? formatMessage({ id: 'price-now' })
                  : formatMessage({ id: 'price' })}
              </h1>
              <h1 className=" text-xl mx-2 text-main-color">
                {data.simple_addons.price}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" font-normal uppercase  text-gray-700">
                ({formatMessage({ id: 'vat-inclusive' })})
              </h1>
            </div>
            {data.simple_addons.promotion_price && (
              <div className="flex items-center   ">
                <h1>{formatMessage({ id: 'you-save' })} :</h1>
                <h1 className="text-base text-red-700 mx-2">18%</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
