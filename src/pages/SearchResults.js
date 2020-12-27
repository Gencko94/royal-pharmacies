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
import { scrollIntoView } from 'scroll-js';
export default function SearchResults() {
  const { query } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  const [productsPage, setProductsPage] = React.useState(1);
  const [filteredPage, setFilteredPage] = React.useState(1);

  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 20,
    value: 20,
  });
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState([10000]);
  const [filters, setFilters] = React.useState([]);
  const [cartMenuOpen, setCartMenu] = React.useState(false);

  /**
   * Main Fetch
   */
  const { data: products, isLoading: productsLoading } = useQuery(
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
        locale,
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
    scrollIntoView(document.getElementById('top'), document.body);
    setProductsPage(data.selected + 1);
  };
  const handleFilteredChangePage = data => {
    scrollIntoView(document.getElementById('top'), document.body);
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
      setPriceFilters([10000]);
    }
  };

  const handlePriceChange = values => {
    setPriceFilters(values);
  };
  const handleChangePriceInput = e => {
    if (e.target.value < 0) return;
    if (e.target.value > 10000) return;
    setPriceFilters([e.target.value]);
  };
  const handleSubmitPrice = () => {
    setFilters(prev => {
      let newArr = prev.filter(i => i.type !== 'Price');
      newArr.push({ type: 'Price', value: `Max ${priceFilters[0]}` });
      return newArr;
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
  const handleBrandChange = brand => {
    const isAvailable = brandFilters.find(i => i.id === brand.id);
    // if available
    if (isAvailable) {
      setBrandFilters(prev => {
        return prev.filter(i => i.id !== brand.id);
      });
      setFilters(prev => {
        return prev.filter(i => i.value !== brand.label);
      });
    } else {
      setFilters(prev => {
        return [...prev, { type: 'Brand', value: brand.label }];
      });
      setBrandFilters(prev => {
        return [...prev, { ...brand }];
      });
    }
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
            handleBrandChange={handleBrandChange}
            priceFilters={priceFilters}
            handlePriceChange={handlePriceChange}
            handleChangePriceInput={handleChangePriceInput}
            handleSubmitPrice={handleSubmitPrice}
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
