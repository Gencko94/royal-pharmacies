import React from 'react';
import CartItem from '../components/Cart/CartItem';
import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import RecentlyViewedVertical from '../components/RecentlyViewedVertical';
import { DataProvider } from '../contexts/DataContext';
import cartBag from '../assets/illustrations/cartBag.svg';
import { Link } from 'react-router-dom';
import ItemsSlider from '../components/Home/ItemsSlider';
import FeaturedItemsVertical from '../components/Cart/FeaturedItemsVertical';
export default function Cart() {
  const {
    cartItems,
    healthCare,
    isLightTheme,
    calculateItemsPrice,
    phone,
  } = React.useContext(DataProvider);
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));

  return (
    <div
      className=" cart py-2 px-4 relative"
      style={{ maxWidth: '1560px', margin: '0 auto' }}
    >
      <div className="font-semibold float-right">
        <div className=" rounded border bg-gray-100 p-2 flex justify-start flex-col mb-2 ">
          <h1 className="text-base font-semibold mb-2 ">
            Subtotal ({cartItems.length}{' '}
            {cartItems.length === 1 ? 'item' : 'items'}) :{' '}
            {calculateItemsPrice(cartItems)} KD
          </h1>
          <button
            className={`${
              cartItems.length === 0
                ? 'cursor-not-allowed bg-gray-600'
                : 'bg-green-600'
            } p-1 rounded text-gray-100 `}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
        {visitedItems.length > 3 ? (
          <RecentlyViewedVertical visitedItems={visitedItems} />
        ) : (
          <FeaturedItemsVertical />
        )}
      </div>
      <div className="cart__container">
        {cartItems.length !== 0 && (
          <>
            <div className="cart__title font-semibold text-lg">
              <h1 className="  ">Shopping Cart</h1>
              <h1 className="  ">Item</h1>
              <h1 className="text-center">Price</h1>
            </div>
            <hr />
          </>
        )}
        {cartItems.length === 0 && (
          <div className="p-2 flex">
            <img src={cartBag} alt="Empty Cart Bag" className=" h-32 mr-10" />
            <div>
              <h1 className="text-2xl font-bold ">
                Oops, Your Cart is Empty !
              </h1>
              <Link to="/" className="text-sm text-blue-600 hover:underline">
                Check today deals
              </Link>
              <div className="flex items-center flex-wrap">
                <Link
                  to="/app/login"
                  className={` rounded p-2 mt-2 bg-green-700 text-second-nav-text-light mr-3 `}
                >
                  Sign in to your account
                </Link>
                <Link
                  to="/app/register"
                  className={` rounded p-2 mt-2 bg-blue-700 text-second-nav-text-light  `}
                >
                  Sign up now
                </Link>
              </div>
            </div>
          </div>
        )}
        {cartItems.length !== 0 &&
          cartItems.map((item, i) => {
            return (
              <div key={i}>
                <CartItem item={item} />
              </div>
            );
          })}
        {cartItems.length !== 0 && (
          <div className="flex justify-end pr-2 mt-2">
            <h1 className="text-lg font-semibold">
              Subtotal ({cartItems.length}{' '}
              {cartItems.length === 1 ? 'item' : 'items'}) :{' '}
              {calculateItemsPrice(cartItems)} KD
            </h1>
          </div>
        )}
        <h1 className="text-sm my-4">
          The price and availability of items at AlAtiah.com are subject to
          change. The Cart is a temporary place to store a list of your items
          and reflects each item's most recent price.
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
      <ItemsSlider
        data={healthCare}
        miniLogo={false}
        title="Health Care Essentials"
        isLightTheme={isLightTheme}
      />
    </div>
  );
}
