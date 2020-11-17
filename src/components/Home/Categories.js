import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import Slider from 'react-slick';
// import { useMediaQuery } from 'react-responsive';
// import MultiClamp from 'react-multi-clamp';
import ContentLoader from 'react-content-loader';
import { useQuery } from 'react-query';
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
export default function Categories() {
  const { getHomePageCategories } = React.useContext(DataProvider);
  // const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { data, isLoading } = useQuery(
    'sliderCategories',
    async () => {
      return await getHomePageCategories();
    },
    { retry: true }
  );
  // const isMobile = useMediaQuery({ query: '(min-width: 360px)' });
  const settings = {
    className: '',
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="my-3 text-body-text-light">
      <Slider className="" {...settings}>
        {isLoading &&
          [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            return (
              <div key={i} className="px-1 overflow-hidden ">
                <ContentLoader
                  speed={2}
                  viewBox="0 0 400 500"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="50%" cy="50%" r="200" width="100%" />
                </ContentLoader>
              </div>
            );
          })}
        {!isLoading &&
          data.map(item => {
            return (
              <div className="px-1">
                <div className="  overflow-hidden  relative  rounded-lg  ">
                  <img
                    src={item.url}
                    alt="something"
                    className=" h-auto w-full "
                  />
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
// const RightArrow = ({ onClick }) => {
//   return (
//     <div
//       className="hover:bg-gray-300 rounded-full grid place-items-center absolute top-1/2 right-n25 lg:right-n42 w-8 h-8 lg:h-12 lg:w-12 z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white transition duration-150 shadow-2xl border border-gray-300"
//       onClick={onClick}
//     >
//       <BsChevronRight />
//     </div>
//   );
// };
// const LeftArrow = ({ onClick }) => {
//   return (
//     <div
//       className="hover:bg-gray-300 rounded-full flex justify-center w-8 h-8  lg:h-12 lg:w-12    items-center absolute left-8 top-1/2   z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white transition-colors duration-150 shadow-2xl border border-gray-300"
//       onClick={onClick}
//     >
//       <BsChevronLeft />
//     </div>
//   );
// };
