import axios from 'axios';

export const getItemsByType = async () => {
  // const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/`);
};
export const getAllCategories = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/categories`);
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getFooterData = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/footer-menus`);
  if (res.data.status === true) {
    return {
      categories: res.data.data['footer-1'],
      pages: res.data.data['footer-2'],
    };
  }
};
export const getHomeItems = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/showcase-list`
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getStaticSwiperData = async type => {
  if (type === 'latest_products') {
    const res = await axios.get(
      `${process.env.REACT_APP_MAIN_URL}/new-arrival`
    );
    if (res.data.status === true) {
      return {
        products: res.data.data.data,
        title: {
          en: {
            name: 'New Arrivals',
          },
          ar: {
            name: 'جديدنا من المنتجات',
          },
        },
      };
    }
  } else if (type === 'best_seller') {
    const res = await axios.get(
      `${process.env.REACT_APP_MAIN_URL}/best-sellers`
    );
    if (res.data.status === true) {
      return {
        products: res.data.data.data,
        title: {
          en: {
            name: 'Best Sellers',
          },
          ar: {
            name: 'الأكثر مبيعا',
          },
        },
      };
    }
  } else {
    const res = await axios.get(
      `${process.env.REACT_APP_MAIN_URL}/category-products/${type}?page=${1}`
    );
    if (res.data.status === true) {
      return {
        products: res.data.data.products.data,
        title: res.data.data.translation,
        slug: res.data.data.slug,
      };
    }
  }
};
export const getMainCarouselItems = async (key, desktop) => {
  let type = desktop ? 'desktop' : 'mobile';
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_MAIN_URL}/slideshow-${type}`
    );
    if (res.data.status === true) {
      return res.data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Authentication Queries
 */
export const userRegister = async data => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/customer-register`,
    data
  );
  if (res.data.status === true) {
    return res.data;
  }
};
export const userLogin = async data => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/customer-login`,
    data
  );
  if (res.data.status === true) {
    return res.data;
  }
};
export const checkAuth = async () => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/customer-informations`,
    config
  );
  if (res.data.status === true) {
    return { userData: res.data.data };
  }
};
/**
 * End of Authentication Queries
 */
/**
 * UserProfile
 */
export const getUserProfileInfo = async () => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/customer-informations`,
    config
  );
  if (res.data.status === true) {
    return { userData: res.data.data };
  }
};
export const editUserProfileInfo = async data => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };

  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/customer-update`,
    {
      name: data.name,
      email: data.email,
    },
    config
  );
  if (res.data.status === true) {
    return { userData: res.data.data };
  }
};
export const changeUserPassword = async data => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/customer-update-password`,
    {
      current_password: data.oldPassword,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    },
    config
  );
  if (res.data.status === true) {
    return { message: 'Password Changed' };
  }
};
export const requestPasswordReset = async ({ phoneNumber }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/customer-forgot-password`,
    {
      mobile: phoneNumber,
    }
  );
  if (res.data.status === true) {
    return { message: 'success' };
  }
};
export const resetUserPassword = async ({
  phoneNumber,
  token,
  newPassword,
}) => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/customer-reset-password`,
    {
      token,
      mobile: phoneNumber,
      password: newPassword,
      password_confirmation: newPassword,
    }
  );
  if (res.data.status === true) {
    return { message: 'your password has been successfully changed' };
  }
};

/**
 * End of User Profile
 */
/**
 * Addresses
 */
