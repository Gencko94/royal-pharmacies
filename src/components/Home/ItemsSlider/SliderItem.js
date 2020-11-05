import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import { MoonLoader } from 'react-spinners';

export default function SliderItem({
  data,
  isLightTheme,
  isItemInCart,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  loadingButton,
}) {
  const { locale, formatMessage } = useIntl();
  return (
    <div className="my-4  px-2   ">
      <div
        className={`  overflow-hidden flex flex-col relative ${
          isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider'
        } rounded`}
      >
        <a
          href={`/${locale}/${data.category.replace(
            /\s|%|,/g,
            '-'
          )}/${data.name.replace(/\s|%|,|-/g, '-')}/${data.id}`}
        >
          <img
            title={data.name}
            src={data.photos.small}
            alt={data.name}
            className=" w-full object-cover "
          />
        </a>
        <hr />

        <div
          className={`relative flex flex-col 
                    
                     px-2 py-1 ${
                       isLightTheme
                         ? 'bg-body-light text-body-text-light'
                         : 'bg-body-dark text-body-text-dark'
                     }`}
          style={{ minHeight: '72px' }}
        >
          <a
            title={data.name}
            className="hover:underline"
            href={`/${locale}/${data.category.replace(
              /\s|%|,/g,
              '-'
            )}/${data.name.replace(/\s|%|,|-/g, '-')}/${data.id}`}
          >
            <MultiClamp
              className="text-xs  font-semibold"
              clamp={2}
              ellipsis="..."
            >
              {data.name}
            </MultiClamp>
          </a>

          <div className="flex items-center">
            <p className="   text-xs font-semibold text-red-700 whitespace-no-wrap">
              {data.price} <span className="text-xs ">KD</span>
            </p>
            {data.sale && (
              <p className="text-xs mx-3  line-through text-gray-500  font-bold whitespace-no-wrap">
                {' '}
                {data.priceBefore} <span className="font-normal">KD</span>
              </p>
            )}
          </div>
          <button
            onClick={() => {
              if (isItemInCart(data.id)) {
                handleRemoveItemFromCart(data.id);
              } else {
                handleAddItemToCart(data);
              }
            }}
            className={`${
              loadingButton === data.id
                ? 'bg-gray-300'
                : isItemInCart(data.id)
                ? 'bg-main-color'
                : 'bg-blue-700'
            } flex-1 text-main-text  p-1 px-2 my-1 rounded text-xs   flex items-center justify-center font-semibold`}
          >
            {loadingButton === data.id ? (
              <MoonLoader size={15} color="#b72b2b" />
            ) : isItemInCart(data.id) ? (
              <>
                <h1 className="whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-cart' })}
                </h1>
              </>
            ) : (
              <>
                <span>
                  <TiShoppingCart className="w-20p h-20p" />
                </span>
                <h1 className="mx-2">{formatMessage({ id: 'add-to-cart' })}</h1>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
