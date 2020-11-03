import React from 'react';

import {} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import { TiShoppingCart } from 'react-icons/ti';
import InView, { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import ContentLoader from 'react-content-loader';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import LayoutMobile from '../components/LayoutMobile';
import ImageZoomMobile from '../components/SingleProductMobile/ImageZoomMobile';
import { useIntl } from 'react-intl';
import ItemDescription from '../components/SingleProductMobile/ItemDescription';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

export default function SingleProductMobile({
  match: {
    params: { id, name },
  },
}) {
  const {
    addItemToCart,

    removeItemFromCart,
    deliveryCountry,
    getSingleItemDetails,
    isItemInCart,
    allItems,
  } = React.useContext(DataProvider);

  const items = allItems.filter(item => item.id === id);

  const [detailsTab, setDetailsTab] = React.useState(0);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [related, setRelated] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [loading, setLoading] = React.useState(true);
  const [itemInCart, setItemInCart] = React.useState(false);
  const [cartItems, setCartItems] = React.useState(null);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [cartEmpty, setCartEmpty] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const { formatMessage, locale } = useIntl();

  const [triggerRef, inView] = useInView();

  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleLoadMore = inView => {
    if (inView) {
      if (hasMore) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };
  const fetchData = () => {
    setTimeout(() => {
      setRelated(relatedData);

      setFetching(false);
    }, 2000);
  };
  /*
  {entry}
  */

  React.useEffect(() => {
    getSingleItemDetails(id).then(item => {
      console.log(item);
      setData(item);

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    isItemInCart(id).then(res => {
      if (res.message === 'yes') {
        setItemInCart(true);
        setAddToCartButtonLoading(false);
      } else {
        setItemInCart(false);
        setAddToCartButtonLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddToCart = async ({ id, quantity }) => {
    setAddToCartButtonLoading(true);
    const result = await addItemToCart({
      id,
      quantity,
      price: data.price,
      name: data.name,
      photo: data.photos.small,
    });
    if (result.message === 'ok') {
      setAddToCartButtonLoading(false);
      setItemInCart(true);
      setCartItems(result.cartItems);
      setSideMenuOpen(true);
      setCartTotal(result.cartTotal);
      setCartEmpty(false);
    }
  };
  const handleRemoveFromCart = async id => {
    if (id === data.id) {
      setAddToCartButtonLoading(true);
    }
    const result = await removeItemFromCart(id);
    if (result.message === 'ok') {
      if (id === data.id) {
        setAddToCartButtonLoading(false);
        setItemInCart(false);
      }
      if (sideMenuOpen) {
        setCartItems(result.cartItems);
        setCartTotal(result.cartTotal);
        if (result.cartItems.length === 0) {
          setCartEmpty(true);
        }
      }
    }
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <LayoutMobile>
      <Helmet>
        <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`${name.split('-').join(' ')} | MRG`}
        />
      </Helmet>
      <div className="overflow-hidden">
        <CSSTransition
          timeout={300}
          classNames={`${
            locale === 'ar'
              ? 'ar-add-to-cart__sideMenu'
              : 'en-add-to-cart__sideMenu'
          }`}
          unmountOnExit
          in={sideMenuOpen}
        >
          <SideCartMenuMobile
            cartItems={cartItems}
            cartTotal={cartTotal}
            setSideMenuOpen={setSideMenuOpen}
            handleRemoveFromCart={handleRemoveFromCart}
            cartEmpty={cartEmpty}
          />
        </CSSTransition>

        <div className="">
          {loading && (
            <ContentLoader
              speed={2}
              viewBox="0 0 420 480"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          )}
          {!loading && (
            <ImageZoomMobile
              data={{ images: data.photos.main, name: data.name }}
            />
          )}
          <hr />
          <div className="flex flex-col w-full  px-3 py-2 bg-white">
            {loading && (
              <ContentLoader
                speed={2}
                viewBox="0 0 480 470"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
                <rect x="0" y="60" rx="5" ry="5" width="90%" height="40" />
                <rect x="0" y="120" rx="5" ry="5" width="80%" height="40" />
                <rect x="0" y="180" rx="5" ry="5" width="70%" height="35" />
                <rect x="0" y="240" rx="5" ry="5" width="60%" height="35" />
                <rect x="0" y="300" rx="5" ry="5" width="40%" height="35" />
                <rect x="0" y="360" rx="5" ry="5" width="60%" height="35" />
                <rect x="0" y="420" rx="5" ry="5" width="40%" height="35" />
              </ContentLoader>
            )}
            {!loading && (
              <ItemDescription
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                deliveryCountry={deliveryCountry}
                data={{
                  price: data.price,
                  priceBefore: data.priceBefore,
                  name: data.name,
                  id: data.id,
                }}
                itemInCart={itemInCart}
                addToCartButtonLoading={addToCartButtonLoading}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            )}
            <hr />

            <div className="relative  ">
              {loading && (
                <ContentLoader
                  speed={2}
                  viewBox="0 0 480 100"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="20" rx="5" ry="5" width="100%" height="25" />
                  <rect x="0" y="60" rx="5" ry="5" width="49%" height="25" />
                  <rect x="50%" y="60" rx="5" ry="5" width="50%" height="25" />
                </ContentLoader>
              )}
            </div>
          </div>
        </div>
        <div>
          <div id="details" className="py-2">
            <h1 className="text-xl font-semibold mb-1 px-3">Product Details</h1>
            <div className="flex justify-center mb-2">
              <button
                onClick={() => setDetailsTab(0)}
                className={`text-lg py-2 flex-1 text-center   ${
                  detailsTab === 0 && 'border-red-700 border-b-2 text-red-700'
                }   bg-gray-400`}
              >
                Description
              </button>

              <button
                onClick={() => setDetailsTab(1)}
                className={`text-lg py-2 flex-1 text-center   ${
                  detailsTab === 1 && 'border-red-700 border-b-2 text-red-700'
                }   bg-gray-400`}
              >
                Specifications
              </button>
            </div>
            <div className="px-3 text-sm">{items[0].description}</div>
          </div>
        </div>
        <CSSTransition
          in={inView}
          timeout={200}
          unmountOnExit={true}
          classNames="floating-cart-button"
        >
          <div className={`floating-button border-t bg-second-nav-text-light`}>
            <div className=" flex items-center justify-center flex-1">
              <button onClick={handleSubstractQuantity} className="p-1 mr-2">
                <AiOutlineMinusCircle
                  className={`w-6 h-6 ${
                    quantity === 1 ? 'text-gray-700' : 'text-blue-700'
                  }`}
                />
              </button>
              <span className="mx-2">{quantity}</span>
              <button onClick={handleAddQuantity} className="p-1">
                <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
              </button>
            </div>
            <div className="p-1 text-center">
              {quantity * items[0].price} KD
            </div>
            {isItemInCart() ? (
              <button
                onClick={() => handleRemoveFromCart(id)}
                className="text-sm bg-red-700 text-gray-100  flex-1  py-1 px-2 rounded   flex items-center justify-center font-semibold "
              >
                <span>
                  <TiShoppingCart className="w-25p h-25p" />
                </span>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-cart' })}
                </h1>
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(data.id, quantity)}
                className="text-sm bg-blue-700 text-gray-100 flex-1  py-1 px-2 rounded  flex items-center justify-center font-semibold"
              >
                <span>
                  <TiShoppingCart className="w-25p h-25p" />
                </span>
                <h1 className=" mx-2">
                  {formatMessage({ id: 'add-to-cart' })}
                </h1>
              </button>
            )}
          </div>
        </CSSTransition>
        <hr />
        <div ref={triggerRef}>
          {related && <RelatedItems relatedData={related} />}
          {isFetching && <div>Loading ...</div>}
          <InView
            as="div"
            onChange={(inView, entry) => {
              handleLoadMore(inView);
            }}
          >
            <div></div>
          </InView>
        </div>
      </div>
    </LayoutMobile>
  );
}
