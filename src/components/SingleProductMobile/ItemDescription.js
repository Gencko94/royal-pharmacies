import React from 'react';
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import MoonLoader from 'react-spinners/MoonLoader';
export default function ItemDescription({
  data: { name, priceBefore, price, id },
  deliveryCountry,
  handleRemoveFromCart,
  handleAddToCart,
  itemInCart,
  quantity,
  setQuantity,
  addToCartButtonLoading,
}) {
  const { formatMessage } = useIntl();

  return (
    <div className="mb-3">
      <h1 className="font-semibold text-xl">{name}</h1>
      <div className="flex items-center ">
        <Rating
          initialRating={4.5}
          emptySymbol={<AiOutlineStar className="text-red-700" />}
          fullSymbol={<AiFillStar className="text-red-700" />}
          className="pt-1"
        />
        <h1 className="text-sm mx-2">36 {formatMessage({ id: 'ratings' })}</h1>
      </div>

      <h1 className=" font-semibold mb-1 text-green-600">
        {formatMessage({ id: 'in-stock' })}
      </h1>
      <h1 className="text-sm   mb-1 text-gray-700">
        {formatMessage({ id: 'model-number' })} : NK2O-4952
      </h1>

      <hr />
      <div className=" mb-1 text-sm  font-bold">
        <div className="flex flex-wrap items-center">
          <h1 className=" ">{formatMessage({ id: 'price-before' })} :</h1>
          <h1 className=" text-base italic mx-2  line-through text-gray-700">
            {priceBefore} KD
          </h1>
        </div>
        <div className="flex flex-wrap items-center">
          <h1 className="">{formatMessage({ id: 'price-now' })} :</h1>
          <h1 className=" text-xl mx-2 text-red-700">{price} KD</h1>
          <h1 className=" font-normal  text-gray-700">
            ({formatMessage({ id: 'vat-inclusive' })})
          </h1>
        </div>

        <h1 className="">
          {formatMessage({ id: 'you-save' })} :{' '}
          <span className=" text-xl  text-red-700">18%</span>{' '}
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
      <div className="relative flex items-center justify-between">
        <button
          onClick={() => {
            if (itemInCart) {
              handleRemoveFromCart(id);
            } else {
              handleAddToCart({ id, quantity });
            }
          }}
          className={`${
            addToCartButtonLoading
              ? 'bg-gray-300'
              : itemInCart
              ? 'bg-main-color'
              : 'bg-blue-700'
          } flex-1 text-gray-100 text-sm p-1 px-2 rounded   flex items-center justify-center font-semibold`}
        >
          {addToCartButtonLoading ? (
            <MoonLoader size={19} color="#b72b2b" />
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
        <button className="bg-green-600 mx-2 p-1 rounded flex-1 text-sm  text-white flex items-center justify-center font-semibold ">
          <span>
            <AiOutlineHeart className="w-25p h-25p" />
          </span>
          <h1 className="mx-2 whitespace-no-wrap">
            {formatMessage({ id: 'add-to-wishlist' })}
          </h1>
        </button>
      </div>
    </div>
  );
}
