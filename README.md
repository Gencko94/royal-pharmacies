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
- [x] Add Coupon Support.
- [x] Complete desktop view order history.
- [x] Add Buy Options to SingleProduct in Desktop and Mobile View.
- [x] Add Loaders to Vertical Items.
- [x] Discuss Location handling with Maher.
- [x] Add default location support.
- [x] Localize Footers.
- [x] Add 404 page.

- [ ] Add Edit Cart item support. (discuss with maher)

- [x] Add a Review system for Mobile.(2hrs)

- [ ] Look into lazy loading and progressive images.

- [ ] Add React Query & Localizations to the Search page.

- [ ] Add Scroll Pagination to SingleProduct Pages.

- [x] Add auto Complete to the Search bar.(1hr)

- [ ] Complete the Checkout Page.(2hrs)

- [ ] Search Engine optimization.

- [x] Add keys to env variables.(0.5hr)

- [ ] Add auto detect locale and localstorage language.(1hr)

- [ ] Add delivery country context.(1hr)

- [x] Add Wishlist Page Desktop & Mobile.(3hrs) (discuss with maher)

- [x] Add React query to order history. (2.5hrs)

- [x] Add payment Method for Mobile & Desktop (3hrs) (discuss with maher)

- [x] Add Viewed Items for Mobile & Desktop (3hrs)

- [ ] Look into re-algothiming side menu (3hrs)

- [ ] Nest Lazyloading deep (3hrs)

- [x] Complete Profile Modal Desktop (3hrs)

- [ ] login and register number and password validation (discuss)

-[x] discuss change user Info (phoneNumber and email)

**API BUGS** userInfo Update, how the hell should i send a post body with a params supported api url -- NO ERROR HANDLING WHEN EMAIL EXISTS

**NOTES**

- [ ] Send back the Wishlist items after adding a new item.
- [ ] Each Product color should have its corresponding Size.
- [ ] Remove cartId condition from remove from cart
- [ ] Allow gif image upload in the dashboard

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