export const getUserAddresses = async () => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/customer-addresses`,
    config
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};

export const addUserAddress = async newAddress => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const address = {
    lat: newAddress.lat?.toString(),
    lng: newAddress.lng?.toString(),
    marked_address: newAddress.addressDetails.markerAddress || '',
    address_name: newAddress.addressDetails.addressName,
    apartment_house_number: newAddress.addressDetails.apartmentOrHouseNumber,
    building_tower_number: newAddress.addressDetails.buildingOrTowerNumber,
    phone_number: newAddress.addressDetails.phoneNumber,
    addition_direction: newAddress.addressDetails.additionalDetails,
    as_default: newAddress.defaultLocation ? 1 : 0,
    userTyped_address: newAddress.addressDetails.userTyped_address || null,
    type: newAddress.lat ? 'map' : 'text',
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/customer-add-address`,
    address,
    config
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const removeUserAddress = async id => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };

  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/customer-delete-address/${id}`,

    config
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
/**
 * End of Addresses
 */

/**
 * Single Product
 */
export const getSingleItem = async id => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/product/${id}`
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getProductReviews = async id => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/product-reviews/${id}`
  );
  if (res.data.status === true) {
    return {
      reviews: res.data.data.list,
      averageRating: res.data.data.avg,
      ratingCount: res.data.data.count,
    };
  }
};
/**
 * End of SingleProduct
 */

/**
 * Cart Methods
 */

export const getCartItems = async (userId, deliveryCountry, coupon) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry?.code,
    },
  };
  if (!localStorage.getItem('lclc')) {
    localStorage.setItem('lclc', JSON.stringify([]));
  }
  const localCart = JSON.parse(localStorage.getItem('lclc'));
  if (localCart.length === 0) {
    const res = await axios.post(
      `${process.env.REACT_APP_MAIN_URL}/cart/clean/${userId}`,
      { coupon },
      config
    );

    if (res.data.status === true && res.data.data.items) {
      return {
        cartItems: res.data.data.items,
        cartTotal: res.data.data.total,
        shippingCost: res.data.data.shipping_cost,
        cartSubtotal: res.data.data.subtotal,
        couponCost: res.data.data.coupon_cost,
        note: res.data.data.note,
      };
    } else if (res.data.status === true && res.data.data) {
      return { cartItems: [], cartTotal: 0 };
    }
  } else {
    let items = [];
    localCart.forEach(item => {
      items.push({
        id: item.id,
        qty: item.quantity,
        price: item.price,
        options: {
          addons: {
            [item.variation?.id]: item.variation?.item_id,
            [item.option?.id]: item.option?.item_id,
          },
          sku: item.sku,
        },
      });
    });
    const combined = await axios.post(
      `${process.env.REACT_APP_MAIN_URL}/cart/combine/${userId}`,
      { products: JSON.stringify(items), coupon },
      config
    );
    if (combined.data) {
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/cart/clean/${userId}`,
        { coupon },
        config
      );
      if (res.data.status === true) {
        localStorage.setItem('lclc', JSON.stringify([]));
        return {
          cartItems: res.data.data.items,
          cartTotal: res.data.data.total,
          shippingCost: res.data.data.shipping_cost,
          cartSubtotal: res.data.data.subtotal,
          couponCost: res.data.data.coupon_cost,
          message: 'cart-combined',
          note: res.data.data.note,
        };
      }
    }
  }
};

export const addToCart = async ({
  newItem,
  userId,
  deliveryCountry,
  coupon,
}) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry.code,
    },
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/cart/store/${userId}`,
    {
      qty: newItem.quantity,
      product: newItem.id,
      addons: {
        [newItem.variation?.id]: newItem.variation?.item_id,
        [newItem.option?.id]: newItem.option?.item_id,
      },
      coupon,
    },
    config
  );
  if (res.data.status === true) {
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      shippingCost: res.data.data.shipping_cost,
      cartSubtotal: res.data.data.subtotal,
      couponCost: res.data.data.coupon_cost,
    };
  }
};
export const removeFromCart = async ({
  id,
  cart_id,
  userId,
  deliveryCountry,
  coupon,
}) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry.code,
    },
  };

  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/cart/remove/${userId}`,
    {
      product: id,
      cart_id,
      coupon,
    },
    config
  );
  if (res.data.status === true) {
    if (res.data.data.total === 0) {
      return { cartItems: [], cartTotal: 0 };
    }
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      shippingCost: res.data.data.shipping_cost,
      cartSubtotal: res.data.data.subtotal,
      couponCost: res.data.data.coupon_cost,
    };
  }
};

export const editCart = async ({
  cartId,
  itemId,
  quantity,
  userId,
  coupon,
}) => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/cart/update/${userId}`,
    {
      cart_id: cartId,
      product: itemId,
      qty: quantity,
      coupon,
    }
  );
  if (res.data.status === true) {
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      shippingCost: res.data.data.shipping_cost,
      cartSubtotal: res.data.data.subtotal,
      couponCost: res.data.data.coupon_cost,
    };
  }
};
export const checkCoupon = async ({ code, subtotal }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/check-coupon`,
    {
      code,
      subtotal,
    }
  );
  if (res.data.status === true) {
    return {
      code: res.data.data.code,
    };
  }
};
/**
 * End of Cart Methods
 */

