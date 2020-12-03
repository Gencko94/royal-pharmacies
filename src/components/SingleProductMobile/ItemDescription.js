import React from 'react';
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Colors from '../SingleProduct/Colors';
import Sizes from '../SingleProduct/Sizes';
import { scrollIntoView } from 'scroll-js';
export default function ItemDescription({
  data,
  deliveryCountry,
  handleRemoveFromCart,
  handleAddToCart,
  itemInCart,
  itemInWishList,
  quantity,
  setQuantity,
  addToCartButtonLoading,
  addToWishListButtonLoading,
  handleAddToWishList,
  handleRemoveFromWishList,
  userId,
  size,
  setSize,
  color,
  setColor,
  reviews,
  setDetailsTab,
  rating,
}) {
  const { formatMessage, locale } = useIntl();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const resolvePlural = () => {
    switch (reviews.length) {
      case 1:
        return formatMessage({ id: 'one-review' });

      case 2:
        return formatMessage({ id: 'two-reviews' });

      case reviews.length > 10:
        return formatMessage({ id: 'one-review' });

      default:
        return formatMessage({ id: 'reviews' });
    }
  };
  const addToWishList = () => {
    if (!userId) {
      setSnackBarOpen(true);
      setTimeout(() => {
        setSnackBarOpen(false);
      }, 5000);
      return;
    }
    if (itemInWishList) {
      handleRemoveFromWishList(data.id);
    } else {
      handleAddToWishList();
    }
  };
  return (
    <div className="mb-3">
      <h1 className="font-semibold text-xl">
        {data.translation[locale].title}
      </h1>
      <div className="flex items-center ">
        <Rating
          initialRating={4.5}
          emptySymbol={<AiOutlineStar className="text-red-700" />}
          fullSymbol={<AiFillStar className="text-red-700" />}
          className="pt-1"
        />

        {/* <div
          onClick={() => {
            scrollIntoView(document.getElementById('details'));
            setDetailsTab(1);
          }}
          className="text-sm mx-2 cursor-pointer"
        >
          <div className="text-sm text-gray-600 flex items-center  hover:underline">
            <h1>{reviews.length > 2 && reviews.length}</h1>
            <h1 className="mx-1">{resolvePlural()}</h1>
          </div>
        </div> */}
      </div>

      <h1 className=" font-semibold mb-1 text-green-600">
        {formatMessage({ id: 'in-stock' })}
      </h1>
      <h1 className="text-sm   mb-1 text-gray-700">
        {formatMessage({ id: 'model-number' })} : {data.simple_addons.sku}
      </h1>

      <hr />
      <div className=" mb-1 text-sm  font-bold">
        {data.simple_addons.promotion_price && (
          <div className="flex flex-wrap items-center">
            <h1 className=" ">{formatMessage({ id: 'price-before' })} :</h1>
            <h1 className=" text-base italic mx-2  line-through text-gray-700">
              {data.simple_addons.promotion_price} KD
            </h1>
          </div>
        )}
        <div className="flex flex-wrap items-center">
          <h1 className="">
            {data.simple_addons.promotion_price
              ? formatMessage({ id: 'price-now' })
              : formatMessage({ id: 'price' })}{' '}
            :
          </h1>
          <h1 className=" text-xl mx-2 text-red-700">
            {data.simple_addons.price} KD
          </h1>
          <h1 className=" font-normal  text-gray-700 uppercase">
            ({formatMessage({ id: 'vat-inclusive' })})
          </h1>
        </div>

        <h1 className="">
          {formatMessage({ id: 'you-save' })} :{' '}
          <span className=" text-xl  text-main-color">18%</span>{' '}
        </h1>
        <button
          className={`my-2 px-2 text-sm bg-green-200 rounded font-semibold`}
        >
          {formatMessage({ id: 'free-delivery-to' })} {deliveryCountry}
        </button>
      </div>
      <div className="  my-2 flex items-center">
        <h1 className="font-semibold">
          {formatMessage({ id: 'quantity' })} :{' '}
        </h1>

        <select
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="select-mobile border-gray-400 border py-1 px-2 rounded mx-2"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      {/* {sizes && (
        <>
          <Sizes
            size={size}
            setSize={setSize}
            sizes={sizes}
            availableSizes={availableSizes}
          />
          <hr className="my-2" />
        </>
      )}
      {colors && (
        <>
          <Colors
            colors={colors}
            color={color}
            setColor={setColor}
            availableColors={availableColors}
          />
          <hr className="my-2" />
        </>
      )} */}
      <div className="relative">
        <button
          onClick={() => {
            if (itemInCart) {
              handleRemoveFromCart(data.id);
            } else {
              handleAddToCart();
            }
          }}
          className={`${
            addToCartButtonLoading
              ? 'bg-gray-300'
              : itemInCart
              ? 'bg-main-color'
              : 'bg-green-700'
          } text-gray-100 text-sm py-2 px-2 mb-2 rounded uppercase w-full  flex items-center justify-center font-semibold`}
        >
          {addToCartButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={25}
              width={25}
              visible={addToCartButtonLoading}
            />
          ) : itemInCart ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p " />
              </span>
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-cart' })}
              </h1>
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
          onClick={addToWishList}
          className={`
              border border-main-color text-main-color
            text-sm py-2 px-2 rounded uppercase w-full flex items-center justify-center font-semibold`}
        >
          {addToWishListButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={25}
              width={25}
              visible={true}
            />
          ) : itemInWishList ? (
            <>
              <span>
                <AiOutlineHeart className="w-25p h-25p " />
              </span>
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-wishlist' })}
              </h1>
            </>
          ) : (
            <>
              <span>
                <AiOutlineHeart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">
                {formatMessage({ id: 'add-to-wishlist' })}
              </h1>
            </>
          )}
        </button>
        {/* <button className="border border-main-color mx-2 py-2 px-2 rounded flex-1 text-sm  text-main-color flex items-center justify-center font-semibold ">
          <span>
            <AiOutlineHeart className="w-25p h-25p" />
          </span>
          <h1 className="mx-2 whitespace-no-wrap">
            {formatMessage({ id: 'add-to-wishlist' })}
          </h1>
        </button> */}
      </div>
    </div>
  );
}
