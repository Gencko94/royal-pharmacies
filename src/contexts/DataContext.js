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
  const navCategories = [
    {
      title: 'Electronics & Appliances',
      data: [
        [
          {
            title: 'Batteries & Power',
            sub: [
              'Batteries',
              'Extenstion Leads & Cables',
              'Power Adaptors & Sockets',
            ],
          },
          {
            title: 'Cameras & Camcorders',
            sub: [
              'Action & Instant Cameras',
              'Cameras Accessories',
              'Camcorders',
              'Cameras Bags',
            ],
          },
          {
            title: 'TVs & Projectors',
            sub: [
              'Projectors',
              'Reviever & Sattelite Accessories',
              'TV Accessories',
              'TVs',
            ],
          },
        ],

        [
          {
            title: 'Home Cinema & Audio',
            sub: [
              'Audio Portable Devices',
              'Audio Cables & Accessories',
              'Blu Ray & Media Streaming',
              'Car Audio',
              'Home Cinema Systems',
            ],
          },
          {
            title: 'Small Appliances',
            sub: [
              'Accessories & Spare Parts',
              'Coolers, Heaters & Air Treatment',
              'Food Preperation',
              'Irons & Steamers',
              'Kettles & Coffee Machines',
              'Microwave Ovens & Portable Ports',
              'Sewing Machines',
              'Toasters & Grills',
            ],
          },
        ],
      ],
    },
    {
      title: 'Fresh Food',
      data: [
        [
          {
            title: 'Fruits & Vegetables',
            sub: [
              'Fresh Boxes',
              'Fruits',
              'Herbs',
              'Vegetables',
              'Hydroponic Farming',
            ],
          },
          {
            title: 'Chilled Food Counter',
            sub: [
              'Cold Cuts & Meat Snacks',
              'Dips,Spreads & Pate',
              'Olives & Antipasti',
              'Seafood & Caviar',
              'Tofu',
            ],
          },
          {
            title: 'Dairy & Eggs',
            sub: [
              'Butter & Margarine',
              'Cheese & Labaneh',
              'Chilled Desserts',
              'Cream',
              'Eggs',
              'Milk & Laban',
              'Yoghurt',
            ],
          },
        ],
        [
          {
            title: 'Food To Go',
            sub: ['Appetizers & Bites', 'Ready Meals To Go', 'Salads & Soup'],
          },
          {
            title: 'Meat & Poultry',
            sub: ['Beef', 'Chicken', 'Lamb', 'Variety Meat'],
          },
          {
            title: 'Ready to Cook',
            sub: ['Puff Pastry,Dough & Pizza Bases', 'Paste,Gnocchi & Sauces'],
          },
        ],
      ],
    },
    {
      title: 'Cleaning & Household',
      data: [
        [
          {
            title: 'Candles & Air Fresheners',
            sub: [
              'Autosprays & Refills',
              'Candles,Diffusers & Incense',
              'Sprays,Gels Air Fresheners',
            ],
          },
          {
            title: 'Cleaning Supplies',
            sub: [
              'Carpet & Floor Cleaning',
              'Dishwashing Liquids & Tablets',
              'Disinfectents & Wipes',
              'Drain Unblockers',
              'Glass & Wood Cleaning',
              'Kitchen & Oven Cleaning',
              'Multi Purpose Cleaning',
              'Mops,Brooms & Dusters',
              'Rubber Gloves',
              'Shoe Polish',
            ],
          },
        ],
        [
          {
            title: 'Laundry & Detergants',
            sub: [
              'Detergants',
              'Fabric Softener',
              'Stain Removers & Fabric Care',
            ],
          },
          {
            title: 'Tissues',
            sub: [
              'Facial Tissues',
              'Pocket Tissues',
              'Refreshing Wet Wipes',
              'Single & Convenience Tissues',
            ],
          },
        ],
        [
          {
            title: 'Laundry & Detergants',
            sub: [
              'Detergants',
              'Fabric Softener',
              'Stain Removers & Fabric Care',
            ],
          },
          {
            title: 'Tissues',
            sub: [
              'Facial Tissues',
              'Pocket Tissues',
              'Refreshing Wet Wipes',
              'Single & Convenience Tissues',
            ],
          },
        ],
      ],
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
        navCategories,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}
