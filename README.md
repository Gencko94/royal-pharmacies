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

- [ ] Add Wishlist Page Desktop & Mobile.(3hrs) (discuss with maher)

- [x] Add React query to order history. (2.5hrs)

- [ ] Add payment Method for Mobile & Desktop (3hrs) (discuss with maher)

- [x] Add Viewed Items for Mobile & Desktop (3hrs)

- [ ] Look into re-algothiming side menu (3hrs)

- [ ] Nest Lazyloading deep (3hrs)

- [ ] Complete Profile Modal Desktop (3hrs)

- [ ] login and register number and password validation (discuss)

-[ ] discuss change user Info (phoneNumber and email)

**API BUGS** userInfo Update, how the hell should i send a post body with a params supported api url -- NO ERROR HANDLING WHEN EMAIL EXISTS

# MRG API Structure :

## 1. Home page :

- ### 1. **_Main Slider_** :
  Image Sizes should be :
  - Desktop :
    - **Width** : from **1366px** up to **1566px**,
    - **Height**: from **300px** up to **400px**.
  - Mobile :
    - **Width** : **800px,**
    - **Height**: **300px**.

Feel free to Choose between one of the Two Variations :

1. **Two Routes** for **Desktop** and **Mobile** : (_Recommended_)
   - **Desktop Route**
   - **Mobile Route**
2. **One Route** that supports the two viewports

- The response Object should be somewhat similar to this :

```
requestObject = {
              lat: Number | String,
              lng: Number | String,
              defaultLocation: Boolean,
              addressDetails: {
                markerAddress: String,
                apartmentOrHouseNumber: Number | String,
                buildingOrTowerNumber: Number | String,
                phoneNumber: String,
                additionalDetails: String, (Not Required)
              },
            }

```

- ### 2. Item Slider: (ex: _BestSellers or Mobile Items.._ )
- It's going to be an array of at least **7 Items**.
- Desktop and Mobile are the same.
- This Route Should return a list of product Items.
- The returned Image Should be :
  - Width: **286px MAX**
  - Height: Same as Width for rectangle Images or **MAX** **210px** .
- The response Object should be somewhat similar to this :

```
responseObject = {
 status:'ok',
 data: [
  {
   id: id,
   name : String,
   brand: String (optional),
   url: String,
   seoTitle or slug : String (This should mention also the item category for SEO purposes),
   sale: Boolean, (if the Item has sale on not),
   price: String || Number,
   priceAfterSale: String || Number,
   salePercent:String,
   image: url,
   ... any additional extras, Those were just the Basics
  }
 ],

}

```

- ### 3. Category Slider:
- It's going to be an array of at least **4 Items**.
- Desktop and Mobile are the same.
- This Route Should return an array of Photo Categories.
- Each Photo Category Contains a **Main Title**, **URL** ,**Link**, **Background Image** and **SubCategories** (_Either 3 or 4 Sub Categories_ ). The Category Background Image Should match :

  - Width: **1110px MAX**
  - Height: Same as Width for rectangle Images or **400px MAX** .

- a Sub Category contains a **Photo URL**(PNG), a **Link**, a **Background color Property that matches the Parent Category Image background Color** (eg : if the Parent Category image background is blue the subcategories image background should be the same hex code ), and a **Title**. The SubCategory Photo Should match :

  - Width: **270px**
  - Height: Same as Width for rectangle Images or **150px** .

- The response Object should be somewhat similar to this :

```
responseObject = {
 status:'ok',
 data: [
  {
   id: id,
   title: String,
   backgroundImage: url,
   link: String,
   subCategories :[
	{
		id:id,
		title,String,
		backgroundColor:String(hex),
		link:String
	},
	{
		id:id,
		title,String,
		backgroundColor:String(hex),
		link:String
	},
	...
   ]
  }
 ],

}

```

- ### 4. Banners
  - an Image that size is the same as the Main Slider Image
    - Desktop :
    - **Width** : from **1366px** up to **1566px**,
    - **Height**: from **300px** up to **400px**.
    - Mobile :
    - **Width** : **800px,**
    - **Height**: **300px**.

## 2. Single Product :

- The response Object should be somewhat similar to this :

```
responseObject = {
 status:'ok',
 data: [
  {
   id: id,
   title: String,
   brand:String,(optional)
   sale:Boolean,
   salePercent:String,
   price: String || Number,
   PriceAfterSale:String || Number,
   description: feel free to shape this out,
   addons : [
	   sizes: {
		   supported: String[an array of supported Sizes],
		   available: String[an array of available Sizes]
	   },
	   colors :{
	    supported: img[an array of supported Sizes (preferabley Images )],
	    available: img[an array of available Sizes]
	   }
	]
   rating: Number,
   reviews:[
	{
		id:id,
		title,String,
		backgroundColor:String(hex),
		link:String
	},
	{
		id:id,
		title,String,
		backgroundColor:String(hex),
		link:String
	},
	...
   ]
  }
 ],

}

```
