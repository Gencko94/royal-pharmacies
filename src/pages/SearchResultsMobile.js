import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CategoryMobileItemGrid from '../components/CategoryMobile/CategoryMobileItemGrid';
import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import Layout from '../components/Layout';
import { searchProducts } from '../Queries/Queries';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuItemMobile';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { scrollTo } from 'scroll-js';
import { DataProvider } from '../contexts/DataContext';
import MobileCartPopup from '../components/MobileCartPopup/MobileCartPopup';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { AuthProvider } from '../contexts/AuthContext';
import { useMediaQuery } from 'react-responsive';

export default function SearchResultsMobile() {
  const { query } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: 'Newest',
  });

  const [priceFilters, setPriceFilters] = React.useState(null);
  const [filters, setFilters] = React.useState([]);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 20,
    value: 20,
  });
  const { userId } = useContext(AuthProvider);
  const { cartItems, guestCartItems } = useContext(CartAndWishlistProvider);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const {
    deliveryCountry,
    sideMenuOpen,
    mobileCartPopupOpen,
  } = React.useContext(DataProvider);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });

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

    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [
      'searchProducts',
      { query, resultsPerPage, priceFilters, brandFilters, sortBy },
    ],
    ({ pageParam }) =>
      searchProducts({
        query,
        resultsPerPage,
        pageParam,
        brandFilters,
        priceFilters,
        sortBy,
      }),
    {
      retry: true,
      getNextPageParam: lastPage => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const handleResultPerPageChange = selectedValue => {
    setResultsPerPage(selectedValue);
  };
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
      setFilters(prev => {
        return prev.filter(i => i.type !== 'Price');
      });
    }
  };

  const handleSortByChange = selectedValue => {
    if (selectedValue.value === 'newest') {
      setFilters(prev => {
        return prev.filter(i => i.type !== 'Sort');
      });
      setSortBy(selectedValue);
      return;
    }
    setFilters(prev => {
      let newArr = prev.filter(i => i.type !== 'Sort');
      newArr.push({ type: 'Sort', value: selectedValue.label });
      return newArr;
    });
    setSortBy(selectedValue);
  };

  const handleSubmitFilters = (selectedPrice, selectedBrands) => {
    setBrandFilters(selectedBrands);
    setPriceFilters(selectedPrice);
    scrollTo(window, { top: 300, behavior: 'smooth' });
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

  const resolvePlural = () => {
    switch (data?.pages[0].products?.length) {
      case 1:
        return formatMessage({ id: 'one-search-result' });

      case 2:
        return formatMessage({ id: 'two-search-results' });

      case data?.pages[0].products?.length > 10 &&
        data?.pages[0].products?.length:
        return formatMessage({ id: 'more-than-10-search-results' });
      default:
        return formatMessage({ id: 'search-results' });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen relative">
        <AnimatePresence>
          {cartMenuOpen && (
            <SideCartMenuMobile
              key="side-cart"
              setSideMenuOpen={setCartMenuOpen}
            />
          )}
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
        {filters.length > 0 || data?.pages[0].products.length > 0 ? (
          <div className="mb-1">
            <div className="px-3 pt-3">
              <h1 className="font-semibold text-lg">
                {data?.pages[0].products?.length > 2 &&
                  data?.pages[0].products?.length}{' '}
                {resolvePlural()} <strong>{query}</strong>
              </h1>
            </div>
          </div>
        ) : null}

        <AnimateSharedLayout>
          <motion.div layout className="px-3">
            {filters.length !== 0 && (
              <>
                <motion.h1 layout className=" mb-1 font-semibold">
                  {formatMessage({ id: 'filtered-by' })} :
                </motion.h1>
                <motion.div layout className="flex items-center">
                  {filters.map(item => {
                    return (
                      <motion.button
                        layout
                        className="mx-1 py-1 px-3 bg-main-color text-main-text rounded-full"
                        key={item.value}
                        onClick={() => handleRemoveFilters(item)}
                      >
                        {formatMessage({ id: item.type })} : {item.value}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimateSharedLayout>
        <hr className="my-3" />
        <CategoryMobileItemGrid
          data={data}
          productsLoading={productsLoading}
          setCartMenuOpen={setCartMenuOpen}
          handleResultPerPageChange={handleResultPerPageChange}
        />

        <AnimatePresence>
          {inView && !sideMenuOpen && data?.pages[0].products?.length !== 0 && (
            <SortInfoPanelMobile
              productsLoading={productsLoading}
              products={data?.pages[0].products}
              brandFilters={brandFilters}
              setSortByOpen={setSortByOpen}
              setFiltersOpen={setFiltersOpen}
              filtersOpen={filtersOpen}
              sortByOpen={sortByOpen}
              sortBy={sortBy}
              handleSortByChange={handleSortByChange}
              priceFilters={priceFilters}
              handleSubmitFilters={handleSubmitFilters}
            />
          )}
        </AnimatePresence>
      </div>
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
      <AnimatePresence>
        {checkShowCondition() && <MobileCartPopup />}
      </AnimatePresence>
    </Layout>
  );
}
