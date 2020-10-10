import React from 'react';
import MainCarousel from '../components/Home/MainCarousel';
import ipad from '../assets/banners/ipad.jpg';
import earbuds from '../assets/banners/earbuds.jpg';
import offer from '../assets/banners/offer.png';
import audiovideo from '../assets/photoCategories/audiovideo.jpg';
import computers from '../assets/photoCategories/computers.jpg';
import mobiles from '../assets/photoCategories/mobiles.jpg';
import tablets from '../assets/photoCategories/tablets.jpg';

import ItemsSlider from '../components/Home/ItemsSlider';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import { DataProvider } from '../contexts/DataContext';
import PhotoCategories from '../components/Home/PhotoCategories';
import { useMediaQuery } from 'react-responsive';
import AnimatedSlides from '../components/Home/AnimatedSlides';

export default function Home() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });

  const { bestSeller, phone } = React.useContext(DataProvider);
  return (
    <div
      className="mb-5 overflow-hidden"
      style={{ minHeight: 'calc(100vh - 140px)' }}
    >
      <MainCarousel />
      <div
        className="bg-nav-secondary mt-8 px-2 py-4 sm:px-2 md:px-4 lg:px-8 xl:px-8 mx-auto"
        style={{ maxWidth: '1366px' }}
      >
        <Categories />
        <ItemsSlider data={bestSeller} miniLogo={true} title="Best Sellers" />
        {!isTabletOrAbove && <Banner img={ipad} />}
        <PhotoCategories
          data={[mobiles, tablets, computers, audiovideo]}
          title="Mobiles & Electronics"
        />
        <AnimatedSlides data={[mobiles, tablets, computers, audiovideo]} />
        <ItemsSlider
          data={phone}
          miniLogo={false}
          title="Save Big with Phones & Tablets"
        />
        {!isTabletOrAbove && <Banner img={earbuds} />}
        {isTabletOrAbove && <Banner img={offer} />}
      </div>
    </div>
  );
}
