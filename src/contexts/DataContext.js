import React from 'react';
// import photo1 from '../assets/mainCarousel/1.gif';
// import photo2 from '../assets/mainCarousel/2.png';
// import photo3 from '../assets/mainCarousel/3.png';
// import photo4 from '../assets/mainCarousel/4.gif';
// import photo5 from '../assets/mainCarousel/5.png';
// import photo6 from '../assets/mainCarousel/6.gif';
// import photo7 from '../assets/mainCarousel/7.png';
import photo8 from '../assets/mainCarousel/beverages.png';
import photo9 from '../assets/mainCarousel/cooking.png';
import photo10 from '../assets/mainCarousel/food.png';
import photo11 from '../assets/mainCarousel/homecare.png';
import photo12 from '../assets/mainCarousel/laundry.png';
import photo13 from '../assets/mainCarousel/mattress.jpg';
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
// import color from '../assets/cat/color.png'
import phonesbig from '../assets/cat/phonesbig.jpg';
import school from '../assets/cat/school.jpg';
import smartphones from '../assets/cat/smartphones.jpg';
import electronics from '../assets/cat/electronics.jpg';
import beauty from '../assets/cat/beauty.jpg';
export const DataProvider = React.createContext();
export default function DataContextProvider({ children }) {
  const [country, setCountry] = React.useState('Kuwait');

  const mainCarouselItems = [
    { src: photo8 },
    { src: photo9 },
    { src: photo10 },
    { src: photo11 },
    { src: photo12 },
    { src: photo13 },
  ];
  const bestSeller = [
    { src: flaker },
    { src: water },
    { src: skin },
    { src: mask },
    { src: mask },
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
      title: 'Beauty & Personal Care',
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
      title: 'Stationary & School supplies',
    },
  ];

  return (
    <DataProvider.Provider
      value={{ mainCarouselItems, country, setCountry, bestSeller, categories }}
    >
      {children}
    </DataProvider.Provider>
  );
}
