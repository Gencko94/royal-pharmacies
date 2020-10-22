import React from 'react';
import { Link } from 'react-router-dom';
import { DataProvider } from '../contexts/DataContext';
import cartBag from '../assets/illustrations/cartBag.svg';
import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import ItemsSlider from '../components/Home/ItemsSlider';

export default function CartMobile() {
  const {
    cartItems,
    removeItemFromCart,
    EditItemFromCart,
    phone,
    isLightTheme,
  } = React.useContext(DataProvider);
  const calculateItemsPrice = cartItems => {
    let price = 0;
    cartItems.forEach(item => {
      price = price + item.quantity * item.price;
    });
    return price;
  };
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));

  return (
    <div className=" py-1 px-2">
      {cartItems.length === 0 && (
        <>
          <div>
            <div className="p-2 flex flex-col justify-center">
              <img src={cartBag} alt="Empty Cart Bag" className=" h-32" />
              <div className="text-center">
                <h1 className="text-2xl font-bold  ">
                  Oops, Your Cart is Empty !
                </h1>
                <Link to="/" className="text-sm text-blue-600 hover:underline">
                  Check today deals
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center p-2">
              <Link
                to="/app/login"
                className={`  text-center rounded p-2 bg-green-700 text-second-nav-text-light `}
              >
                Sign in to your account
              </Link>
              <Link
                to="/app/register"
                className={` text-center  rounded p-2 bg-blue-700 text-second-nav-text-light mt-2 `}
              >
                Sign up now
              </Link>
            </div>
          </div>
        </>
      )}
      {cartItems.length !== 0 && (
        <div className="py-1 px-2 bg-white cart__checkout-sticky z-10 mb-2 border-b -mx-3">
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
      )}
      <div className="mb-2">
        {cartItems.length !== 0 &&
          cartItems.map((item, i) => {
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

      <h1 className="text-xs my-2">
        The price and availability of items at AlAtiah.com are subject to
        change. The Cart is a temporary place to store a list of your items and
        reflects each item's most recent price.
      </h1>
      <hr />
      {visitedItems.length > 7 ? (
        <RecentlyVisitedHorizontal visitedItems={visitedItems} />
      ) : (
        <ItemsSlider
          data={phone}
          miniLogo={false}
          isLightTheme={isLightTheme}
          title="Save Big with Phones & Tablets"
        />
      )}
    </div>
  );
}
