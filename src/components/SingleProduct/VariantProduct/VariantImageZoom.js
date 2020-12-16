import React from 'react';
// import ReactImageMagnify from 'react-image-magnify';
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
// import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
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
  console.log(selectedOption);
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
          pb="calc(100% * 286/210)"
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
          pb="calc(100% * 286/210)"
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
          pb="calc(100% * 286/210)"
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
          pb="calc(100% * 286/210)"
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
        >
          <SwiperSlide zoom>{resolveImage()}</SwiperSlide>
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
