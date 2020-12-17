# Things to Complete

- [x] Fix Deliver To in Mobile & Desktop View.
- [x] Add Support for Authenticated Users.
- [x] Add Framer motion to Mobile Side Menu.
- [x] Fix Buy options in items Slider.
- [x] Add React Query to Navbar.
- [x] Add Protected Routes.
- [x] Add Maps to MyAddressesMobile.
- [x] Add a Review system.
- [x] Append buy options to cart.
- [x] Add Error Boundaries and handlers.
- [x] Make buttons bigger || or make classes for buttons.
- [x] Add forgot password support .
- [x] Add routes to account page and try to animate them.
- [x] Complete desktop view order history.
- [x] Add Buy Options to SingleProduct in Desktop and Mobile View.
- [x] Add Loaders to Vertical Items.
- [x] Discuss Location handling with Maher.
- [x] Add default location support.
- [x] Localize Footers.
- [x] Add 404 page.
- [x] Add a Review system for Mobile.(2hrs)
- [x] Look into lazy loading and progressive images.
- [x] Add auto Complete to the Search bar.(1hr)
- [x] Add keys to env variables.(0.5hr)
- [x] Add Wishlist Page Desktop & Mobile.(3hrs) (discuss with maher)
- [x] Add React query to order history. (2.5hrs)
- [x] Add payment Method for Mobile & Desktop (3hrs) (discuss with maher)
- [x] Add Viewed Items for Mobile & Desktop (3hrs)
- [x] Look into re-algothiming side menu (3hrs)
- [x] Complete Profile Modal Desktop (3hrs)
- [x] discuss change user Info (phoneNumber and email)

- [x] Add Side Cart Menu Desktop & Mobile
- [x] Add category items placeholders
- [x] fix image zoom on single product mobile
- [x] add reviews to single product
- [x] Add Language Page to side menu
- [x] wrong credentials handling.
- [ ] Add Edit Cart item support. (discuss with maher)
- [x] deliver to mobile.
- [x] add password modals in account.
- [ ] fix search bar mobile.
- [ ] Complete Viewed Items.
- [ ] Add Coupon Support in Cart.
- [ ] Add Currencies and modify checkout delivery cost
- [x] Add payment methods Logos in Cart
- [x] Complete Item Reviews
- [x] Add Delivery Country Page to side menu
- [ ] Add React Query & Localizations to the Search page.
- [ ] Add Scroll Pagination to SingleProduct Pages.
- [ ] Complete the Checkout Page.(2hrs)
- [ ] Search Engine optimization.
- [ ] Add auto detect locale and localstorage language.(1hr)
- [x] Add delivery country context.(1hr)
- [ ] Nest Lazyloading deep (3hrs)
- [ ] login and register number and password validation (discuss)
- [ ] Single Product

- [ ] single product quantity input number validation
- [x] look into fixing home loaders

      **API BUGS** userInfo Update, how the hell should i send a post body with a params supported api url -- NO ERROR HANDLING WHEN EMAIL EXISTS

      -- check coupon validity per user
      -- tell why coupon is invalid
      -- coupon add route and coupon remove route.
      -- add banners data to showcase
      -- organize payment methods in countries
      -- add route for getting multiple products based on id
      -- refresh roken explanation
      -- in filter category api make product structure same as get category product

**NOTES**

- [ ] filter product api doesn't send images with filtered products.
- [ ] filter by price error with variation products.
- [ ] need a desktop and mobile category cover photo for category section.
- [ ] increase quantity when item added in cart twice instead of rejecting.
- [ ] make guest cart api behave same as regular cart, with the same parameters.
- [ ] Product api , send variation symbol (S for Small, L for Large), also need a is_size or is_color confirmation.
- [ ] Remove check cart api , the cart should be checked automatically while sending the data, if there is a change send a message along with the cart.
- [ ] i need a way to show the best brands on navbar categories, we make a new api or just find another way.
- [ ] need api for about us (if there is any).
- [ ] need api for FAQ (if there is any).
- [ ] need api for return policy page (if there is any).
- [ ] refresh token explanation, as i know they should live much longer than regular tokens.
- [ ] Please Explain how many item types we do have ? what is a simple product with addons vs variant product with addons ?

- [ ] add country code to combine cart api

# MRG API Structure :

## 1. Single Product

