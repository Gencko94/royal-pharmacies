import React from 'react';

import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useIntl } from 'react-intl';
import LazyImage from '../../../helpers/LazyImage';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function VariantImageZoom({
  data,
  selectedVariation,
  selectedOption,
}) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { formatMessage } = useIntl();
  const [doubleClicked, setDoubleClicked] = React.useState(false);

  const { locale } = useIntl();
  const resolveImage = () => {
    if (data.new_variation_addons[selectedVariation].options) {
      return (
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${
            data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || data.image?.link
          }`}
          alt={data.full_translation[locale].title}
          style={{ maxHeight: '400px', width: 'auto' }}
        />
      );
    } else {
      return (
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${
            data.new_variation_addons[selectedVariation].image ||
            data.image?.link
          }`}
          alt={data.full_translation[locale].title}
          style={{ maxHeight: '400px', width: 'auto' }}
        />
      );
    }
  };
  const resolveThumbnail = () => {
    if (data.new_variation_addons[selectedVariation].options) {
      return (
        <LazyImage
          src={
            data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || data.image?.link
          }
          origin="small"
          pb="calc(100% * 286/210)"
          alt={data.full_translation[locale].title}
        />
      );
    } else {
      return (
        <LazyImage
          src={
            data.new_variation_addons[selectedVariation].image ||
            data.image?.link
          }
          origin="small"
          pb="calc(100% * 286/210)"
          alt={data.full_translation[locale].title}
        />
      );
    }
  };
  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <div className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}>
        <Swiper
          id="main"
          zoom
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          onDoubleClick={() => setDoubleClicked(true)}
        >
          <SwiperSlide zoom>
            {resolveImage()}
            {!doubleClicked && (
              <div
                className="absolute right-0 left-0 mx-auto bottom-10 p-2 shadow rounded font-semibold"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  width: '80%',
                }}
              >
                {formatMessage({ id: 'double-click-zoom' })}
              </div>
            )}
          </SwiperSlide>
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
          <div style={{ width: '50px', height: '50px' }}>
            {resolveThumbnail()}
          </div>
        </Swiper>
      </div>
    </div>
  );
}
