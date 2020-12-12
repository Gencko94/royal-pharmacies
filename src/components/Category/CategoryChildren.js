import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

// import Ink from 'react-ink';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation]);
export default function CategoryChildren({
  categoryInfo,
  categoryInfoLoading,
}) {
  const history = useHistory();
  const { locale } = useIntl();
  if (categoryInfoLoading) {
    return <div>loading...</div>;
  }
  return (
    <Swiper
      navigation
      id="main"
      slidesPerView={6}
      spaceBetween={20}
      // breakpoints={breakpoints}
    >
      {categoryInfo.children.map(child => {
        return (
          <SwiperSlide
            key={child.id}
            onClick={() => history.push(`/${locale}/categories/${child.slug}`)}
            className={`overflow-hidden  border  relative my-1
             shadow
            rounded`}
          >
            <h1>{child.translation[locale].name}</h1>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${child.image.link}`}
              alt="no"
              style={{ width: '100px', height: '86px' }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
    // <div className="flex items-center justify-center flex-wrap">
    //   {categoryInfo.children.map(child => {
    //     return (
    //       <div
    //         key={child.id}
    //         onClick={() => history.push(`/${locale}/categories/${child.slug}`)}
    //         className="rounded cursor-pointer category-child__button relative my-1 mx-2 p-2 flex items-center text-main-text text-center font-semibold "
    //         style={{
    //           width: '200px',
    //           height: 'auto',
    //         }}
    //       >
    //         {/* <Ink background={true} /> */}
    //         <h1>{child.translation[locale].name}</h1>
    //         <img
    //           src={`${process.env.REACT_APP_IMAGES_URL}/original/${child.image.link}`}
    //           alt="no"
    //           style={{ width: '100px', height: '86px' }}
    //         />
    //       </div>
    //     );
    //   })}
    // </div>
  );
}
