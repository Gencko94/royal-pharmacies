import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useInfiniteQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { scrollTo } from 'scroll-js';
import CategoryItemLoader from '../components/Category/CategoryItemLoader';
import CategoryProductItem from '../components/Category/CategoryProductItem';
import VariantCategoryProductItem from '../components/Category/VariantCategoryProductItem';
import Layout from '../components/Layout';
import MobileCartPopup from '../components/MobileCartPopup/MobileCartPopup';
import { AuthProvider } from '../contexts/AuthContext';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { DataProvider } from '../contexts/DataContext';
import { getSingleBrandProducts } from '../Queries/Queries';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function SingleBrandMobile() {
  const { userId } = useContext(AuthProvider);
  const { cartItems, guestCartItems } = useContext(CartAndWishlistProvider);
  const { formatMessage, locale } = useIntl();
  const { slug } = useParams();
  const {
    deliveryCountriesLoading,
    deliveryCountriesIdle,
    settings,
    mobileCartPopupOpen,
    sideMenuOpen,
  } = React.useContext(DataProvider);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });

  const checkShowCondition = () => {
    if (isTabletOrAbove) return false;
    if (sideMenuOpen) return false;
    if (userId) {
      if (cartItems?.length > 0) {
        return true;
      }
    } else {
      if (guestCartItems?.length > 0) {
        return true;
      } else if (mobileCartPopupOpen) {
        return true;
      }
    }
    return false;
  };

  const {
    data,
    isLoading: productsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['single-brand', { slug, number: 42 }],
    ({ pageParam }) => getSingleBrandProducts({ slug, number: 42, pageParam }),
    {
      retry: true,

      getNextPageParam: lastPage => {
        if (lastPage.currentPage < lastPage.pageCount) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  console.log(hasNextPage);
  if (productsLoading || deliveryCountriesLoading || deliveryCountriesIdle) {
    return (
      <div
        key="loader"
        className="brand-grid__mobile py-2"
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
          return <CategoryItemLoader key={i} />;
        })}
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen p-3">
        <Helmet>
          <title>
            {data
              ? `${data.pages[0].brandName[locale].name}`
              : settings?.store_name_en}
          </title>
          <meta
            name="description"
            content={
              data
                ? `${formatMessage({ id: 'shop' })} ${
                    data.pages[0]?.brandName?.[locale].name
                  }`
                : settings?.store_name_en
            }
          />
          <meta
            property="og:title"
            content={
              data
                ? `${data.pages[0].brandName[locale].name} }`
                : settings?.store_name_en
            }
          />
          <meta
            property="og:description"
            content={
              data
                ? `${formatMessage({ id: 'shop' })} ${
                    data.pages[0]?.brandName?.[locale].name
                  }`
                : settings?.store_name_en
            }
          />
        </Helmet>
        <AnimatePresence>
          {cartMenuOpen && (
            <motion.div
              key="sidecart-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartMenuOpen(false)}
              className="side__addCart-bg"
            ></motion.div>
          )}

          {!productsLoading && (
            <div
              key="header"
              className="flex justify-center flex-col items-center"
            >
              <h1 className="font-bold text-xl mb-3">
                {formatMessage({ id: 'shop-brands' })}{' '}
                {data?.pages[0].brandName?.[locale].name}
              </h1>
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${data?.pages[0].brandLogo}`}
                alt={data?.pages[0].brandName?.[locale].name}
                style={{ maxHeight: '150px', width: 'auto' }}
              />
            </div>
          )}
          <div
            key="items"
            className="brand-grid__mobile py-2 min-h-full"
            style={{ minHeight: 'calc(100vh - 150px)' }}
          >
            {data?.pages.map((group, i) => {
              return (
                <React.Fragment key={i}>
                  {group?.products.map(item => {
                    return item.type === 'variation' &&
                      Object.keys(item.new_variation_addons).length > 0 ? (
                      <VariantCategoryProductItem
                        key={item.id}
                        setCartMenuOpen={setCartMenuOpen}
                        item={item}
                      />
                    ) : (
                      <CategoryProductItem
                        key={item.id}
                        setCartMenuOpen={setCartMenuOpen}
                        item={item}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
      {data && hasNextPage && (
        <div className="flex my-2 justify-center">
          <button
            className="p-2 w-40 text-lg font-semibold flex items-center justify-center rounded bg-main-color text-main-text"
            onClick={() => {
              fetchNextPage();
            }}
          >
            {isFetchingNextPage ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={27}
                width={27}
                visible={true}
              />
            ) : (
              formatMessage({ id: 'show-more' })
            )}
          </button>
        </div>
      )}
      <AnimatePresence>
        {checkShowCondition() && <MobileCartPopup />}
      </AnimatePresence>
    </Layout>
  );
}
