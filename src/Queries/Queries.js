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

export const searchBarSearch = async (value, cancelToken) => {
  console.log(cancelToken);
  try {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_MAIN_URL}/search-products`,
      params: { value: value, page: 1 },
      cancelToken: cancelToken.token,
    });
    console.log(res.data.data.data);
    return res.data.data.data;
  } catch (error) {
    if (axios.isCancel(error)) return [];
  }
};
