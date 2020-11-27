import axios from 'axios';

export const getItemsByType = async () => {
  // const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/`);
};
export const getHomeItems = async () => {
  const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/showcase`);
  if (res.data.status === true) {
    return res;
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
export const checkAuth = async mrgAuthToken => {
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/customer-informations`,
    config
  );
  if (res.data.status === true) {
    return { isAuthenticated: true, userData: res.data.data };
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
  const res = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_MAIN_URL}/customer-update`,
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
    params: {
      name: data.name,
      email: data.email,
    },
  });
  if (res.data.status === true) {
    return { userData: res.data.data };
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

// export const addUserAddress = async (newAddress) => {
//   const mrgAuthToken = localStorage.getItem('mrgAuthToken');
//   const config = {
//     headers: { Authorization: `Bearer ${mrgAuthToken}` },
//   };
//   const res = await axios.post(
//     `${process.env.REACT_APP_MAIN_URL}/customer-addresses`,
//     {

//     },
//     config
//   );
// }
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
  console.log(res);
  if (res.data.status === true) {
    return res.data.data;
  }
};
/**
 * End of SingleProduct
 */

/**
 * Cart Methods
 */

export const getCartItems = async (k, userId) => {
  // if (!userId) {

  // }
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/cart/${userId}`
  );
  if (res.data.success === 'Success') {
    return { cartItems: res.data.data };
  }
};
export const addToCart = async (data, userId) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const res = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_MAIN_URL}/cart/store/${userId}?qty=1&product=2&addons[size]=${data.size}&addons[color]=${data.color}`,
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
    // params: {
    //   qty: 1,
    //   product: data.id,
    //   addons: [],
    // },
  });
  console.log(res.data);
};
export const removeFromCart = async (id, cartId, userId) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const res = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_MAIN_URL}/cart/remove/${userId}`,
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
    params: {
      product: id,
      cart_id: cartId,
    },
  });
  console.log(res.data);
};
/**
 * End of Cart Methods
 */

/**
 * Category Products
 */
export const getCategoryProducts = async categorySlug => {
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
export const addToWishlist = async (id, userId) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');

  const res = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_MAIN_URL}/wishlist/store/${userId}`,
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
    params: {
      product: id,
    },
  });
  if (res.data.status === true) {
    return res.message;
  }
};
export const removeFromWishlist = async (id, userId) => {
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
