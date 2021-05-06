import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/Layout';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { searchProducts } from '../Queries/Queries';
import { useIntl } from 'react-intl';
import SearchRightSide from '../components/Search/SearchRightSide';
import SearchLeftSide from '../components/Search/SearchLeftSide';
import { AnimatePresence, motion } from 'framer-motion';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { scrollTo } from 'scroll-js';
import { DataProvider } from '../contexts/DataContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function SearchResults() {
  const { query } = useParams();
  const { formatMessage, locale } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });

  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 30,
    value: 60,
  });
  // const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState(null);
  const [filters, setFilters] = React.useState([]);
  const [cartMenuOpen, setCartMenu] = React.useState(false);
  const { deliveryCountry } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const {
    data,
    isLoading: productsLoading,
    isFetching: productsFetching,
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
      setSortBy({ value: 'newest', label: formatMessage({ id: 'Newest' }) });
    }
    if (filter.type === 'Price') {
      setPriceFilters(null);
    }
  };
  const handleSubmitFilters = (selectedPrice, selectedBrands) => {
    setBrandFilters(selectedBrands);
    setPriceFilters(selectedPrice);
    scrollTo(window, { top: 50, behavior: 'smooth' });
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

  return (
    <Layout>
      <Helmet>
        <title>
          {formatMessage({ id: 'search-for' })} {query}
        </title>
      </Helmet>
      <AnimatePresence>
        {cartMenuOpen && (
          <SideCartMenu key="side-cart" setSideMenuOpen={setCartMenu} />
        )}
        {cartMenuOpen && (
          <motion.div
            key="sidecart-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartMenu(false)}
            className="side__addCart-bg"
          ></motion.div>
        )}
      </AnimatePresence>
      <div
        className="max-w-default mx-auto p-4 overflow-hidden"
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        <div className="search-page__container">
          <SearchLeftSide
            products={data?.pages[0].products}
            productsLoading={productsLoading}
            brandFilters={brandFilters}
            setBrandFilters={setBrandFilters}
            priceFilters={priceFilters}
            productsFetching={productsFetching}
            handleSubmitFilters={handleSubmitFilters}
            filters={filters}
          />

          <SearchRightSide
            data={data}
            productsLoading={productsLoading}
            sortBy={sortBy}
            setResultsPerPage={setResultsPerPage}
            filters={filters}
            handleRemoveFilters={handleRemoveFilters}
            handleSortByChange={handleSortByChange}
            setCartMenuOpen={setCartMenu}
            resultsPerPage={resultsPerPage}
            handleResultPerPageChange={handleResultPerPageChange}
            query={query}
          />
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
      </div>
    </Layout>
  );
}
