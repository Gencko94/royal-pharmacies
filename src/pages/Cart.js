import React from 'react';
import CartItem from '../components/Cart/CartItem';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import RecentlyViewedVertical from '../components/RecentlyViewedVertical';
import { DataProvider } from '../contexts/DataContext';
import cartBag from '../assets/illustrations/cartBag.svg';
import { Link } from 'react-router-dom';
import ItemsSlider from '../components/Home/ItemsSlider';
import FeaturedItemsVertical from '../components/Cart/FeaturedItemsVertical';
import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import useClickAway from '../hooks/useClickAway';
import Layout from '../components/Layout';
import { useIntl } from 'react-intl';
export default function Cart() {
  const {
    cartItems,
    healthCare,
    isLightTheme,
    calculateItemsPrice,
    // phone,
  } = React.useContext(DataProvider);
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const modalRef = React.useRef();
  useClickAway(modalRef, () => {
    setCheckOutModalOpen(false);
  });
  const { formatMessage } = useIntl();
  return (
    <Layout>
      <Helmet>
        <title>Cart | MRG</title>
      </Helmet>
      <div className="px-4 py-2 max-w-default mx-auto">
        <div className=" cart  ">
          <div className=" cart__container ">
            {cartItems.length !== 0 && (
              <>
                <div className="cart__title font-semibold text-lg">
                  <h1 className="  ">
                    {formatMessage({ id: 'shopping-cart' })}
                  </h1>
                  <h1 className="  ">{formatMessage({ id: 'item' })}</h1>
                  <h1 className="text-center">
                    {formatMessage({ id: 'price' })}
                  </h1>
                </div>
                <hr />
              </>
            )}
            {cartItems.length === 0 && (
              <div className=" flex">
                <img src={cartBag} alt="Empty Cart Bag" className=" h-32" />
                <div className="mx-5">
                  <h1 className="text-2xl font-bold ">
                    {formatMessage({ id: 'cart-empty' })}
                  </h1>
                  <Link
                    to="/"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {formatMessage({ id: 'check-today-deals' })}
                  </Link>
                  <div className="flex items-center flex-wrap">
                    <Link
                      to="/app/login"
                      className={` rounded p-2 mt-2 bg-green-700 text-second-nav-text-light  `}
                    >
                      {formatMessage({ id: 'login-button' })}
                    </Link>
                    <Link
                      to="/app/register"
                      className={` rounded p-2 mt-2 bg-blue-700 text-second-nav-text-light mx-2  `}
                    >
                      {formatMessage({ id: 'register-button' })}
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
                  {formatMessage({ id: 'subtotal' })} ({cartItems.length}{' '}
                  {cartItems.length === 1 ? 'item' : 'items'}) :{' '}
                  {calculateItemsPrice(cartItems)} KD
                </h1>
              </div>
            )}
            <h1 className="text-sm my-4">
              {formatMessage({ id: 'cart-tos' })}
            </h1>
            <hr />
            {/* {visitedItems.length > 7 ? (
            <RecentlyVisitedHorizontal visitedItems={visitedItems} />
          ) : (
            <ItemsSlider
              data={phone}
              miniLogo={false}
              isLightTheme={isLightTheme}
              title="Save Big with Phones & Tablets"
            />
          )} */}
          </div>
          <div
            className="font-semibold overflow-hidden  sticky top-0"
            style={{ top: '134px' }}
          >
            {cartItems.length !== 0 && (
              <div className=" rounded border bg-gray-100 p-2 flex justify-start flex-col mb-2 ">
                <h1 className="text-base font-semibold mb-2 ">
                  {formatMessage({ id: 'subtotal' })} ({cartItems.length}{' '}
                  {cartItems.length === 1 ? 'item' : 'items'}) :{' '}
                  {calculateItemsPrice(cartItems)} KD
                </h1>
                <button
                  onClick={() => setCheckOutModalOpen(true)}
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
            )}
            {visitedItems.length > 4 ? (
              <RecentlyViewedVertical visitedItems={visitedItems} />
            ) : (
              <FeaturedItemsVertical />
            )}
          </div>
        </div>
        <ItemsSlider
          data={healthCare}
          miniLogo={false}
          title="Health Care Essentials"
          isLightTheme={isLightTheme}
        />
        <CheckoutModal
          checkoutModalOpen={checkoutModalOpen}
          isLightTheme={isLightTheme}
          modalRef={modalRef}
          setCheckOutModalOpen={setCheckOutModalOpen}
        />
      </div>
    </Layout>
  );
}
