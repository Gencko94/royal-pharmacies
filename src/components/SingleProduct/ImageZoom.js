import React from 'react';
import Slider from 'react-slick';
// import ReactImageMagnify from 'react-image-magnify';
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
export default function ImageZoom({ data }) {
  const sliderRef = React.useRef();

  const { locale } = useIntl();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  // const min1100 = useMediaQuery({ query: '(min-width:1100px)' });
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
        {data.photos.main.map((photo, i) => {
          return (
            <div key={i}>
              <Zoom>
                <img src={photo} alt={data.name} />
              </Zoom>
              {/* <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: photo,
                  },
                  largeImage: {
                    src: photo,
                    width: 1200,
                    height: 1800,
                  },
                }}
              /> */}
            </div>
          );
        })}
      </Slider>
      <div
        className={`absolute top-0  flex flex-col justify-center ${
          locale === 'ar' ? 'right-0' : 'left-0'
        }`}
      >
        {data.photos.main.map((photo, i) => {
          return (
            <div key={i}>
              <img
                onClick={() => handleChangeSlide(i)}
                src={photo}
                alt={data.name}
                className={`${
                  currentSlide === i ? 'border border-red-700' : ''
                }`}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
          );
        })}
      </div>

      {/* <CarouselProvider
        naturalSlideHeight={480}
        naturalSlideWidth={480}
        totalSlides={4}
        visibleSlides={1}
        currentSlide={currentSlide}
        className="bg-white"
      >
        <PureSlider
          className={`border  shadow-sm mb-2 ${
            min1100 ? (locale === 'ar' ? 'mr-16' : 'ml-16') : 'mx-0'
          }`}
        >
          <div dir="rtl">
            {data.photos.main.map((photo, i) => {
              return (
                <Slide index={i} key={i} innerClassName="">
                  <div
                    className=" "
                    style={{
                      minHeight: '240px',

                      minWidth: '240px',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <img src={photo} alt="g" />
                  </div>
                </Slide>
              );
            })}
          </div>
        </PureSlider>
        <DotGroup
          renderDots={() => (
            <div
              className={`flex ${
                min1100
                  ? locale === 'ar'
                    ? 'flex-col absolute top-0 right-0'
                    : 'flex-col absolute top-0 left-0'
                  : 'justify-evenly mt-5'
              } `}
            >
              {data.photos.main.map((photo, i) => {
                return (
                  <button
                    className="mb-1"
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                  >
                    <img
                      style={{ width: '50px', height: '50px' }}
                      src={photo}
                      alt={photo}
                      className={`${
                        currentSlide === i ? 'border border-red-700' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        />
      </CarouselProvider> */}
    </div>
  );
}
