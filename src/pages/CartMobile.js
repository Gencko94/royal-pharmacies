import React from 'react';
import { DataProvider } from '../contexts/DataContext';

export default function CartMobile() {
  const { cartItems, removeItemFromCart, EditItemFromCart } = React.useContext(
    DataProvider
  );
  const calculateItemsPrice = cartItems => {
    let price = 0;
    cartItems.forEach(item => {
      price = price + item.quantity * item.price;
    });
    return price;
  };
  return (
    <div className=" py-1 px-2">
      <div className="py-1 px-2 bg-white cart__checkout-sticky mb-2 border-b -mx-3">
        <h1 className="text-lg font-semibold mb-1 ">
          Subtotal ({cartItems.length}{' '}
          {cartItems.length === 1 ? 'item' : 'items'}) :{' '}
          <span className="text-red-700 font-bold">
            {calculateItemsPrice(cartItems)} KD
          </span>
        </h1>
        <button className="p-2 rounded font-semibold   w-full text-gray-100 bg-green-600">
          Proceed to Checkout
        </button>
      </div>
      <div className="mb-2">
        {cartItems.map((item, i) => {
          return (
            <>
              <div key={i} className=" py-2 cart__item-mobile">
                <img
                  className=""
                  style={{ maxHeight: '', maxWidth: '' }}
                  src={item.photo}
                  alt={item.name}
                />
                <div className="text-sm">
                  <h1 className="font-semibold ">{item.name}</h1>
                  <h1 className=" font-semibold text-green-700">In Stock</h1>
                  <div className="text-red-700 font-bold text-base">
                    {item.price * item.quantity} KD
                  </div>
                  <div className=" flex items-center ">
                    <h1 className=" mr-2 font-semibold">Quantity : </h1>
                    <select
                      value={item.quantity}
                      onChange={e => EditItemFromCart(e.target.value, item)}
                      className="pr-8 py-1 form-select border-gray-400 border rounded"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-center text-sm  items-center my-2 ">
                <button
                  onClick={() => removeItemFromCart(item)}
                  className="py-1 px-2 bg-gray-100 rounded border font-semibold mr-2 "
                >
                  Remove from cart
                </button>
                <button
                  onClick={() => removeItemFromCart(item)}
                  className="py-1 px-2 bg-gray-100 border rounded font-semibold  "
                >
                  Add to wishlist
                </button>
              </div>
              <hr />
            </>
          );
        })}
        <hr />
      </div>

      <h1 className="text-sm">
        The price and availability of items at AlAtiah.com are subject to
        change. The Cart is a temporary place to store a list of your items and
        reflects each item's most recent price.
      </h1>
    </div>
  );
}
