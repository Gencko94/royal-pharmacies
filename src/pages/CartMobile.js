import React from 'react';
import { DataProvider } from '../contexts/DataContext';
import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import LayoutMobile from '../components/LayoutMobile';
import { useIntl } from 'react-intl';
import CartItemMobile from '../components/CartMobile/CartItemMobile';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CheckoutButton from '../components/CartMobile/CheckoutButton';
import CartEmpty from '../components/CartMobile/CartEmpty';
import MainContentLoader from '../components/CartMobile/ContentLoaders/MainContentLoader';

export default function CartMobile() {
  const { formatMessage } = useIntl();
  const {
    removeItemFromCart,
    phone,
    isLightTheme,
    getCartItems,
  } = React.useContext(DataProvider);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [cartEmpty, setCartEmpty] = React.useState(false);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [
    loadingRemoveFromCartButton,
    setLoadingRemoveFromCartButton,
  ] = React.useState(null);

  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const handleRemoveItem = async id => {
    setLoadingRemoveFromCartButton(id);
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
  }, [getCartItems]);
  return (
    <LayoutMobile>
      <div className=" py-1 px-2">
        {!loading && !cartEmpty && (
          <CheckoutButton data={data} cartTotal={cartTotal} />
        )}
        {loading && <MainContentLoader />}
        {!loading && cartEmpty && <CartEmpty />}

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
                    loadingRemoveFromCartButton={loadingRemoveFromCartButton}
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