/**
 * Guest Cart Methods
 */

export const getGuestCartItems = async (deliveryCountry, coupon) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };
  if (!localStorage.getItem('lclc')) {
    localStorage.setItem('lclc', JSON.stringify([]));
  }
  const localCart = JSON.parse(localStorage.getItem('lclc'));
  if (localCart.length === 0) {
    return {
      cartItems: [],
      cartTotal: 0,
      shippingCost: 0,
      cartSubtotal: 0,
      couponCost: 0,
    };
  } else {
    let items = [];
    localCart.forEach(item => {
      items.push({
        id: item.id,
        qty: item.quantity,
        price: item.price,
        options: {
          addons: {
            [item.variation?.id]: item.variation?.item_id,
            [item.option?.id]: item.option?.item_id,
          },
          sku: item.sku,
        },
      });
    });

    const res = await axios.post(
      `${process.env.REACT_APP_MAIN_URL}/guest-cart`,
      { cart: JSON.stringify(items), coupon },
      config
    );
    if (res.data.status === true) {
      // if an item is out of stock remove it from local cart
      //or its not founded in the db
      const cartItems = res.data.data.items;

      let outofStockItems = [];
      cartItems.forEach(cartItem => {
        if (
          cartItem.options?.max_quantity === 0 ||
          cartItem.message === 'Product not founded'
        ) {
          outofStockItems.push(cartItem.options?.sku || cartItem.sku);
        }
      });
      if (outofStockItems.length > 0) {
        const newLocal = localCart.filter(
          localItem => !outofStockItems.includes(localItem.sku)
        );
        let items = [];
        newLocal.forEach(item => {
          items.push({
            id: item.id,
            qty: item.quantity,
            price: item.price,
            options: {
              addons: {
                [item.variation?.id]: item.variation?.item_id,
                [item.option?.id]: item.option?.item_id,
              },
              sku: item.sku,
            },
          });
        });
        localStorage.setItem('lclc', JSON.stringify(newLocal));
        const res = await axios.post(
          `${process.env.REACT_APP_MAIN_URL}/guest-cart`,
          { cart: JSON.stringify(items), coupon },
          config
        );
        return {
          cartItems: res.data.data.items,
          cartTotal: res.data.data.total,
          cartSubtotal: res.data.data.subtotal,
          shippingCost: res.data.data.shipping_cost,
          coupon_cost: res.data.data.coupon_cost,
        };
      } else {
        return {
          cartItems: res.data.data.items,
          cartTotal: res.data.data.total,
          cartSubtotal: res.data.data.subtotal,
          shippingCost: res.data.data.shipping_cost,
          coupon_cost: res.data.data.coupon_cost,
        };
      }
    }
  }
};
export const addToGuestCart = async ({ newItem, deliveryCountry, coupon }) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('lclc');
  if (!localCart) {
    localStorage.setItem('lclc', JSON.stringify([]));
  }
  const parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === newItem.sku) {
      return true;
    }
    return false;
  };
  const foundIndex = parsed.findIndex(isAvailable);
  if (foundIndex !== -1) {
    parsed[foundIndex].quantity = parsed[foundIndex].quantity + 1;
    localStorage.setItem('lclc', JSON.stringify(parsed));
  } else {
    parsed.push(newItem);
    localStorage.setItem('lclc', JSON.stringify(parsed));
  }

  let items = [];
  parsed.forEach(item => {
    items.push({
      id: item.id,
      qty: item.quantity,
      price: item.price,
      options: {
        addons: {
          [item.variation?.id]: item.variation?.item_id,
          [item.option?.id]: item.option?.item_id,
        },
        sku: item.sku,
      },
    });
  });
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/guest-cart`,
    { cart: JSON.stringify(items, null, 4), coupon },
    config
  );
  if (res.data.status === true) {
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      cartSubtotal: res.data.data.subtotal,
      shippingCost: res.data.data.shipping_cost,
      coupon_cost: res.data.data.coupon_cost,
    };
  }
};

export const removeFromGuestCart = async ({ sku, deliveryCountry, coupon }) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('lclc');
  let parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === sku) {
      return false;
    }
    return true;
  };
  parsed = parsed.filter(isAvailable);
  if (parsed.length === 0) {
    localStorage.setItem('lclc', JSON.stringify(parsed));
    return {
      cartItems: [],
      cartTotal: 0,
      cartSubtotal: 0,
      shippingCost: 0,
      coupon_cost: 0,
    };
  }
  let items = [];
  parsed.forEach(item => {
    items.push({
      id: item.id,
      qty: item.quantity,
      price: item.price,
      options: {
        addons: {
          [item.variation?.id]: item.variation?.item_id,
          [item.option?.id]: item.option?.item_id,
        },
        sku: item.sku,
      },
    });
  });
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/guest-cart`,
    { cart: JSON.stringify(items), coupon },
    config
  );
  if (res.data.status === true) {
    localStorage.setItem('lclc', JSON.stringify(parsed));
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      cartSubtotal: res.data.data.subtotal,
      shippingCost: res.data.data.shipping_cost,
      coupon_cost: res.data.data.coupon_cost,
    };
  }
};
export const editGuestCart = async ({
  sku,
  quantity,
  price,
  deliveryCountry,
  coupon,
}) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('lclc');
  let parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === sku) {
      return true;
    }
    return false;
  };
  let foundItemIndex = parsed.findIndex(isAvailable);
  if (foundItemIndex === -1) {
    throw new Error('Something went wrong');
  }
  parsed[foundItemIndex].quantity = quantity;
  parsed[foundItemIndex].price = price * quantity;
  let items = [];
  parsed.forEach(item => {
    items.push({
      id: item.id,
      qty: item.quantity,
      price: item.price,
      options: {
        addons: {
          [item.variation?.id]: item.variation?.item_id,
          [item.option?.id]: item.option?.item_id,
        },
        sku: item.sku,
      },
    });
  });
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/guest-cart`,
    { cart: JSON.stringify(items), coupon },
    config
  );
  if (res.data.status === true) {
    localStorage.setItem('lclc', JSON.stringify(parsed));
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      cartSubtotal: res.data.data.subtotal,
      shippingCost: res.data.data.shipping_cost,
      coupon_cost: res.data.data.coupon_cost,
    };
  }
};

/**
 * Single Category info
 */
export const getSingleCategoryInfo = async categorySlug => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/category/${categorySlug}`
  );
  if (res.data.status === true) {
    if (res.data.data.parent_slug) {
      const parentRes = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/category/${res.data.data.parent_slug}`
      );
      return {
        id: res.data.data.id,
        brands: res.data.data.brands,
        children: res.data.data.children,
        title: res.data.data.translation,
        slug: res.data.data.slug,
        coverDesktop: res.data.data.cover_desktop,
        coverMobile: res.data.data.cover_mobile,
        parentChildren: parentRes.data.data.children,
      };
    }
    return {
      id: res.data.data.id,
      brands: res.data.data.brands,
      children: res.data.data.children,
      title: res.data.data.translation,
      slug: res.data.data.slug,
      coverDesktop: res.data.data.cover_desktop,
      coverMobile: res.data.data.cover_mobile,
    };
  }
};
/**
 * End of Single Category Info
 */
/**
 * Category Products
 */
export const getCategoryProducts = async ({
  page,
  id,
  resultsPerPage,
  brandFilters,
  sortBy,
  search,
  priceFilters,
  offers,
}) => {
  let brands = brandFilters?.map(i => i.id);
  const query = {
    category: id,
    brand: brandFilters.length !== 0 ? brands : undefined,
    sort_by: sortBy ? sortBy.value : undefined,
    page,
    number: resultsPerPage?.value,
    search,
    offers: offers && 'true',
    range_price: priceFilters ? priceFilters : undefined,
  };
  // const res = await axios.get(
  //   `${process.env.REACT_APP_MAIN_URL}/category-products/${category}?page=${page}&number=${resultsPerPage?.value}`
  // );
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/filter-products`,
    query
  );
  if (res.data.status === true) {
    return {
      products: res.data.data.products.data,
      currentPage: res.data.data.products.current_page,
      lastPage: res.data.data.products.last_page,
    };
  }
};
export const filterProducts = async ({
  category,
  brandFilters,
  sortBy,
  search,
  page,
  resultsPerPage,
  locale,
  priceFilters,
}) => {
  let brands = brandFilters?.map(i => i.id);
  const query = {
    category,
    brand: brandFilters.length !== 0 ? brands : undefined,
    sort_by: sortBy ? sortBy.value : undefined,
    page,
    number: resultsPerPage?.value,
    search,
    range_price: priceFilters ? priceFilters : undefined,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/filter-products`,
    query
  );

  if (res.data.status === true) {
    return {
      filteredProducts: res.data.data.products.data,
      currentPage: res.data.data.products.current_page,
      lastPage: res.data.data.products.last_page,
    };
  }
};
export const getDeals = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/deals`);
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getNavCategories = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/menu/navigation`
  );

  if (res.data.status === true) {
    return res.data.data;
  }
};
export const sortCategories = async ({ query }) => {
  const req = {
    page: query.page,
    category: query.category,
    sort_by: query?.sortBy,
    sort_language: query.sort_language,
    brand: query.brand,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/filter-products`,
    req
  );
  if (res.data.status === true) {
    return res.data.data.data;
  }
};
/**
 * End of Category Products
 */

