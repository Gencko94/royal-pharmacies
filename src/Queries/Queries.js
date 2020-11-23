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
    console.log(error.message);
    throw new Error(error);
  }
};
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
    return { isAuthenticated: true };
  } else {
    throw new Error('Not Authenticated');
  }
};
