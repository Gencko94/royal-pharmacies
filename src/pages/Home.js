import React from 'react';
import LazyLoad from 'react-lazyload';
import MainCarousel from '../components/Home/MainCarousel';

import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import { useMediaQuery } from 'react-responsive';
import Layout from '../components/Layout';
import { useQuery } from 'react-query';
import { getHomeItems } from '../Queries/Queries';
import StaticSwiper from '../components/Swipers/StaticSwiper';
import SwiperLoader from '../components/Home/SwiperLoader';
import { AnimatePresence, motion } from 'framer-motion';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import DealsSwiper from '../components/Swipers/DealsSwiper';

export default function Home() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  /**
   * Main Fetch
   */

  const { data, isLoading } = useQuery('homeShowcase', getHomeItems, {
    retry: true,
    refetchOnWindowFocus: false,
  });
  const { locale } = useIntl();
  const [cartMenuOpen, setCartMenu] = React.useState(false);
  const setCartMenuOpen = () => {
    setCartMenu(true);
  };
  const resolveSwiper = (item, index) => {
    switch (item.type) {
      case 'best_seller':
        return (
          <StaticSwiper
            key={index}
            type={item.type}
            title={item[`title_${locale}`]}
            cb={setCartMenuOpen}
          />
        );
      case 'product_by_category':
        return (
          <StaticSwiper
            key={index}
            type={item.key}
            id={item.id}
            title={item[`title_${locale}`]}
            cb={setCartMenuOpen}
          />
        );
      case 'categories':
        return (
          <StaticSwiper
            key={index}
            id={item.id}
            type={item.slug}
            title={item[`title_${locale}`]}
            cb={setCartMenuOpen}
          />
        );
      case 'latest_products':
        return (
          <StaticSwiper
            key={index}
            type={item.type}
            title={item[`title_${locale}`]}
            cb={setCartMenuOpen}
          />
        );
      case 'banner':
        return (
          <LazyLoad offset={500} key={index}>
            <div className="my-16">
              <Banner
                url={
                  isTabletOrAbove
                    ? item.data.banner_desktop.link
                    : item.data.banner_mobile.link
                }
              />
            </div>
          </LazyLoad>
        );

      default:
        return null;
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>MRG Mall Online Shop | متجر إم آر جي الإلكتروني</title>
      </Helmet>
      <div
        className={`mb-5 overflow-hidden bg-body-light text-body-text-light`}
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        <AnimatePresence>
          {cartMenuOpen &&
            (isTabletOrAbove ? (
              <SideCartMenu key="side-cart" setSideMenuOpen={setCartMenu} />
            ) : (
              <SideCartMenuMobile key={998} setSideMenuOpen={setCartMenu} />
            ))}
          {cartMenuOpen && (
            <motion.div
              key="sidecart-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartMenu(false)}
              className="side__addCart-bg"
            ></motion.div>
          )}
        </AnimatePresence>
        <div
          className={`px-2 py-4 sm:px-2 md:px-4 lg:px-8  mx-auto max-w-default`}
        >
          <MainCarousel />
          <Categories />
          {/* <DealsSwiper /> */}
          <StaticSwiper
            type="latest_products"
            title={'New Arrivals'}
            cb={setCartMenuOpen}
          />

          {isLoading && (
            <div className="my-8">
              <SwiperLoader />
            </div>
          )}
          {isLoading && (
            <div className="my-8">
              <SwiperLoader />
            </div>
          )}
          {isLoading && (
            <div className="my-8">
              <SwiperLoader />
            </div>
          )}
          {!isLoading && data?.map((i, index) => resolveSwiper(i, index))}
        </div>
      </div>
    </Layout>
  );
}
