import React from 'react';
import { useIntl } from 'react-intl';
// import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../../helpers/LazyImage';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function VariantImageZoomMobile({
  data,
  selectedVariation,
  selectedOption,
}) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { locale } = useIntl();
  const resolveImage = () => {
    if (data.new_variation_addons[selectedVariation].options) {
      return (
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${
            data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || data.image.link
          }`}
          alt={data.translation[locale].title}
          pb="calc(100% * 800/800)"
        />
      );
    } else {
      return (
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${
            data.new_variation_addons[selectedVariation].image ||
            data.image.link
          }`}
          alt={data.translation[locale].title}
          pb="calc(100% * 800/800)"
        />
      );
    }
  };
  const resolveThumbnail = () => {
    if (data.new_variation_addons[selectedVariation].options) {
      return (
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/small/${
            data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || data.image.link
          }`}
          alt={data.translation[locale].title}
          pb="calc(100% * 800/800)"
        />
      );
    } else {
      return (
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/small/${
            data.new_variation_addons[selectedVariation].image ||
            data.image.link
          }`}
          alt={data.translation[locale].title}
          pb="calc(100% * 800/800)"
        />
      );
    }
  };
  return (
    <div className="mb-2">
      <Swiper id="main" slidesPerView={1} thumbs={{ swiper: thumbsSwiper }}>
        <SwiperSlide zoom>{resolveImage()}</SwiperSlide>
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
