import React from 'react';
import { useIntl } from 'react-intl';
// import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function ImageZoomMobile({ data }) {
  const { locale } = useIntl();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  return (
    <div className="mb-2">
      <Swiper id="main" slidesPerView={1} thumbs={{ swiper: thumbsSwiper }}>
        {[data.image, ...data.gallery].map(item => {
          return (
            <SwiperSlide key={item.id}>
              <LazyImage
                pb="calc(100% * 681/500)"
                src={`${process.env.REACT_APP_IMAGES_URL}/medium/${item.link}`}
                alt={data.translation[locale].title}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        id="thumbs"
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        freeMode={true}
        spaceBetween={10}
        watchSlidesVisibility
        watchSlidesProgress
      >
        {[data.image, ...data.gallery].map(item => {
          return (
            <SwiperSlide key={item.id}>
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.link}`}
                alt={data.translation[locale].title}
                style={{ width: '50px', height: '50px' }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
