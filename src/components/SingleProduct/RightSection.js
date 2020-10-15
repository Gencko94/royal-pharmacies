import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { MdLocationOn } from 'react-icons/md';

import { DataProvider } from '../../contexts/DataContext';

export default function RightSection({ data }) {
  const [quantity, setQuantity] = React.useState(1);
  const {
    addItemToCart,
    removeItemFromCart,
    cartItems,
    deliveryCountry,
  } = React.useContext(DataProvider);
  const isItemInCart = () => {
    const itemInCart = cartItems.find(item => data.id === item.id);
    if (itemInCart !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="border  px-2 pb-2 pt-1 rounded shadow-sm ">
      <div className="py-1">
        <h1>
          Sold By <span className="font-semibold">MRG</span>
        </h1>
        <h1>
          Delivered By <span className="font-semibold">MRG</span>
        </h1>
      </div>
      <hr />
      <div className={` rounded py-1  my-1 text-sm`}>
        <div className="flex justify-between items-center font-semibold  ">
          <div className="flex items-center ">
            <h1>
              Deliver To :{' '}
              <span className="uppercase mr-2">{deliveryCountry}</span>
            </h1>
            <MdLocationOn className="w-5 h-5 text-red-800 " />
          </div>
          <button className={`py-0 px-2 text-xs bg-gray-200 rounded`}>
            Change
          </button>
        </div>
        <div className="">
          <h1 className="">
            <span className="text-gray-700">Estimated Delivery : </span>
            October 8
          </h1>

          <h1 className="">
            <span className="text-gray-700">Fastest Delivery : </span>
            October 6
          </h1>
        </div>
      </div>

      <hr className="mb-2" />
      <div className=" mr-2 flex justify-center items-center mb-2">
        <h1 className=" mr-2 font-semibold">Quantity : </h1>
        <select
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="pr-8 py-1 form-select border-gray-400 border rounded"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <hr />
      <div className="text-gray-700 flex items-center justify-center py-2">
        <AiOutlineLock className="h-5 w-5 mr-4 " />
        <h1 className="hover:underline cursor-pointer">Secure transaction</h1>
      </div>
      <div className="flex flex-col">
        <button className="bg-green-700 flex-1 mb-2  py-1 px-2 rounded  text-white flex items-center justify-center font-semibold ">
          <span>
            <TiShoppingCart className="w-25p h-25p mr-2" />
          </span>
          Buy now
        </button>
        {isItemInCart() ? (
          <button
            onClick={() => removeItemFromCart(data)}
            className="bg-red-700 flex-1 mb-2  py-1 px-2 rounded  text-white flex items-center justify-center font-semibold "
          >
            <span>
              <TiShoppingCart className="w-25p h-25p mr-2" />
            </span>
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={() => addItemToCart({ data, quantity })}
            className="bg-blue-700 flex-1 mb-2  py-1 px-2 rounded  text-white flex items-center justify-center font-semibold "
          >
            <span>
              <TiShoppingCart className="w-25p h-25p mr-2" />
            </span>
            Add to Cart
          </button>
        )}
        <button className="bg-blue-500 py-1 px-2 rounded  text-white flex items-center justify-center font-semibold ">
          <span>
            <AiOutlineHeart className="w-25p h-25p mr-2" />
          </span>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
