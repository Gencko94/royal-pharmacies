import React from 'react';
import MainCarousel from '../components/Home/MainCarousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BestSeller from '../components/Home/BestSeller';
export default function Home() {
  return (
    <>
      <MainCarousel />
      <div className="bg-gray-300 px-8 py-4">
        <BestSeller />
      </div>
    </>
  );
}
