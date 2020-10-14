import React from 'react';
import Helmet from 'react-helmet';
import MainCarousel from '../components/Home/MainCarousel';
import ipad from '../assets/banners/ipad.jpg';
import earbuds from '../assets/banners/earbuds.jpg';
import offer from '../assets/banners/offer.png';
import audiovideo from '../assets/photoCategories/audiovideo.jpg';
import computers from '../assets/photoCategories/computers.jpg';
import mobiles from '../assets/photoCategories/mobiles.jpg';
import tablets from '../assets/photoCategories/tablets.jpg';
// import iphonered from '../assets/phones/iphonered.png';
// import a51 from '../assets/phones/a51.jpg';
// import iphonepng from '../assets/phones/iphonepng.png';
// import note10 from '../assets/phones/note10.jpg';

import ItemsSlider from '../components/Home/ItemsSlider';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import { DataProvider } from '../contexts/DataContext';
import PhotoCategories from '../components/Home/PhotoCategories';
import { useMediaQuery } from 'react-responsive';
// import AnimatedSlides from '../components/Home/AnimatedSlides';

export default function Home() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });

  const { bestSeller, phone, isLightTheme } = React.useContext(DataProvider);
  return (
    <>
      <Helmet>
        <title>Attiah Mall</title>
      </Helmet>
      <div
        className={`mb-5 overflow-hidden ${
          isLightTheme
            ? 'bg-body-light text-body-text-light'
            : 'bg-body-dark text-body-text-dark'
        }`}
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        <MainCarousel />
        <div
          className={`${
            isLightTheme
              ? 'bg-body-light text-body-text-light'
              : 'bg-body-dark text-body-text-dark'
          } mt-0 px-2 py-4 sm:px-2 md:px-4 lg:px-8  mx-auto`}
          style={{ maxWidth: '1560px' }}
        >
          <Categories />
          <ItemsSlider
            data={bestSeller}
            miniLogo={false}
            title="Best Sellers"
            isLightTheme={isLightTheme}
          />
          {!isTabletOrAbove && <Banner img={ipad} />}
          <PhotoCategories
            data={[mobiles, tablets, computers, audiovideo]}
            title="Mobiles & Electronics"
          />
          {/* <AnimatedSlides
            data={[
              { title: 'iPhone 11', photo: iphonepng },
              { title: 'iPhone Red', photo: iphonered },
              { title: 'iPhone 11', photo: iphonepng },
              { title: 'iPhone Red', photo: iphonered },
            ]}
          /> */}
          <ItemsSlider
            data={phone}
            miniLogo={false}
            isLightTheme={isLightTheme}
            title="Save Big with Phones & Tablets"
          />
          {!isTabletOrAbove && <Banner img={earbuds} />}
          {isTabletOrAbove && <Banner img={offer} />}
        </div>
      </div>
    </>
  );
}