```
{
  id: item.id,
  slug: item.slug,
  brand: {
    brand_id: item.brand_id,
    brand_slug: item.brand_slug,
    en_name: item.brand.en_name,
    ar_name: item.brand.ar_name,
  },
  category: {  // i need the category for the breadcrumbs (the mini category tree on the top)
    category_id: item.category_id,
    category_slug: item.category_slug,
    category_en_name: item.category.en_name,
    category_ar_name: item.category.ar_name,
    // i don't know how to deal with this when the product belongs to a sub-category
  },
  type: item.type,
  delivery: item.delivery,
  simple: {  // if the product has no options (color,size)

    name_en: item.name_en,
    name_ar: item.name_ar,
    sku: item.sku, // sku or model number
    is_promotion: Boolean, // if item has sale
    price: item.price, // regular price
    sale_price: item.sale_price, // sale price
    promotion_end: item.promotion_end, // date of the promotion end so i can parse it
    availableQuantity: item.availableQuantity, // available quantity of the product
    maxQuantity: item.maxQuantity, // maximum quantity per order
    images: [ // the Images to be shown in the slider

      { id: 'id', url: 'imageUrl', zoomedImageUrl: 'zoomedImageUrl' },
      { id: 'id', url: 'imageUrl', zoomedImageUrl: 'zoomedImageUrl' },
      { id: 'id', url: 'imageUrl', zoomedImageUrl: 'zoomedImageUrl' },
    ],
    gallery: [ // the Images to be shown below the after the product details(big images like noon.com) (optional)

      { id: 'id', url: 'imageUrl' },
      { id: 'id', url: 'imageUrl' },
      { id: 'id', url: 'imageUrl' },
      ],
  },

 product_options: [  // variation_addons (if the product has multiple options)
              // variation 1 - example : blue shoes

    {
      variation_id: 'variation_id',
      sku: item.sku, // sku or model number // i will send this,and the size_id when adding to cart
      name_en: item.name_en,
      name_ar: item.name_ar,
      is_promotion: Boolean, // if item has sale
      price: item.price, // regular price
      sale_price: item.sale_price, // sale price
      promotion_end: item.promotion_end, // date of the promotion end so i can parse it
      maxQuantity: item.maxQuantity, // maximum quantity per order

      sizes: [ // i will conditionally render the sizes based on quantity left

      { id: 'size_id', value: 'S', quantity: 5 },
      { id: 'size_id', value: 'M', quantity: 2 },
      { id: 'size_id', value: 'L', quantity: 0 },
      ],

      images: [ // the Images to be shown in the slider

        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
      ],
      gallery: [
        // the Images to be shown below the after the product details(big images like noon.com) (optional)
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
      ],
      // we either have one rating for the whole product || or each variation has its own rating and reviews, here i'm implementing the variation version
      rating: 2.5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
      numberOfReviews: 5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
    },
    {
      // variation 2 - example : red shoes
      variation_id: 'variation_id',
      sku: item.sku, // sku or model number // i will send this,and the size_id when adding to cart
      name_en: item.name_en,
      name_ar: item.name_ar,
      is_promotion: Boolean, // if item has sale
      price: item.price, // regular price
      sale_price: item.sale_price, // sale price
      promotion_end: item.promotion_end, // date of the promotion end so i can parse it
      maxQuantity: item.maxQuantity, // maximum quantity per order

      sizes: [
        // i will conditionally render the sizes based on quantity left
        { id: 'size_id', value: 'S', quantity: 5 },
        { id: 'size_id', value: 'M', quantity: 2 },
        { id: 'size_id', value: 'L', quantity: 0 },
      ],

      images: [
        // the Images to be shown in the slider
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
      ],
      gallery: [
        // the Images to be shown below the after the product details(big images like noon.com) (optional)
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
      ],
      // we either have one rating for the whole product || or each variation has its own rating and reviews, here i'm implementing the variation version
      rating: 2.5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
      numberOfReviews: 5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
    },
  ],

  details: {
    // we either have one details for the whole product || or each variation has its own details, here i implenemented the whole product version
    en: {
      // please dont send me html , it's a pain the ass
      description: 'a short or long description of the product', // the product description
      features: ['feature 1', 'feature 2'],
      // product features need to be a list of features
      specifications: {
        // any specifications like size and materials
        width: '',
        height: '',
        size: '',
        weight: '',
        materials: ['wood', 'glass', 'cotton 100%'], // a list of materials
      },
    },
    ar: {
      // please dont send me html , it's a pain the ass
      description: 'a short or long description of the product', // the product description
      features: ['feature 1', 'feature 2'],
      // product features need to be a list of features
      specifications: {
        // any specifications like size and materials
        width: '',
        height: '',
        size: '',
        weight: '',
        materials: ['wood', 'glass', 'cotton 100%'], // a list of materials
      },
    },
  },
}
```

