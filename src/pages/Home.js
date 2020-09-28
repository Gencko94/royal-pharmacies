import React from 'react';
import MainCarousel from '../components/Home/MainCarousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BestSeller from '../components/Home/BestSeller';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';

export default function Home() {
  return (
    <>
      <MainCarousel />
      <div className="bg-gray-00 px-2 py-4 sm:px-2 lg:px-8">
        <Categories />
        <BestSeller />
        <Banner />
      </div>
    </>
  );
}
