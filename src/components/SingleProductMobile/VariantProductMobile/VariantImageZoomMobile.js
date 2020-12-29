import React from 'react';
import { useIntl } from 'react-intl';
import 'react-medium-image-zoom/dist/styles.css';
import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function VariantImageZoomMobile({
  data,
  selectedVariation,
  selectedOption,
}) {
  const { formatMessage } = useIntl();
  const [doubleClicked, setDoubleClicked] = React.useState(false);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
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
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/small/${
            data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || data.image?.link
          }`}
          alt={data.full_translation[locale].title}
          style={{ width: '50px', height: '50px' }}
        />
      );
    } else {
      return (
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/small/${
            data.new_variation_addons[selectedVariation].image ||
            data.image?.link
          }`}
          alt={data.full_translation[locale].title}
          style={{ width: '50px', height: '50px' }}
        />
      );
    }
  };
  return (
    <div className="mb-2">
      <Swiper
        onDoubleClick={() => setDoubleClicked(true)}
        id="main"
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
      >
        <SwiperSlide zoom>{resolveImage()}</SwiperSlide>
        {!doubleClicked && (
          <div
            className="absolute bottom-10 p-2 shadow rounded font-semibold"
            style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
          >
            {formatMessage({ id: 'double-click-zoom' })}
          </div>
        )}
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
        <SwiperSlide>{resolveThumbnail()}</SwiperSlide>
      </Swiper>
    </div>
  );
}
