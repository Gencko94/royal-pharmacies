import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useInfiniteQuery, useQuery } from 'react-query';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import CategoryHeaderMobile from '../components/CategoryMobile/CategoryHeaderMobile';
import CategoryMobileItemGrid from '../components/CategoryMobile/CategoryMobileItemGrid';
import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import Layout from '../components/Layout';

import { getCategoryProducts, getSingleCategoryInfo } from '../Queries/Queries';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import { scrollTo } from 'scroll-js';
import { Helmet } from 'react-helmet';
import { DataProvider } from '../contexts/DataContext';
import MobileCartPopup from '../components/MobileCartPopup/MobileCartPopup';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { AuthProvider } from '../contexts/AuthContext';
import { useMediaQuery } from 'react-responsive';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function CategoryMobile() {
  const { userId } = useContext(AuthProvider);
  const { cartItems, guestCartItems } = useContext(CartAndWishlistProvider);
  const { category, id } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const {
    deliveryCountry,
    sideMenuOpen,
    settings,
    mobileCartPopupOpen,
  } = React.useContext(DataProvider);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });

  const [priceFilters, setPriceFilters] = React.useState(null);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 30,
    value: 30,
  });
  const [filters, setFilters] = React.useState([]);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const location = useLocation();
  const offers = new URLSearchParams(location.search).get('offers');
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });

  const checkShowCondition = () => {
    if (isTabletOrAbove) return false;
    if (sideMenuOpen) return false;
    if (userId) {
      if (cartItems?.length > 0) {
        return true;
      }
    } else {
      if (guestCartItems?.length > 0) {
        return true;
      } else if (mobileCartPopupOpen) {
        return true;
      }
    }
    return false;
  };
  React.useEffect(() => {
    const checkScrolling = () => {
      if (window.scrollY >= 200) {
        setInView(true);
      } else {
        setInView(false);
      }
    };
    window.addEventListener('scroll', checkScrolling);
    return () => {
      window.removeEventListener('scroll', checkScrolling);
    };
  });
  React.useEffect(() => {
    if (sortByOpen) setTimeout(() => setSortByOpen(false), 100);
    if (filtersOpen) setTimeout(() => setFiltersOpen(false), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  const {
    data,
    isLoading: productsLoading,
    error: productsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [
      'category-products',
      {
        resultsPerPage,
        id,
        brandFilters,
        priceFilters,
        sortBy,
        offers: offers === 't',
      },
    ],
    ({ pageParam }) => {
      return getCategoryProducts({
        resultsPerPage,
        id,
        brandFilters,
        priceFilters,
        sortBy,
        offers: offers === 't',
        pageParam,
      });
    },
    {
      retry: true,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  console.log(data);
  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    () => getSingleCategoryInfo(category),
    { retry: true, keepPreviousData: true }
  );

  const handleResultPerPageChange = selectedValue => {
    setResultsPerPage(selectedValue);
  };
  const handleRemoveFilters = filter => {
    setFilters(prev => {
      return prev.filter(i => i.value !== filter.value);
    });
    if (filter.type === 'Brand') {
      setBrandFilters(prev => {
        return prev.filter(i => i.label !== filter.value);
      });
    }
    if (filter.type === 'Sort') {
      setSortBy({
        value: 'newest',
        label: 'Newest',
      });
    }
    if (filter.type === 'Price') {
      setPriceFilters(null);
    }
  };
  const history = useHistory();

  const handleSortByChange = selectedValue => {
    if (selectedValue.value === 'newest') {
      setFilters(prev => {
        return prev.filter(i => i.type !== 'Sort');
      });
      setSortBy(selectedValue);
    }
    setFilters(prev => {
      let newArr = prev.filter(i => i.type !== 'Sort');
      newArr.push({ type: 'Sort', value: selectedValue.label });
      return newArr;
    });
    setSortBy(selectedValue);
    scrollTo(window, { top: 450, behavior: 'smooth' });
  };
  const handleSubmitFilters = (selectedPrice, selectedBrands) => {
    setBrandFilters(selectedBrands);
    setPriceFilters(selectedPrice);
    scrollTo(window, { top: 350, behavior: 'smooth' });
    setFilters(() => {
      if (selectedPrice && !selectedBrands.length > 0) {
        //if only price
        const priceFilter = {
          type: 'Price',
          value: `${formatMessage({ id: 'less-than' })} ${selectedPrice} ${
            deliveryCountry?.currency.translation[locale].symbol
          }`,
        };
        return [priceFilter];
      } else if (!selectedPrice && selectedBrands.length > 0) {
        // if only brands
        const brandsFilters = [];

        selectedBrands.forEach(brand =>
          brandsFilters.push({ type: 'Brand', value: brand.label })
        );
        return [...brandsFilters];
      } else {
        const priceFilter = {
          type: 'Price',
          value: `${formatMessage({ id: 'less-than' })} ${selectedPrice} ${
            deliveryCountry?.currency.translation[locale].symbol
          }`,
        };
        const brandsFilters = [];

        selectedBrands.forEach(brand =>
          brandsFilters.push({ type: 'Brand', value: brand.label })
        );
        return [priceFilter, ...brandsFilters];
      }
    });
  };

  if (productsError) {
    if (productsError.response.data.message === 'Category not founded') {
      return <Redirect to={`/${locale}/page/404`} />;
    }
  }
  return (
    <Layout>
      <Helmet>
        <title>
          {categoryInfo
            ? `${formatMessage({ id: 'shop' })} ${
                categoryInfo?.title[locale].name
              }`
            : settings?.store_name_en}
        </title>
      </Helmet>
      <div className="min-h-screen relative">
        <AnimatePresence>
          {cartMenuOpen && (
            <motion.div
              key="sidecart-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartMenuOpen(false)}
              className="side__addCart-bg"
            ></motion.div>
          )}
        </AnimatePresence>
        <CategoryHeaderMobile
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
          offers={offers}
        />
        <hr className="my-4" />

        <AnimateSharedLayout>
          <motion.div layout className="px-3">
            {filters.length !== 0 && (
              <>
                <motion.h1 layout className="text-lg  font-semibold">
                  {formatMessage({ id: 'filtered-by' })} :
                </motion.h1>
                <motion.div layout className="flex items-center flex-wrap">
                  {filters.map(item => {
                    return (
                      <motion.button
                        layout
                        className="m-1 text-sm py-1 font-semibold px-3 bg-main-color text-main-text rounded-full"
                        key={item.value}
                        onClick={() => handleRemoveFilters(item)}
                      >
                        {formatMessage({ id: item.type })} : {item.value}
                      </motion.button>
                    );
                  })}
                </motion.div>
                <hr className="my-3" />
              </>
            )}
          </motion.div>
        </AnimateSharedLayout>

        <CategoryMobileItemGrid
          data={data}
          productsLoading={productsLoading}
          setCartMenuOpen={setCartMenuOpen}
          handleResultPerPageChange={handleResultPerPageChange}
        />

        <hr className="my-2" />
        {data && hasNextPage && (
          <div className="flex my-2 justify-center">
            <button
              className="p-2 w-40 text-lg font-semibold flex items-center justify-center rounded bg-main-color text-main-text"
              onClick={() => {
                fetchNextPage();
              }}
            >
              {isFetchingNextPage ? (
                <Loader
                  type="ThreeDots"
                  color="#fff"
                  height={27}
                  width={27}
                  visible={true}
                />
              ) : (
                formatMessage({ id: 'show-more' })
              )}
            </button>
          </div>
        )}
        {data?.pages[0].products?.length === 0 && offers !== 't' && (
          <div className="p-6 flex flex-col items-center justify-center text-xl h-full">
            {formatMessage({ id: 'no-products' })}
          </div>
        )}
        {data?.pages[0].products?.length === 0 && offers === 't' && (
          <div className="p-6 flex flex-col items-center justify-center  h-full">
            <h1 className="text-xl font-bold text-center">
              {formatMessage({ id: 'no-offers' })}
            </h1>
            <h1 className="text-lg text-center">
              {formatMessage({ id: 'comeback-later' })}
            </h1>
            <button
              onClick={() =>
                history.push(`/${locale}/category/${category}/${id}`)
              }
              className="p-2 bg-main-color mt-2 text-main-text rounded text-sm "
            >
              {formatMessage({ id: 'go-to-products' })}
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {inView &&
          !cartMenuOpen &&
          !productsLoading &&
          !sideMenuOpen &&
          data?.pages[0].products.length !== 0 && (
            <SortInfoPanelMobile
              productsLoading={productsLoading}
              products={data?.products}
              brandFilters={brandFilters}
              setSortByOpen={setSortByOpen}
              setFiltersOpen={setFiltersOpen}
              filtersOpen={filtersOpen}
              sortByOpen={sortByOpen}
              sortBy={sortBy}
              handleSortByChange={handleSortByChange}
              priceFilters={priceFilters}
              brands={categoryInfo?.brands}
              handleSubmitFilters={handleSubmitFilters}
            />
          )}
      </AnimatePresence>
      <AnimatePresence>
        {checkShowCondition() && <MobileCartPopup />}
      </AnimatePresence>
    </Layout>
  );
}
