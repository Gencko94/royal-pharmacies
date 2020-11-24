import axios from 'axios';
export const getItemsByType = async () => {
  // const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}/`);
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
