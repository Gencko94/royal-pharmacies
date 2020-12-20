import React from 'react';
import Helmet from 'react-helmet';
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
          <LazyLoad key={index} height="calc(100% * 1285/492.92)" offset={200}>
            <StaticSwiper type={item.key} />
          </LazyLoad>
        );
      case 'product_by_category':
        return (
          <LazyLoad key={index} offset={200} height="calc(100% * 1285/492.92)">
            <StaticSwiper
              type={item.key}
              title={item[`title_${locale}`]}
              cb={setCartMenuOpen}
            />
          </LazyLoad>
        );
      case 'banner':
        return (
          <LazyLoad offset={200} key={index}>
            <Banner
              url={
                isTabletOrAbove
                  ? item.data.banner_desktop.link
                  : item.data.banner_mobile.link
              }
            />
          </LazyLoad>
        );

      default:
        return null;
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>MRG</title>
        <meta
          name="description"
          content="MRG is the Kuwait homegrown online marketplace. Buy your favourate fashion, beauty, home appliances"
        />
      </Helmet>
      <div
        className={`mb-5 overflow-hidden bg-body-light text-body-text-light
        `}
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
          className={` bg-body-light text-body-text-light mt-0 px-2 py-4 sm:px-2 md:px-4 lg:px-8  mx-auto max-w-default`}
        >
          <MainCarousel />
          <Categories />
          <StaticSwiper
            type="men-clothing"
            title={'Men Clothing'}
            cb={setCartMenuOpen}
          />
          <StaticSwiper
            type="home-kitchen"
            title={'Home & Kitchen'}
            cb={setCartMenuOpen}
          />
          {isLoading && <SwiperLoader />}
          {isLoading && <SwiperLoader />}
          {isLoading && <SwiperLoader />}
          {!isLoading && data.map((i, index) => resolveSwiper(i, index))}
          {!isLoading && data.map((i, index) => resolveSwiper(i, index))}
        </div>
      </div>
    </Layout>
  );
}