## 2. Single Product Example

```
{
id: 1,
slug: adidas-blouse,
brand: {
brand_id: 1,
brand_slug: adidas,
en_name: Adidas,
ar_name: أديداس,
},
category: { // i need the category for the breadcrumbs (the mini category tree on the top)
category_id: 1,
category_slug: men-clothing,
category_en_name: Men Clothing,
category_ar_name: ملابس رجالية,
// i don't know how to deal with this when the product belongs to a sub-category
},
type: simple or multi // check below ,
delivery: {
local:true,
international:true

},
simple: { // if the product has no options (color,size)

    name_en: Adidas Blouse,
    name_ar: كنزة اديداس,
    sku: item.68742, // sku or model number
    is_promotion: true || false, // if item has sale
    price: 100, // regular price
    sale_price: 80, // sale price,
    sale_percent:20%,
    promotion_end: 1/1/2021 // date of the promotion end so i can parse it
    availableQuantity: 20, // available quantity of the product
    maxQuantity: 2, // maximum quantity per order
    images: [ // the Images to be shown in the slider

      { id: 'id', url: 'imageUrl', zoomedImageUrl: 'zoomedImageUrl' },
      { id: 'id', url: 'imageUrl', zoomedImageUrl: 'zoomedImageUrl' },
      { id: 'id', url: 'imageUrl', zoomedImageUrl: 'zoomedImageUrl' },
    ],
    gallery: [ // the Images to be shown below the after the product details(big images like noon.com) (optional)

      { id: 'id', url: 'imageUrl' },
      { id: 'id', url: 'imageUrl' },
      { id: 'id', url: 'imageUrl' },
      ],

},

product_options: [ // multi (if the product has multiple options)
// variation 1 - example : blue blouse

    {

      is_promotion: true || false, // if item has sale
      price: 200, // regular price
      sale_price: 150, // sale price
      promotion_end: 1/1/2021, // date of the promotion end so i can parse it
      maxQuantity: 5, // maximum quantity per order

      sizes: [ // i will conditionally render the sizes based on quantity left

      { id: '1', value: 'S', quantity: 5 },
      { id: '2', value: 'M', quantity: 2 },
      { id: '3', value: 'L', quantity: 0 },
      ],

      images: [ // the Images to be shown in the slider

        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
      ],
      gallery: [
        // the Images to be shown below the after the product details(big images like noon.com) (optional)
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
      ],
      // we either have one rating for the whole product || or each variation has its own rating and reviews, here i'm implementing the variation version
      rating: 2.5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
      numberOfReviews: 5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
    },
    {
      // variation 2 - example : red shoes

      is_promotion: true || false, // if item has sale
      price: 100, // regular price
      sale_price: null, // sale price
      promotion_end: 1/1/2021, // date of the promotion end so i can parse it
      maxQuantity: 5, // maximum quantity per order

      sizes: [
        // i will conditionally render the sizes based on quantity left
        { id: 'size_id', value: 'S', quantity: 5 },
        { id: 'size_id', value: 'M', quantity: 2 },
        { id: 'size_id', value: 'L', quantity: 0 },
      ],

      images: [
        // the Images to be shown in the slider
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
        {
          id: 'id',
          url: 'imageUrl',
          zoomedImageUrl: 'zoomedImageUrl',
        },
      ],
      gallery: [
        // the Images to be shown below the after the product details(big images like noon.com) (optional)
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
        { id: 'id', url: 'imageUrl' },
      ],
      // we either have one rating for the whole product || or each variation has its own rating and reviews, here i'm implementing the variation version
      rating: 2.5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
      numberOfReviews: 5, // adding those to prevent making another request to the server and fetch the reviews, the user may not see the reviews
    },

],

details: {
// we either have one details for the whole product || or each variation has its own details, here i implenemented the whole product version
en: {
// please dont send me html , it's a pain the ass
description: 'a short or long description of the product', // the product description
features: ['feature 1', 'feature 2'],
// product features need to be a list of features
specifications: {
// any specifications like size and materials
width: '',
height: '',
size: '',
weight: '',
materials: ['wood', 'glass', 'cotton 100%'], // a list of materials
},
},
ar: {
// please dont send me html , it's a pain the ass
description: 'a short or long description of the product', // the product description
features: ['feature 1', 'feature 2'],
// product features need to be a list of features
specifications: {
// any specifications like size and materials
width: '',
height: '',
size: '',
weight: '',
materials: ['wood', 'glass', 'cotton 100%'], // a list of materials
},
},
},
}

```

```

```