/**
 * WishList
 */
export const getWishlistItems = async userId => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/wishlist/${userId}`
  );
  if (res.data.status === true) {
    return { wishlistItems: res.data.data };
  }
};
export const addToWishlist = async ({ id, userId }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/wishlist/store/${userId}`,
    { product: id },
    config
  );

  if (res.data.status === true) {
    return { wishlistItems: res.data.data };
  }
};
export const removeFromWishlist = async ({ id, userId }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');

  const res = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_MAIN_URL}/wishlist/remove/${userId}`,
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
    params: {
      product: id,
    },
  });
  if (res.data.status === true) {
    return id;
  }
};
/**
 * End of Wishlist
 */

/**
 * Settings
 */

export const getSiteSettings = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/settings`);
  if (res.data.status === true) {
    return res.data.data;
  }
};

export const getDeliveryCountries = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/countries`);
  if (res.data.status === true) {
    return res.data.data;
  }
};

/**
 * User Orders
 */

export const getUserOrders = async () => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/orders`,

    config
  );

  if (res.data.status === true) {
    return res.data.data;
  }
};
export const checkout = async ({ deliveryCountry, order, coupon }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry.code,
    },
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/new-order-customer`,
    { ...order, coupon },
    config
  );
  if (res.data.status === true) {
    return res.data;
  }
};
export const guestCheckout = async ({ deliveryCountry, order, coupon }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry.code,
    },
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/new-order-guest`,
    { ...order, coupon },
    config
  );
  if (res.data.status === true) {
    return res.data;
  }
};

