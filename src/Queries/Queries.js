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
export const getFooterCategories = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/categories`);
  if (res.data.status === true) {
    return res.data.data;
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
export const getStaticSwiperData = async (k, type) => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/category-products/${type}`
  );
  if (res.data.status === true) {
    return res.data.data;
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
    lat: newAddress.lat.toString(),
    lng: newAddress.lng.toString(),
    marked_address: newAddress.addressDetails.markerAddress,
    address_name: newAddress.addressDetails.addressName,
    apartment_house_number: newAddress.addressDetails.apartmentOrHouseNumber,
    building_tower_number: newAddress.addressDetails.buildingOrTowerNumber,
    phone_number: newAddress.addressDetails.phoneNumber,
    addition_direction: newAddress.addressDetails.additionalDetails,
    as_default: newAddress.defaultLocation ? 1 : 0,
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
export const getSingleItem = async (k, id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/product/${id}`
  );
  if (res.data.status === true) {
    // const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));

    // const isItemInHistory = visitedItems.find(item => item.id === id);
    // if (!isItemInHistory) {
    //   visitedItems.push({ id });
    //   localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
    // }
    return res.data.data;
  }
};
export const getProductReviews = async (k, id) => {
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

export const getCartItems = async (k, userId, deliveryCountry, coupon) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry?.code,
    },
  };
  if (!localStorage.getItem('localCart')) {
    localStorage.setItem('localCart', JSON.stringify([]));
  }
  const localCart = JSON.parse(localStorage.getItem('localCart'));
  if (localCart.length === 0) {
    const res = await axios.post(
      `${process.env.REACT_APP_MAIN_URL}/cart/${userId}`,
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
    const res = await axios.post(
      `${process.env.REACT_APP_MAIN_URL}/cart/combine/${userId}`,
      { products: JSON.stringify(items) },
      config
    );
    if (res.data.status === true) {
      localStorage.setItem('localCart', JSON.stringify([]));
      return {
        cartItems: res.data.data.items,
        cartTotal: res.data.data.total,
        shippingCost: res.data.data.shipping_cost,
        cartSubtotal: res.data.data.subtotal,
        couponCost: res.data.data.coupon_cost,
        message: 'cart-combined',
      };
    }
  }
};

export const addToCart = async ({ newItem, userId, deliveryCountry }) => {
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

export const editCart = async ({ cartId, itemId, quantity, userId }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/cart/update/${userId}`,
    {
      cart_id: cartId,
      product: itemId,
      qty: quantity,
    }
  );
  if (res.data.status === true) {
    return true;
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
    return res.data.data;
  }
};
/**
 * End of Cart Methods
 */

/**
 * Guest Cart Methods
 */

export const getGuestCartItems = async (k, deliveryCountry) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };
  if (!localStorage.getItem('localCart')) {
    localStorage.setItem('localCart', JSON.stringify([]));
  }
  const localCart = JSON.parse(localStorage.getItem('localCart'));
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
    console.log(JSON.stringify(items));
    const res = await axios.post(
      `${process.env.REACT_APP_MAIN_URL}/guest-cart`,
      { cart: JSON.stringify(items) },
      config
    );
    console.log(res.data);
    if (res.data.status === true) {
      return {
        cartItems: res.data.data.items,
        cartTotal: res.data.data.total,
        cartSubtotal: res.data.data.subtotal,
        shippingCost: res.data.data.shipping_cost,
        coupon_cost: res.data.data.coupon_cost,
      };
    }
  }
};
export const addToGuestCart = async ({ newItem, deliveryCountry }) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('localCart');
  if (!localCart) {
    localStorage.setItem('localCart', JSON.stringify([]));
  }
  const parsed = JSON.parse(localCart);

  const isAvailable = item => {
    if (
      item.variation?.item_id === newItem.variation?.item_id &&
      item.option?.item_id === newItem.option?.item_id
    ) {
      return true;
    } else if (
      item.id === newItem.id &&
      (!newItem.variation || !newItem.option)
    ) {
      return true;
    }
  };
  const foundIndex = parsed.findIndex(isAvailable);
  if (foundIndex !== -1) {
    parsed[foundIndex].quantity = parsed[foundIndex].quantity + 1;
    localStorage.setItem('localCart', JSON.stringify(parsed));
  } else {
    parsed.push(newItem);
    localStorage.setItem('localCart', JSON.stringify(parsed));
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
    { cart: JSON.stringify(items) },
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

export const removeFromGuestCart = async ({ sku, deliveryCountry }) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('localCart');
  let parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === sku) {
      return false;
    }
    return true;
  };
  parsed = parsed.filter(isAvailable);
  console.log(parsed);
  if (parsed.length === 0) {
    localStorage.setItem('localCart', JSON.stringify(parsed));
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
    { cart: JSON.stringify(items) },
    config
  );
  if (res.data.status === true) {
    localStorage.setItem('localCart', JSON.stringify(parsed));
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
}) => {
  //TODO
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('localCart');
  let parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === sku) {
      return false;
    }
    return true;
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
    { cart: JSON.stringify(items) },
    config
  );
  if (res.data.status === true) {
    localStorage.setItem('localCart', JSON.stringify(parsed));
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
export const getSingleCategoryInfo = async (k, categorySlug) => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/category/${categorySlug}`
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
/**
 * End of Single Category Info
 */
/**
 * Category Products
 */
export const getCategoryProducts = async (k, categorySlug) => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/category-products/${categorySlug}`
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getCategories = async categorySlug => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/category/${categorySlug}`
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const sortCategories = async query => {
  const req = {
    page: query.page,
    category: query.category,
    sort_by: query.sortBy,
    sort_language: query.sort_language,
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
export const getWishlistItems = async (k, userId) => {
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

export const getSocialMediaData = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/setting/social-media`
  );
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
export const checkout = async ({ deliveryCountry, order }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry.code,
    },
  };
  const res = await axios.post(
    `${process.env.REACT_APP_MAIN_URL}/new-order-customer`,
    { ...order },
    config
  );
  if (res.data.status === true) {
    return res.data;
  }
};

export const getVisitedItems = async () => {
  let localVisited = localStorage.getItem('visitedItems');
  let parsed = JSON.parse(localVisited);
  if (parsed.length === 0) {
    return [];
  }
  localVisited = parsed.map(i => i.id);
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

export const searchProducts = async (k, query) => {
  const res = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_MAIN_URL}/search-products`,
    params: { value: query, page: 1 },
  });
  if (res.data.status === true) {
    return res.data.data.data;
  }
};
