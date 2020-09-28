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

  return (
    <DataProvider.Provider
      value={{ mainCarouselItems, country, setCountry, bestSeller }}
    >
      {children}
    </DataProvider.Provider>
  );
}