export const getVisitedItems = async () => {
  let localVisited = localStorage.getItem('browse-history');
  let parsed = JSON.parse(localVisited);
  if (parsed.length === 0) {
    return [];
  }
  localVisited = parsed.map(i => i.id).slice(0, 25);
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/multiple-product`,
    { products: localVisited }
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};

/**
 * Search Products
 */

export const searchProducts = async ({ query, page, resultsPerPage }) => {
  const res = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_MAIN_URL}/search-products`,
    params: { value: query, page, number: resultsPerPage?.value },
  });
  if (res.data.status === true) {
    return {
      products: res.data.data.data,
      currentPage: res.data.data.current_page,
      lastPage: res.data.data.last_page,
    };
  }
};

export const getBestSellers = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/best-sellers`);
  if (res.data.status === true) {
    return res.data.data.data;
  }
};

/**
 * Custom Categories
 */

export const getCustomCategoriesData = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/`);
  if (res.data.status === true) {
    return res.data.data.data;
  }
};
export const getSingleBrandProducts = async ({ slug, page, number }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/brand/${slug}?page=${page}&number=${number}`
  );
  console.log(res.data);
  if (res.data.status) {
    console.log('ok');
    return {
      products: res.data.data.products.data,
      brandName: res.data.data.translation,
      brandLogo: res.data.data.logo?.link,
      pageCount: res.data.data.products.last_page,
    };
  }
};

export const getStaticPage = async page => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/page/${page}`);
  if (res.data.status === true) {
    return res.data.data.translation;
  }
};
export const trackGuestOrder = async ({ phoneNumber }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/guest-orders`,
    { mobile: phoneNumber, number: 10, page: 1 }
  );
  if (res.data.status === true) {
    return {
      orders: res.data.data.data,
      currentPage: res.data.data.current_page,
      lastPage: res.data.data.last_page,
    };
  }
};
export const getSingleGuestOrder = async id => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/guest-single-order`,
    { id }
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const addProductReview = async ({ id, rating, review }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
    },
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/product-store-reviews`,
    { product_id: id, rating, review },
    config
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
