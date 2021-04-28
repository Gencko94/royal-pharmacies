import React from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { scrollIntoView } from 'scroll-js';
import { DataProvider } from '../../contexts/DataContext';
import { MdLocationOn } from 'react-icons/md';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { calculateDiscountPrice } from '../../helpers/calculateDiscountPrice';
import { Link } from 'react-router-dom';
import RelatedItems from '../SingleProduct/RelatedItems';
export default function ItemDescription({
  data,
  handleAddToCart,
  itemInCart,
  quantity,
  setQuantity,
  addToCartButtonLoading,
  userId,
  setDetailsTab,
  reviewsLoading,
  ratingCount,
  averageRating,
}) {
  const qty = data.simple_addons.quantity;
  const isSale = data.simple_addons.promotion_price ? true : false;
  const {
    removeFromWishListMutation,
    addToWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const [itemInWishList, setItemInWishList] = React.useState(false);
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
  const formatDaysPlural = () => {
    switch (parseInt(deliveryCountry?.delivery_time)) {
      case 1:
        return formatMessage({ id: 'one-day' });

      case 2:
        return formatMessage({ id: 'two-days' });

      case parseInt(deliveryCountry?.delivery_time > 10):
        return formatMessage({ id: 'more-than-10-days' });

      default:
        return formatMessage({ id: 'days' });
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
          <span className="text-yellow-700">
            {formatMessage({ id: 'one-item-left' })}
          </span>
        );

      case 2:
        return (
          <span className="text-yellow-700">
            {formatMessage({ id: 'two-items-left' })}
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
  const handleAddToWishlist = async () => {
    if (!userId) {
      return;
    }
    try {
      await addToWishListMutation({ id: data.id, userId });
      setItemInWishList(true);
    } catch (error) {
      setItemInWishList(true);
    }
  };
  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishListMutation({ id: data.id, userId });
      setItemInWishList(false);
    } catch (error) {}
  };
  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };
  const handleChangeQuantity = e => {
    if (e.target.value < 1) {
      return;
    } else {
      setQuantity(e.target.value);
    }
  };

  return (
    <div className="mb-3">
      <div className="flex items-center">
        {data.brand && (
          <Link to={`/${locale}/brands/${data.brand?.slug}`}>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/small/${data.brand?.logo?.link}`}
              alt={data.brand?.translation[locale].name}
              style={{ width: '70px', height: '63px' }}
            />
          </Link>
        )}
        <Link
          to={`/${locale}/brands/${data.brand?.slug}`}
          className="mx-3 hover:opacity-50 underline font-semibold text-sm text-gray-700 uppercase"
        >
          {data.brand?.translation[locale].name}
        </Link>
      </div>

      <h1 className="font-semibold text-xl">
        {data.full_translation[locale].title}
      </h1>
      <div className="flex items-center ">
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
      </div>

      <h1 className=" font-semibold mb-1">
        {qty < 5 ? (
          formatItemsPlural(qty)
        ) : (
          <span className="text-green-700">
            {formatMessage({ id: 'in-stock' })}
          </span>
        )}
      </h1>

      <hr className="my-2" />
      <div className=" my-2 " style={{ fontWeight: '900' }}>
        {isSale && (
          <div className="flex flex-wrap items-center">
            <h1 className=" ">{formatMessage({ id: 'price-before' })} :</h1>
            <h1 className=" italic mx-2 text-xl  line-through text-gray-700">
              {(
                data.simple_addons.price * deliveryCountry?.currency.value
              ).toFixed(3)}{' '}
              {deliveryCountry?.currency.translation[locale].symbol}
            </h1>
          </div>
        )}
        <div className="flex flex-wrap items-center">
          <h1 className="">
            {isSale
              ? formatMessage({ id: 'price-now' })
              : formatMessage({ id: 'price' })}
            :
          </h1>
          <h1 className=" text-xl mx-2 text-main-color">
            {isSale
              ? (
                  data.simple_addons.promotion_price *
                  deliveryCountry?.currency.value
                ).toFixed(3)
              : (
                  data.simple_addons.price * deliveryCountry?.currency.value
                ).toFixed(3)}{' '}
            {deliveryCountry?.currency.translation[locale].symbol}
          </h1>
          <h1 className=" font-normal text-xs  text-gray-700 uppercase">
            ({formatMessage({ id: 'vat-inclusive' })})
          </h1>
        </div>

        {isSale && (
          <h1 className="">
            {formatMessage({ id: 'you-save' })} :
            <span className=" text-lg mx-1 text-main-color">
              {calculateDiscountPrice(
                data.simple_addons.price,
                data.simple_addons.promotion_price
              )}
            </span>
          </h1>
        )}
      </div>

      <hr className="my-2" />
      <div className="mb-2">
        <div className="flex items-center font-semibold ">
          <div className="flex items-center">
            <h1>{formatMessage({ id: 'deliver-to' })}</h1>
            <h1 className="uppercase mx-1">
              {deliveryCountry?.translation[locale].name}
            </h1>
            <MdLocationOn className="w-6 h-6 text-main-color " />
          </div>
        </div>

        <div className="flex items-center mb-2">
          <h1 className="text-gray-700">
            {formatMessage({ id: 'estimated-delivery' })} :
          </h1>
          <h1 className="mx-1">
            {deliveryCountry?.delivery_time > 2 &&
              deliveryCountry.delivery_time}
            <span className="mx-1">{formatDaysPlural()}</span>
          </h1>
        </div>
      </div>

      <div className="relative flex items-center flex-wrap">
        <div className=" flex items-center justify-center">
          <button onClick={handleSubstractQuantity} className="p-1">
            <AiOutlineMinusCircle
              className={`w-6 h-6 ${
                quantity === 1 ? 'text-gray-700' : 'text-blue-700'
              }`}
            />
          </button>
          <input
            value={quantity}
            onChange={handleChangeQuantity}
            className="mx-1 px-2 py-1 border rounded"
            style={{ maxWidth: '40px', textAlign: 'center' }}
          />
          <button onClick={handleAddQuantity} className="p-1">
            <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
          </button>
        </div>

        <button
          onClick={() => {
            if (itemInCart) {
              return;
            } else {
              handleAddToCart();
            }
          }}
          disabled={qty === 0}
          className={`${
            qty === 0 ? 'bg-main-color ' : 'bg-green-700'
          } text-main-text text-sm  p-2 mx-1 rounded uppercase whitespace-no-wrap flex-1 flex items-center justify-center font-semibold`}
        >
          {addToCartButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={25}
              width={25}
              visible={addToCartButtonLoading}
            />
          ) : itemInCart ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p " />
              </span>
              <h1 className="mx-1 whitespace-no-wrap">
                {formatMessage({ id: 'added-to-cart' })}
              </h1>
            </>
          ) : qty === 0 ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{formatMessage({ id: 'out-of-stock' })}</h1>
            </>
          ) : (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{formatMessage({ id: 'add-to-cart' })}</h1>
            </>
          )}
        </button>
        <button
          onClick={() => {
            if (itemInWishList) {
              handleRemoveFromWishlist();
            } else {
              handleAddToWishlist();
            }
          }}
          className={`border
            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold`}
        >
          {itemInWishList ? (
            <AiFillHeart
              className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
            />
          ) : (
            <AiOutlineHeart
              className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
            />
          )}
        </button>
      </div>
      <hr className="my-2" />
    </div>
  );
}
