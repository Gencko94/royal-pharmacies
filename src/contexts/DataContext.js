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
import usa from '../assets/flags/usa.svg';
import korea from '../assets/flags/korea.svg';
import uk from '../assets/flags/uk.svg';
import jp from '../assets/flags/japan.svg';
import kuwait from '../assets/flags/kuwait.svg';
import qatar from '../assets/flags/qatar.svg';
import uae from '../assets/flags/uae.svg';
import audio2 from '../assets/products/audio2.jpg';
import audiosm from '../assets/products/audiosm.jpg';
import audio from '../assets/products/audio.jpg';
import fryer from '../assets/products/fryer.jpg';
import fryersm from '../assets/products/fryersm.jpg';
import fryer2 from '../assets/products/fryer2.jpg';
import fryer3 from '../assets/products/fryer3.jpg';
import fryer4 from '../assets/products/fryer4.jpg';

import kenwood from '../assets/products/kenwood.jpg';
import kenwoodsm from '../assets/products/kenwoodsm.jpg';
import kenwood2 from '../assets/products/kenwood2.jpg';
import kenwood3 from '../assets/products/kenwood3.jpg';
import liss from '../assets/products/liss.jpg';
import lisssm from '../assets/products/lisssm.jpg';
import liss2 from '../assets/products/liss2.jpg';
import liss3 from '../assets/products/liss3.jpg';
import liss4 from '../assets/products/liss4.jpg';
import pump from '../assets/products/pump.jpg';
import pumpsm from '../assets/products/pumpsm.jpg';
export const DataProvider = React.createContext();
export default function DataContextProvider({ children }) {
  const [deliveryCountry, setDeliveryCountry] = React.useState('kuwait');
  const [selectedStore, setSelectedStore] = React.useState('kuwait');
  const localItems = localStorage.getItem('cartItems');
  const [cartItems, setCartItems] = React.useState(() => {
    if (localItems) {
      return JSON.parse(localItems);
    } else {
      return [];
    }
  });
  const addItemToCart = item => {
    const cartCopy = [...cartItems];
    const newItem = {
      id: item.data.id,
      name: item.data.name,
      photo: item.data.photos.main[0],
      price: item.data.price,
      quantity: item.quantity || 1,
    };
    cartCopy.push(newItem);

    setCartItems(cartCopy);

    localStorage.setItem('cartItems', JSON.stringify(cartCopy));
  };

  const EditItemFromCart = (quantity, item) => {
    const cartCopy = [...cartItems];
    cartCopy.forEach(cItem => {
      if (item.id === cItem.id) {
        cItem.quantity = quantity;
      }
    });
    setCartItems(cartCopy);
    localStorage.setItem('cartItems', JSON.stringify(cartCopy));
  };
  const removeItemFromCart = item => {
    const cartCopy = cartItems.filter(cartItem => item.id !== cartItem.id);
    setCartItems(cartCopy);
    localStorage.setItem('cartItems', JSON.stringify(cartCopy));
  };

  const countries = ['usa', 'uk', 'jp', 'korea', 'kuwait', 'qatar', 'uae'];
  const stores = ['usa', 'uk', 'jp', 'korea', 'kuwait', 'qatar', 'uae'];
  const flags = {
    usa: usa,
    korea: korea,
    uk: uk,
    jp: jp,
    kuwait: kuwait,
    qatar: qatar,
    uae: uae,
  };
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
    {
      id: '1',

      name: 'Babyliss Hair Dryer 6730 SDE',
      price: '399.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: lisssm, main: [liss, liss2, liss3, liss4] },
    },
    {
      id: '1',

      name: 'Babyliss Hair Dryer 6730 SDE',
      price: '399.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: lisssm, main: [liss, liss2, liss3, liss4] },
    },
    {
      id: '2',

      name: 'Black&Decker Air Fryer AF220-B5',
      price: '218.50',
      soldBy: 'Sell Star Electronics',
      condition: 'New',
      description:
        "Black+Decker AF220-B5 Air Fryer is an excellent addition to your kitchen. It boasts of the Rapid Air Convection Technology. This allows you to fry your favorite food such as fries, nuggets, and more. In addition to this, the handle does not heat up so that you can safely take the food out of the basket',reasonsToBuy:'he Black+Decker AF220-B5 Air Fryer is an excellent addition to your kitchen. It boasts of the Rapid Air Convection Technology. This allows you to fry your favorite food such as fries, nuggets, and more. In addition to this, the handle does not heat up so that you can safely take the food out of the basket. What's more, you can wash this appliance's parts quickly in a dishwasher. You can manually operate this Black and Decker air fryer without a hassle. Thanks to its 800g basket capacity, you can air fry food for a large number of people. This air fryer has a black finish that looks brilliant in your kitchen. Key Features Power: 1500W Voltage: 220-240V Frequency: 50-60Hz 2.5L gross capacity Safety lock Over-heat protection Rapid Air Convection Technology 60 min timer Guilt-free Fried Food The Rapid Air Convection Technology helps to fry food using minimal fat. This technology generates immense heat at which you can fry the food in a healthy way. Thus, you can indulge in your favorite fried foodstuffs without any guilt. Safe for Use You can use the temperature control knob to regulate the temperature at which your food is being cooked inside this Black and Decker appliance. Furthermore, the Cool-touch housing and handle prevent your skin from burns upon contact. This makes the air fryer safe for use. The safety lock of this air fryer ensures that the food remains locked in. User-friendly Appliance You can place the Black and Decker air fryer on almost any kitchen surface as it has non-slip feet. Thus, the air fryer will not fall. Also, you can operate this appliance conveniently. The over-heat protection feature ensures that the safety of the appliance and you",
      technicalDetails: {
        'Power supply input frequency': '220-240 50/60Hz',
        'Non-stick inner bowl':
          'Non-stick coated stainless - steel basket- easy to clean',
        'Suitable for': 'Fry - Roast - Grill - Bake',
      },
      photos: { small: fryersm, main: [fryer, fryer2, fryer3, fryer4] },
    },
    {
      id: '3',
      name: ' Kenwood Kitchen Machine KVL4230S',
      price: '1899.00',
      soldBy: 'Carrefour',
      condition: 'New',
      description:
        'Chef KVL4230SEnjoy the process of cooking even more with the Kenwood Chef XL.',
      reasonsToBuy:
        "About the Chef XL KVL4230SBring great tasting food to the table with this reliable kitchen machine. Designed to make light work of food preparation, this product will help you to create an array of dishes with ease. Dedicated bowl tools whether you're using the K-Beater to make tasty biscuits, the whisk to whip up the thickest cream or the dough hook to knead dough for homemade pizza, the accompanying bowl tools enable you to make delicious food with confidence.A world of possibilitiesThere are over 20 attachments available, so whether you want to create homemade salsa, blend healthy smoothies and soups, mince your own meat, or cut pasta shapes, the Kenwood Chef XL will assist you in producing a variety of culinary delights.",
      technicalDetails: {
        'Bowl Material': 'Metal',
        'Bowl capacity': '4.5',
        Power: '1200',
      },
      photos: { small: kenwoodsm, main: [kenwood, kenwood2, kenwood3] },
    },
    {
      id: '4',
      name:
        'Namson Rechargeable Touch Water Dispenser , Size-6.5 X 17.5Cm , Silicone Hose Included',
      price: '99.00',
      soldBy: 'DubaiGallery',
      condition: 'New',
      description: 'Water Dispenser',
      reasonsToBuy:
        'Perfectly designed for optimal useMade of top-class materials for enhanced durabilityEasy to use and maintain',
      photos: { small: pumpsm, main: [pump] },
    },
    {
      id: '5',
      name: 'Babyliss Hair Dryer 6730 SDE',
      price: '399.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: lisssm, main: [liss, liss2, liss3, liss4] },
    },

    {
      id: '6',

      name: 'Yamaha RX-V385 + NS-PA40 4K Hometheatre Package',
      price: '1999.00',
      soldBy: 'Carrefour',
      condition: 'New',
      description: [
        'Yamaha Bluetooth compatible 5.1-channel AV receiver with fully discrete combination of graceful curvilinear design, this 5.1-channel speaker system will look stylish in any home, while providing full enjoyment of both music and movies. 5.1-channel speaker system compatible with HD audio sources',
        '2-way, 3-speaker front speakers deliver rich lows, clear dialogue and expressive vocals',
        'Advanced YSTII subwoofer',
        'The slim, striking design of the front speakers will add a smart touch to any interior',
        'Glossy black cabinets match the latest TVs',
        'Designed to enable clean and neat wiring (cable hidden inside front speaker)',
        'Surround and centre speakers can be wall mounted',
      ],
      reasonsToBuy: null,
      photos: { small: audiosm, main: [audio, audio2] },
    },
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
  const sidebarCategories = [
    {
      title: 'Electronics & Appliances',
      sub: [
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
    },
    {
      title: 'Fresh Food',
      sub: [
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
    },
    {
      title: 'Cleaning & Household',
      sub: [
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
    {
      title: 'Gift Cards',
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
    {
      title: 'Fashion & Jewellary',
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
    {
      title: 'Baby Care',
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
        deliveryCountry,
        setDeliveryCountry,
        bestSeller,
        categories,
        navCategories,
        countries,
        selectedStore,
        setSelectedStore,
        stores,
        flags,
        sidebarCategories,
        addItemToCart,
        removeItemFromCart,
        cartItems,
        EditItemFromCart,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}
