import React from 'react';
import { useIntl } from 'react-intl';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';

export default function RelatedItem({ item }) {
  const { locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);

  return (
    <div>
      <div className="relative">
        <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
          <LazyImage
            src={item.image?.link}
            alt={item.translation[locale].title}
            pb="calc(100% * 250/210)"
            origin="small"
          />
        </Link>
      </div>

      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '55px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            to={`/${locale}/products/${item.slug}/${item.id}`}
          >
            <h1 className="text-clamp-2 text-xs font-semibold">
              {item.translation[locale].title}
            </h1>
          </Link>
        </div>

        <div className="p-2 flex items-center justify-between">
          {item.simple_addons?.promotion_price ? (
            <div className="flex items-center">
              <h1 className="font-semibold text-lg text-main-color">
                {item.simple_addons.promotion_price}
              </h1>
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
              <h1 className=" text-sm mx-1 italic  line-through text-gray-700">
                {item.simple_addons?.price}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="font-semibold text-lg text-main-color">
              {item.simple_addons?.price}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
