import React from 'react';
import Slider from 'react-slick';
// import ReactImageMagnify from 'react-image-magnify';
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
export default function ImageZoom({ data, selectedVariation }) {
  const sliderRef = React.useRef();

  const { locale } = useIntl();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const mainSettings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleChangeSlide = React.useCallback(i => {
    sliderRef.current.slickGoTo(i);
    setCurrentSlide(i);
  }, []);
  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <Slider
        ref={slider => (sliderRef.current = slider)}
        {...mainSettings}
        className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}
      >
        {data.type === 'simple' ? (
          [data.image, ...data.gallery].map(item => {
            return (
              <div key={item.id}>
                <Zoom>
                  <img
                    src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.link}`}
                    alt={data.name}
                  />
                </Zoom>
              </div>
            );
          })
        ) : (
          <div>
            <Zoom>
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${data.variation_addons[selectedVariation].image.link}`}
                alt={data.name}
              />
            </Zoom>
          </div>
        )}
      </Slider>
      <div
        className={`absolute top-0  grid grid-cols-1 gap-2 ${
          locale === 'ar' ? 'right-0' : 'left-0'
        }`}
      >
        {data.type === 'simple' ? (
          [data.image, ...data.gallery].map((item, i) => {
            return (
              <div key={item.id}>
                <img
                  onClick={() => handleChangeSlide(i)}
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.link}`}
                  alt={item.id}
                  className={`${
                    currentSlide === i ? 'border border-red-700' : ''
                  }`}
                  style={{ width: '50px', height: '50px' }}
                />
              </div>
            );
          })
        ) : (
          <div>
            <Zoom>
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/small/${data.variation_addons[selectedVariation].image.link}`}
                alt={data.name}
              />
            </Zoom>
          </div>
        )}
      </div>
    </div>
  );
}
