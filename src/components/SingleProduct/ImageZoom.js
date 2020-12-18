import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';
import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useIntl } from 'react-intl';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function ImageZoom({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { locale } = useIntl();

  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <div className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}>
        <Swiper id="main" slidesPerView={1} thumbs={{ swiper: thumbsSwiper }}>
          {[data.image, ...data.gallery].map(item => {
            return (
              <SwiperSlide key={item?.id}>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: 'Wristwatch by Ted Baker London',
                      isFluidWidth: true,
                      src: `${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}`,
                    },
                    largeImage: {
                      src: `${process.env.REACT_APP_IMAGES_URL}/medium/${item?.link}`,
                      width: 600,
                      height: 600,
                    },
                    enlargedImagePosition: 'over',
                  }}
                />
                {/* <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}`}
                  alt={data.translation[locale].title}
                /> */}
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
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}`}
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
