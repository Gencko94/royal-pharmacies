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
export default function SearchResults() {
  const { query } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState(null);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  const [page, setPage] = React.useState(1);
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
  const { data, isLoading: productsLoading } = useQuery(
    ['searchProducts', query, page, resultsPerPage],
    searchProducts,
    { retry: true, refetchOnWindowFocus: false }
  );

  const { filteredData, isLoading: filteredProductsLoading } = useQuery(
    [
      'search-filtered-products',
      {
        search: query,
        brandFilters: brandFilters?.id,
        sortBy,
        page,
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
  const handleRemoveFilters = type => {
    setFilters(prev => {
      return prev.filter(i => i.type !== type);
    });
    if (type === 'Brand') {
      setBrandFilters(null);
    }
    if (type === 'Sort') {
      setSortBy({
        value: 'newest',
        label: 'Newest',
      });
    }
    if (type === 'Price') {
      setFilters(prev => {
        return prev.filter(i => i.type !== 'Price');
      });
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
    if (brandFilters === brand) {
      setBrandFilters(null);
      setFilters(prev => {
        return prev.filter(i => i.type !== 'Brand');
      });
    } else {
      setFilters(prev => {
        let newArr = prev.filter(i => i.type !== 'Brand');
        newArr.push({ type: 'Brand', value: brand.label });

        return newArr;
      });
      setBrandFilters(brand);
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
            products={data?.products}
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
            products={data?.products}
            productsLoading={productsLoading}
            sortBy={sortBy}
            setPage={setPage}
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
          />
        </div>
      </div>
    </Layout>
  );
}
