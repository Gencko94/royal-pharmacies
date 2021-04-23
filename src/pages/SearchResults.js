import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/Layout';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { filterProducts, searchProducts } from '../Queries/Queries';
import { useIntl } from 'react-intl';
import SearchRightSide from '../components/Search/SearchRightSide';
import SearchLeftSide from '../components/Search/SearchLeftSide';
import { AnimatePresence, motion } from 'framer-motion';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { scrollTo } from 'scroll-js';
import { DataProvider } from '../contexts/DataContext';
export default function SearchResults() {
  const { query } = useParams();
  const { formatMessage, locale } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  const [productsPage, setProductsPage] = React.useState(1);
  const [filteredPage, setFilteredPage] = React.useState(1);

  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 30,
    value: 60,
  });
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState(null);
  const [filters, setFilters] = React.useState([]);
  const [cartMenuOpen, setCartMenu] = React.useState(false);
  const { deliveryCountry } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const {
    data: products,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useQuery(
    ['searchProducts', { query, page: productsPage, resultsPerPage }],
    searchProducts,
    { retry: true, refetchOnWindowFocus: false }
  );

  const { data: filteredData, isLoading: filteredProductsLoading } = useQuery(
    [
      'search-filtered-products',
      {
        search: query,
        brandFilters,
        sortBy,
        page: filteredPage,
        resultsPerPage,
        priceFilters,
      },
    ],
    filterProducts,
    { retry: true, refetchOnWindowFocus: false, enabled: filtersApplied }
  );

  const handleResultPerPageChange = selectedValue => {
    setResultsPerPage(selectedValue);
  };
  const handleProductChangePage = data => {
    scrollTo(window, { top: 50, behavior: 'smooth' });
    setProductsPage(data.selected + 1);
  };
  const handleFilteredChangePage = data => {
    scrollTo(window, { top: 50, behavior: 'smooth' });
    setFilteredPage(data.selected + 1);
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
      setPriceFilters([1000]);
    }
  };

  const handleSubmitFilters = (selectedPrice, selectedBrands) => {
    setBrandFilters(selectedBrands);
    setPriceFilters(selectedPrice);
    scrollTo(window, { top: 500, behavior: 'smooth' });
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

  React.useEffect(() => {
    if (filters.length === 0) {
      setFiltersApplied(false);
    } else {
      setFiltersApplied(true);
    }
  }, [filters]);

  return (
    <Layout>
      <Helmet>
        <title>
          {formatMessage({ id: 'search-for' })} {query} | MRG
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
            products={products?.products}
            productsLoading={productsLoading}
            brandFilters={brandFilters}
            setBrandFilters={setBrandFilters}
            priceFilters={priceFilters}
            productsFetching={productsFetching}
            filteredProductsLoading={filteredProductsLoading}
            filtersApplied={filtersApplied}
            filteredProducts={filteredData?.filteredProducts}
            handleSubmitFilters={handleSubmitFilters}
          />

          <SearchRightSide
            products={products?.products}
            productsLoading={productsLoading}
            sortBy={sortBy}
            setResultsPerPage={setResultsPerPage}
            filteredProducts={filteredData?.filteredProducts}
            filteredProductsLoading={filteredProductsLoading}
            filtersApplied={filtersApplied}
            filters={filters}
            handleRemoveFilters={handleRemoveFilters}
            handleSortByChange={handleSortByChange}
            setCartMenuOpen={setCartMenu}
            resultsPerPage={resultsPerPage}
            handleResultPerPageChange={handleResultPerPageChange}
            handleFilteredChangePage={handleFilteredChangePage}
            handleProductChangePage={handleProductChangePage}
            filteredPage={filteredPage}
            productsPage={productsPage}
            productsPageCount={products?.lastPage}
            filteredPageCount={filteredData?.lastPage}
            query={query}
          />
        </div>
      </div>
    </Layout>
  );
}
