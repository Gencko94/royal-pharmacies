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

- [ ] Add forgot password support .

- [x] Add routes to account page and try to animate them.

- [ ] Add Edit Cart item support.

- [x] Add Coupon Support.

- [ ] Look into lazy loading and progressive images.

- [x] Complete desktop view order history.

- [ ] Add React query to order history.

- [ ] Add Wishlist Page.

- [ ] Add React Query & Localizations to the Search page.

- [ ] Add Buy Options to SingleProduct in Desktop and Mobile View.

- [ ] Add Scroll Pagination to SingleProduct Pages.

- [ ] Add auto Complete to the Search bar.

- [ ] Complete the Checkout Page.

- [x] Add Loaders to Vertical Items.

- [ ] Search Engine optimization.

- [ ] Add 404 page.

- [x] Discuss Location handling with Maher.

- [x] Add default location support.

- [ ] Add keys to env variables.

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
responseObject = {
 en: {
  id: id,
  url : String,
  link: String
 },
  ar: {
  id: id,
  url : String,
  link: String
 }
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
- It's going to be an array of at least **7 Items**.
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
