import React from 'react';
import { useIntl } from 'react-intl';

import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function ImageZoomMobile({ data }) {
  const { locale } = useIntl();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { formatMessage } = useIntl();
  const [doubleClicked, setDoubleClicked] = React.useState(false);

  return (
    <div className="mb-2">
      <Swiper
        zoom
        id="main"
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        onDoubleClick={() => setDoubleClicked(true)}
        className="mb-4"
      >
        {[data.image, ...data.gallery].map(item => {
          return (
            <SwiperSlide className="relative" zoom key={item?.id}>
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}`}
                alt={data.full_translation[locale].title}
                style={{ maxHeight: '400px', width: 'auto' }}
              />
              {!doubleClicked && (
                <div
                  className="absolute bottom-10 p-2 shadow rounded font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                >
                  {formatMessage({ id: 'double-click-zoom' })}
                </div>
              )}
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
            <SwiperSlide className="px-2" key={item.id}>
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.link}`}
                alt={data.full_translation[locale].title}
                style={{ width: '50px', height: '50px' }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
