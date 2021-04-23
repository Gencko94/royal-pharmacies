import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

import { getDeals } from '../../Queries/Queries';
import { useQuery } from 'react-query';
import DealsSwiperLoader from './DealsSwiperLoader';

import { Link } from 'react-router-dom';
import ErrorSnackbar from '../ErrorSnackbar';
SwiperCore.use([Navigation]);
export default function DealsSwiper() {
  const { formatMessage, locale } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const closeError = () => {
    setErrorOpen(false);
  };
  const { data, isLoading, isIdle } = useQuery(['deals'], getDeals, {
    retry: true,
    refetchOnWindowFocus: false,
  });

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.75,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 5.5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 6.5,
      spaceBetween: 20,
    },
  };

  return (
    <div className="my-8">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      {(isLoading || isIdle) && (
        <div className="mb-4 " style={{ height: '20px' }}></div>
      )}
      {(isLoading || isIdle) && <DealsSwiperLoader />}
      {/* <DealsSwiperLoader /> */}
      {!isLoading && !isIdle && (
        <div className="flex items-center mb-4">
          <h1 className="text-2xl  flex-1 font-bold ">
            {formatMessage({ id: 'deals' })}
          </h1>
        </div>
      )}
      {!isLoading && !isIdle && (
        <Swiper
          navigation
          freeMode
          id="main"
          spaceBetween={10}
          // centeredSlides
          // centeredSlidesBounds
          centerInsufficientSlides
          breakpoints={breakpoints}
        >
          {data.map(item => {
            return (
              <SwiperSlide
                key={item.id}
                className={`overflow-hidden   relative my-2 rounded`}
              >
                <Link
                  to={`/${locale}/category/${item.category?.slug}/${item.category?.id}?offers=t`}
                >
                  <img
                    src={item.banner_mobile.medium_image}
                    alt={`${item.category?.translation.en.name} Deals`}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
