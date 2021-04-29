import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

import { getStaticSwiperData } from '../../Queries/Queries';
import { useQuery } from 'react-query';
import SwiperLoader from '../Home/SwiperLoader';
import SwiperItem from './SwiperItem';
import VariantSwiperItem from './VariantSwiperItem';
import { Link } from 'react-router-dom';
import ErrorSnackbar from '../ErrorSnackbar';
import { useInView } from 'react-intersection-observer';
SwiperCore.use([Navigation]);
export default function StaticSwiper({ type, cb, title, id }) {
  const { formatMessage, locale } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { inView, ref } = useInView({ threshold: 0.1 });
  const closeError = () => {
    setErrorOpen(false);
  };
  const { data, isLoading, isIdle } = useQuery(
    ['staticSwiper', type],
    getStaticSwiperData,
    { retry: true, refetchOnWindowFocus: false, enabled: inView }
  );

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };

  return (
    <div ref={ref} className="my-8">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      {(isLoading || isIdle) && (
        <div className="mb-4 " style={{ height: '30px' }}></div>
      )}
      {(isLoading || isIdle) && <SwiperLoader />}
      {!isLoading && !isIdle && (
        <div className="flex items-center mb-4">
          <h1 className="text-2xl  flex-1 font-bold ">
            {data?.title[locale]?.name}
          </h1>
          {type !== 'latest_products' && type !== 'best_seller' && (
            <Link
              to={`/${locale}/category/${data?.slug}/${id}`}
              className="py-1 px-2  bg-main-color text-second-nav-text-light rounded whitespace-no-wrap"
              style={{ fontWeight: '900' }}
            >
              {formatMessage({ id: 'seeAll' })}
            </Link>
          )}
        </div>
      )}
      {!isLoading && !isIdle && (
        <Swiper
          freeMode
          navigation
          id="main"
          spaceBetween={5}
          breakpoints={breakpoints}
        >
          {data.products.map(item => {
            return (
              <SwiperSlide
                key={item.id}
                className={`overflow-hidden   relative my-2 rounded`}
              >
                {item.type === 'variation' &&
                Object.keys(item.new_variation_addons).length > 0 ? (
                  <VariantSwiperItem
                    item={item}
                    setCartMenuOpen={cb}
                    setErrorMessage={setErrorMessage}
                    setErrorOpen={setErrorOpen}
                  />
                ) : (
                  <SwiperItem
                    item={item}
                    setCartMenuOpen={cb}
                    setErrorMessage={setErrorMessage}
                    setErrorOpen={setErrorOpen}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
