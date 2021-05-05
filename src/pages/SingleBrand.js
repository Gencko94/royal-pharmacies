import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { scrollTo } from 'scroll-js';
import CategoryItemLoader from '../components/Category/CategoryItemLoader';
import CategoryProductItem from '../components/Category/CategoryProductItem';
import VariantCategoryProductItem from '../components/Category/VariantCategoryProductItem';
import Layout from '../components/Layout';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { DataProvider } from '../contexts/DataContext';
import { getSingleBrandProducts } from '../Queries/Queries';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function SingleBrand() {
  const { formatMessage, locale } = useIntl();
  const { slug } = useParams();
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);

  const {
    deliveryCountriesLoading,
    deliveryCountriesIdle,
    settings,
  } = React.useContext(DataProvider);
  const {
    data,
    isLoading: productsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['single-brand', { slug, number: 42 }],
    ({ pageParam }) => getSingleBrandProducts({ slug, number: 42, pageParam }),
    {
      retry: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      getNextPageParam: lastPage => {
        if (lastPage.currentPage < lastPage.pageCount) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  return (
    <Layout>
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
          <SideCartMenu key="side-cart" setSideMenuOpen={setCartMenuOpen} />
        )}
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
      </AnimatePresence>
      <div
        className="max-w-default mx-auto p-4 overflow-hidden"
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        {!productsLoading && (
          <div className="flex justify-center flex-col items-center">
            <h1 className="font-bold text-2xl mb-3">
              {formatMessage({ id: 'shop-brands' })}{' '}
              {data?.pages[0].brandName?.[locale].name}
            </h1>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${data?.pages[0]?.brandLogo}`}
              alt={data?.pages[0].brandName?.[locale].name}
              style={{ maxHeight: '200px', width: 'auto' }}
            />
          </div>
        )}

        {(productsLoading ||
          deliveryCountriesLoading ||
          deliveryCountriesIdle) && (
          <div className="brand-grid__desktop py-2 ">
            {[
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
            ].map(i => {
              return <CategoryItemLoader key={i} />;
            })}
          </div>
        )}
        <div className="brand-grid__desktop py-2 ">
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
    </Layout>
  );
}
