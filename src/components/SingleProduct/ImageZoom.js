import React from 'react';

import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useIntl } from 'react-intl';
SwiperCore.use([Thumbs, Navigation, Zoom]);

export default function ImageZoom({ data }) {
  const { formatMessage } = useIntl();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { locale } = useIntl();
  const [doubleClicked, setDoubleClicked] = React.useState(false);

  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <div className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}>
        <Swiper
          zoom
          id="main"
          slidesPerView={1}
          onDoubleClick={() => setDoubleClicked(true)}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {[data.image, ...data.gallery].map(item => {
            return (
              <SwiperSlide className="relative" id="slide" zoom key={item?.id}>
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}`}
                  alt={data.translation[locale].title}
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
      </div>
      <div
        className={`absolute top-0  ${locale === 'ar' ? 'right-0' : 'left-0'}`}
      >
        <Swiper
          id="thumbs"
          onSwiper={setThumbsSwiper}
          direction="vertical"
          slidesPerView="auto"
          freeMode={true}
          spaceBetween={10}
          watchSlidesVisibility
          watchSlidesProgress
        >
          {[data.image, ...data.gallery].map((item, i) => {
            return (
              <SwiperSlide key={item?.id}>
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/small/${item?.link}`}
                  alt={data.translation[locale].title}
                  style={{ width: '50px', height: '50px' }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
