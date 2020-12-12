import React from 'react';
// import ReactImageMagnify from 'react-image-magnify';
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
// import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useIntl } from 'react-intl';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function VariantImageZoom({
  data,
  selectedVariation,
  selectedOption,
}) {
  console.log(selectedOption);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  // const variation = React.useMemo(() => {
  //   return Object.keys(data.new_variation_addons)[selectedVariation];
  // }, [data.new_variation_addons, selectedVariation]);
  const { locale } = useIntl();

  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <div className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}>
        <Swiper
          id="main"
          zoom
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
        >
          <SwiperSlide zoom>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${
                data.new_variation_addons[selectedVariation].options
                  ? data.new_variation_addons[selectedVariation].options[
                      selectedOption[selectedVariation]
                    ].image
                  : data.new_variation_addons[selectedVariation].image
              }`}
              alt={data.translation[locale].title}
            />
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
          <div>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${
                data.new_variation_addons[selectedVariation].options
                  ? data.new_variation_addons[selectedVariation].options[
                      selectedOption[selectedVariation]
                    ].image
                  : data.new_variation_addons[selectedVariation].image
              }`}
              alt={data.name}
              style={{ width: '50px', height: '50px' }}
            />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
