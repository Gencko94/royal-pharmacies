import React from 'react';
import MainCarousel from '../components/Home/MainCarousel';

import BestSeller from '../components/Home/BestSeller';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import NavCategory from '../components/NavbarComponents/NavCategory';

export default function Home() {
  return (
    <>
      <NavCategory />
      <MainCarousel />
      <div className="bg-gray-100 mt-8 px-2 py-4 sm:px-2 md:px-4 lg:px-8 xl:px-8">
        <Categories />
        <BestSeller />
        <Banner />
      </div>
    </>
  );
}
