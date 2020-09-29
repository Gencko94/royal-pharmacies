import React from 'react';
import baby from '../assets/mainCarousel/baby.gif';
import bigdeal from '../assets/mainCarousel/bigdeal.png';
import emaar from '../assets/mainCarousel/emaar.png';
import jaguar from '../assets/mainCarousel/jaguar.png';
import poco from '../assets/mainCarousel/poco.png';
import watch from '../assets/mainCarousel/watch.png';
import mbbaby from '../assets/mainCarousel/mbbaby.gif';
import mbjaguar from '../assets/mainCarousel/mbjaguar.png';
import mbpoco from '../assets/mainCarousel/mbpoco.png';
import mbwatch from '../assets/mainCarousel/mbwatch.png';
import mbbigdeal from '../assets/mainCarousel/mbbigdeal.png';
import mbemaar from '../assets/mainCarousel/mbemaar.png';
// import photo13 from '../assets/mainCarousel/mattress.jpg';
import flaker from '../assets/offers/flaker.jpg';
import mask from '../assets/offers/mask.jpg';
import skin from '../assets/offers/skin.jpg';
import water from '../assets/offers/water.jpg';
import accessories from '../assets/cat/accessories.png';
import bags from '../assets/cat/bags.png';
import color from '../assets/cat/color.png';
import fridge from '../assets/cat/fridge.png';
import iron from '../assets/cat/iron.png';
import ladies from '../assets/cat/ladies.png';
import laptops from '../assets/cat/laptops.png';
import makeup from '../assets/cat/makeup.png';
import men from '../assets/cat/men.png';
import paper from '../assets/cat/paper.png';
import personalcare from '../assets/cat/personalcare.png';
import phones from '../assets/cat/phones.png';
import tabs from '../assets/cat/tabs.png';
import tv from '../assets/cat/tv.png';
import writing from '../assets/cat/writing.png';

import school from '../assets/cat/school.jpg';
import smartphones from '../assets/cat/smartphones.jpg';
import electronics from '../assets/cat/electronics.jpg';
import beauty from '../assets/cat/beauty.jpg';
export const DataProvider = React.createContext();
export default function DataContextProvider({ children }) {
  const [country, setCountry] = React.useState('Kuwait');

  const mainCarouselItemsDesktop = [
    { src: bigdeal },
    { src: watch },
    { src: poco },
    { src: emaar },
    { src: jaguar },
    { src: baby },
  ];
  const mainCarouselItemsMobile = [
    { src: mbbigdeal },
    { src: mbwatch },
    { src: mbpoco },
    { src: mbemaar },
    { src: mbjaguar },
    { src: mbbaby },
  ];
  const bestSeller = [
    { src: flaker },
    { src: mask },
    { src: water },
    { src: skin },
    { src: mask },

    { src: water },
    { src: flaker },
    { src: skin },
  ];
  const categories = [
    {
      main: electronics,
      sub: [
        { src: fridge, title: 'Large Appliances' },
        { src: iron, title: 'Small Appliances' },
        { src: tv, title: 'TVs & Projectors' },
        { src: laptops, title: 'Laptops & PCs' },
      ],
      color: '#9adbf3',
      title: 'Electronics & Appliances',
    },
    {
      main: smartphones,
      sub: [
        { src: phones, title: 'Smartphones' },
        { src: tabs, title: 'Tablets & E-Readers' },
        { src: accessories, title: 'Mobile Accessories' },
      ],
      color: '#9adbf3',
      title: 'Smartphones,Tablets & Wearables',
    },
    {
      main: school,
      sub: [
        { src: writing, title: 'Writing Supplies' },
        { src: bags, title: 'School Bags' },
        { src: color, title: 'Coloring Materials' },
        { src: paper, title: 'Paper Supplies' },
      ],
      color: '#f3f3f3',
      title: 'Stationary & School supplies',
    },
    {
      main: beauty,
      sub: [
        { src: men, title: `Men's Grooming` },
        { src: ladies, title: 'Ladies Hair Removal' },
        { src: personalcare, title: 'Natural Personal Care' },
        { src: makeup, title: 'Makeup & Nails' },
      ],
      color: '#f7def1',
      title: 'Beauty & Personal Care',
    },
  ];

  return (
    <DataProvider.Provider
      value={{
        mainCarouselItemsDesktop,
        mainCarouselItemsMobile,
        country,
        setCountry,
        bestSeller,
        categories,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}
