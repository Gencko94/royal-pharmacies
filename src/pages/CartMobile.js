import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataProvider } from '../contexts/DataContext';
import cartEmptyimg from '../assets/illustrations/cartEmpty.png';
import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import ItemsSlider from '../components/Home/ItemsSlider';
import LayoutMobile from '../components/LayoutMobile';
import { useIntl } from 'react-intl';
import CartItemMobile from '../components/CartMobile/CartItemMobile';
import ContentLoader from 'react-content-loader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function CartMobile() {
  const history = useHistory();
  const { locale, formatMessage } = useIntl();
  const {
    cartItems,
    removeItemFromCart,
    phone,
    isLightTheme,
    getCartItems,
  } = React.useContext(DataProvider);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [cartEmpty, setCartEmpty] = React.useState(false);
  const [cartTotal, setCartTotal] = React.useState(0);

  // const calculateItemsPrice = cartItems => {
  //   let price = 0;
  //   cartItems.forEach(item => {
  //     price = price + item.quantity * item.price;
  //   });
  //   return price;
  // };
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const handleRemoveItem = async id => {
    const result = await removeItemFromCart(id);
    if (result.message === 'ok') {
      if (result.cartItems.length === 0) {
        setCartEmpty(true);
        setData([]);
        setCartTotal(result.cartTotal);
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
        setCartTotal(items.cartTotal);
        return;
      }
      setData(items.cartItems);
      setCartTotal(items.cartTotal);
      setLoading(false);
    });
  });
  return (
    <LayoutMobile>
      <div className=" py-1 px-2">
        <div className="py-1 px-2 bg-white cart__checkout-sticky z-5 mb-2 border-b -mx-3">
          {loading && (
            <ContentLoader
              speed={3}
              viewBox="0 0 400 80"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="100%" height="35" />
              <rect x="0" y="40" rx="3" ry="3" width="100%" height="35" />
            </ContentLoader>
          )}
          {!loading && !cartEmpty && (
            <>
              <h1 className="text-lg font-semibold mb-1 ">
                Subtotal ({cartItems.length}{' '}
                {cartItems.length === 1 ? 'item' : 'items'}) :{' '}
                <span className="text-red-700 font-bold">{cartTotal} KD</span>
              </h1>
              <button
                onClick={() =>
                  history.push(`/${locale}/checkout/quickcheckout`)
                }
                className="p-2 rounded font-semibold   w-full text-gray-100 bg-green-600"
              >
                {formatMessage({ id: 'checkout' })}
              </button>
            </>
          )}
        </div>
        {loading && (
          <ContentLoader
            speed={3}
            viewBox="0 0 400 450"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            rtl={locale === 'ar'}
          >
            <rect x="0" y="0" rx="1" ry="1" width="28%" height="85" />
            <rect x="30%" y="0" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="30px" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="60px" rx="1" ry="1" width="77%" height="25" />

            <rect x="0" y="105" rx="1" ry="1" width="28%" height="85" />
            <rect x="30%" y="105" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="135" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="165" rx="1" ry="1" width="77%" height="25" />

            <rect x="0" y="210" rx="1" ry="1" width="28%" height="85" />
            <rect x="30%" y="210" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="240" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="270" rx="1" ry="1" width="77%" height="25" />

            <rect x="0" y="315" rx="1" ry="1" width="28%" height="85" />
            <rect x="30%" y="315" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="345" rx="1" ry="1" width="77%" height="25" />
            <rect x="30%" y="375" rx="1" ry="1" width="77%" height="25" />
          </ContentLoader>
        )}
        {!loading && cartEmpty && (
          <div>
            <div className="p-2 flex flex-col justify-center">
              <div className="flex items-center justify-center">
                <img
                  src={cartEmptyimg}
                  alt="Empty Cart Bag"
                  className="h-auto"
                  style={{ maxWidth: '80%' }}
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold  ">
                  {formatMessage({ id: 'cart-empty' })}
                </h1>
                <Link to="/" className="text-sm text-blue-600 hover:underline">
                  {formatMessage({ id: 'check-today-deals' })}
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center p-2">
              <Link
                to={`/${locale}/app/login`}
                className={`  text-center rounded p-2 bg-green-700 text-second-nav-text-light `}
              >
                {formatMessage({ id: 'login' })}
              </Link>
              <Link
                to={`/${locale}/app/register`}
                className={` text-center  rounded p-2 bg-blue-700 text-second-nav-text-light mt-2 `}
              >
                {formatMessage({ id: 'register' })}
              </Link>
            </div>
          </div>
        )}

        {!loading && !cartEmpty && (
          <div className="mb-2">
            <TransitionGroup>
              {data.map((item, i) => (
                <CSSTransition
                  key={i}
                  classNames="cart-item__trans"
                  timeout={500}
                  unmountOnExit
                >
                  <CartItemMobile
                    key={i}
                    item={item}
                    handleRemoveItem={handleRemoveItem}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        )}

        <h1 className="text-xs my-2 px-2">
          {formatMessage({ id: 'cart-tos' })}
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
    </LayoutMobile>
  );
}
