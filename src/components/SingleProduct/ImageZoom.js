import React from 'react';
import {
  CarouselProvider,
  Slider as PureSlider,
  Slide,
  ImageWithZoom,
  DotGroup,
} from 'pure-react-carousel';
import { useMediaQuery } from 'react-responsive';
export default function ImageZoom({ data }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const min1100 = useMediaQuery({ query: '(min-width:1100px)' });
  React.useEffect(() => {
    console.log('changed');
  }, [min1100]);
  return (
    <CarouselProvider
      naturalSlideHeight={480}
      naturalSlideWidth={480}
      totalSlides={4}
      visibleSlides={1}
      currentSlide={currentSlide}
      className="bg-white"
    >
      <PureSlider
        className={`border shadow-sm mb-2 ${min1100 ? 'ml-16' : 'ml-0'}`}
      >
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
                <ImageWithZoom src={photo} alt="g" />
              </div>
            </Slide>
          );
        })}
      </PureSlider>
      <DotGroup
        renderDots={() => (
          <div
            className={`flex ${
              min1100 ? 'flex-col absolute top-0 left-0' : 'justify-evenly mt-5'
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
    </CarouselProvider>
  );
}
