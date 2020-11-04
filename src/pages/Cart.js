import React from 'react';
import CartItem from '../components/Cart/CartItem';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import RecentlyViewedVertical from '../components/RecentlyViewedVertical';
import { DataProvider } from '../contexts/DataContext';
import cartBag from '../assets/illustrations/cartBag.svg';
import { Link } from 'react-router-dom';
import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import FeaturedItemsVertical from '../components/Cart/FeaturedItemsVertical';
import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import useClickAway from '../hooks/useClickAway';
import Layout from '../components/Layout';
import { useIntl } from 'react-intl';
import ContentLoader from 'react-content-loader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
export default function Cart() {
  const {
    cartItems,
    healthCare,
    isLightTheme,
    calculateItemsPrice,
    getCartItems,
    removeItemFromCart,
  } = React.useContext(DataProvider);
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [cartEmpty, setCartEmpty] = React.useState(false);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [
    loadingRemoveFromCartButton,
    setLoadingRemoveFromCartButton,
  ] = React.useState(null);

  const modalRef = React.useRef();
  useClickAway(modalRef, () => {
    setCheckOutModalOpen(false);
  });
  const { formatMessage, locale } = useIntl();
  const handleRemoveItem = async id => {
    setLoadingRemoveFromCartButton(id);
    const result = await removeItemFromCart(id);
    if (result.message === 'ok') {
      if (result.cartItems.length === 0) {
        setCartEmpty(true);
        setCartTotal(result.cartTotal);
        setData([]);
        return;
      }
      setData(data => data.filter(item => item.id !== id));
      setCartTotal(result.cartTotal);
    }
  };
  React.useEffect(() => {
    getCartItems().then(items => {
      if (items.cartItems.length === 0) {
        setCartEmpty(true);
        setLoading(false);
        setData(items.cartItems);
        setCartTotal(items.cartTotal);
        return;
      }
      setData(items.cartItems);
      setCartTotal(items.cartTotal);
      setLoading(false);
    });
  });
  return (
    <Layout>
      <Helmet>
        <title>Cart | MRG</title>
      </Helmet>
      <div className="px-4 py-2 max-w-default mx-auto">
        <div className=" cart  ">
          <div className=" cart__container ">
            {loading && (
              <ContentLoader
                speed={3}
                viewBox="0 0 400 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                rtl={locale === 'ar'}
                style={{ alignSelf: 'flex-start' }}
              >
                <rect x="0" y="0" rx="1" ry="1" width="22%" height="56" />
                <rect x="23%" y="0" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="20px" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="40px" rx="1" ry="1" width="77%" height="16" />
                <rect x="0" y="65" rx="1" ry="1" width="22%" height="56" />
                <rect x="23%" y="65" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="85" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="105" rx="1" ry="1" width="77%" height="16" />
                <rect x="0" y="130" rx="1" ry="1" width="22%" height="56" />
                <rect x="23%" y="130" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="150" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="170" rx="1" ry="1" width="77%" height="16" />
              </ContentLoader>
            )}

            {!loading && (
              <>
                {cartEmpty && (
                  <div className=" flex">
                    <img src={cartBag} alt="Empty Cart Bag" className=" h-32" />
                    <div className="mx-5">
                      <h1 className="text-2xl font-bold ">
                        {formatMessage({ id: 'cart-empty' })}
                      </h1>
                      <Link
                        to={`/${locale}`}
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
                {!cartEmpty && (
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
                {!cartEmpty && (
                  <div className=" flex flex-col">
                    <TransitionGroup component={null}>
                      {data.map((item, i) => {
                        return (
                          <CSSTransition
                            key={i}
                            classNames="cart-item__trans"
                            timeout={500}
                            unmountOnExit
                          >
                            <CartItem
                              item={item}
                              handleRemoveItem={handleRemoveItem}
                              loadingRemoveFromCartButton={
                                loadingRemoveFromCartButton
                              }
                            />
                          </CSSTransition>
                        );
                      })}
                    </TransitionGroup>
                  </div>
                )}
                {!cartEmpty && (
                  <div className="flex justify-end p-2 rounded mt-2 border bg-gray-100">
                    <h1 className="text-lg font-semibold">
                      {formatMessage({ id: 'subtotal' })} ({cartItems.length}{' '}
                      {cartItems.length === 1 ? 'item' : 'items'}) : {cartTotal}{' '}
                      KD
                    </h1>
                  </div>
                )}
                <h1 className="text-sm my-4">
                  {formatMessage({ id: 'cart-tos' })}
                </h1>
              </>
            )}
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
            {loading && (
              <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
                <ContentLoader
                  speed={3}
                  viewBox="0 0 400 115"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  rtl={locale === 'ar'}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="53" />
                  <rect x="0" y="62" rx="5" ry="5" width="100%" height="53" />
                </ContentLoader>
              </div>
            )}
            {!loading && !cartEmpty && (
              <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
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
                  {formatMessage({ id: 'checkout' })}
                </button>
              </div>
            )}
            {loading && (
              <div className="border rounded p-2 bg-gray-100">
                <ContentLoader
                  speed={3}
                  viewBox="0 0 400 680"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  rtl={locale === 'ar'}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <rect x="0" y="0" rx="5" ry="5" width="30%" height="120" />
                  <rect x="32%" y="0" rx="5" ry="5" width="100%" height="35" />
                  <rect x="32%" y="40" rx="5" ry="5" width="100%" height="35" />
                  <rect x="32%" y="80" rx="5" ry="5" width="100%" height="38" />

                  <rect x="0" y="140" rx="5" ry="5" width="30%" height="120" />
                  <rect
                    x="32%"
                    y="140"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="180"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="220"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="38"
                  />

                  <rect x="0" y="280" rx="5" ry="5" width="30%" height="120" />
                  <rect
                    x="32%"
                    y="280"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="320"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="360"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="38"
                  />
                  <rect x="0" y="420" rx="5" ry="5" width="30%" height="120" />
                  <rect
                    x="32%"
                    y="420"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="460"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="500"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="38"
                  />

                  <rect x="0" y="560" rx="5" ry="5" width="30%" height="120" />
                  <rect
                    x="32%"
                    y="560"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="600"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="35"
                  />
                  <rect
                    x="32%"
                    y="640"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="38"
                  />
                </ContentLoader>
              </div>
            )}
            {!loading && (
              <div className="border rounded p-2 bg-gray-100">
                {visitedItems.length > 4 ? (
                  <RecentlyViewedVertical visitedItems={visitedItems} />
                ) : (
                  <FeaturedItemsVertical />
                )}
              </div>
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
