import React from 'react';
import { Helmet } from 'react-helmet';
import CategoryLeftSide from '../components/Category/CategoryLeftSide';
import CategoryRightSide from '../components/Category/CategoryRightSide';

import Layout from '../components/Layout';
import { useQuery } from 'react-query';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import {
  getCategoryProducts,
  getSingleCategoryInfo,
  filterProducts,
} from '../Queries/Queries';
import CategoryHeader from '../components/Category/CategoryHeader';
import { useIntl } from 'react-intl';
import { AnimatePresence, motion } from 'framer-motion';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { scrollTo } from 'scroll-js';
import { DataProvider } from '../contexts/DataContext';

export default function Category() {
  const history = useHistory();
  const { category } = useParams();
  const { deliveryCountry } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);

  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  const [productsPage, setProductsPage] = React.useState(() => {
    return history.location.state?.page || 1;
  });
  const [filteredPage, setFilteredPage] = React.useState(1);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 30,
    value: 30,
  });
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState(null);
  const [filters, setFilters] = React.useState(() => {
    return [];
  });
  const [cartMenuOpen, setCartMenu] = React.useState(false);

  /**
   * Main Fetch
   */

  const { data, isLoading: productsLoading, error: productsError } = useQuery(
    ['category-products', { category, page: productsPage, resultsPerPage }],
    getCategoryProducts,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    getSingleCategoryInfo,
    {
      retry: true,
      refetchOnWindowFocus: false,
    }
  );
  const { data: filteredData, isLoading: filteredProductsLoading } = useQuery(
    [
      'filtered-products',
      {
        category: categoryInfo?.id,
        brandFilters,
        sortBy,
        page: filteredPage,
        resultsPerPage,
        priceFilters,
      },
    ],
    filterProducts,
    {
      retry: true,
      refetchOnWindowFocus: false,
      enabled: filtersApplied,
    }
  );

  const handleResultPerPageChange = selectedValue => {
    setResultsPerPage(selectedValue);
  };
  React.useEffect(() => {
    return () => {
      setProductsPage(1);
      setFilteredPage(1);
    };
  }, [history.location.pathname]);
  const handleProductChangePage = data => {
    scrollTo(window, { top: 660, behavior: 'smooth' });

    history.push({
      state: {
        page: data.selected + 1,
      },
    });
    setProductsPage(data.selected + 1);
  };
  const handleFilteredChangePage = data => {
    scrollTo(window, { top: 660, behavior: 'smooth' });
    history.push({
      state: {
        page: data.selected + 1,
      },
    });
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
      setSortBy({ value: 'newest', label: formatMessage({ id: 'Newest' }) });
    }
    if (filter.type === 'Price') {
      setPriceFilters(null);
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
        console.log([...brandFilters], 'brand filters new');
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
              } ${formatMessage({ id: 'on-mrg-mall-kuwait' })}`
            : 'MRG Mall Online Shop | متجر إم آر جي الإلكتروني'}
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
        <CategoryHeader
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
        />

        <div className="search-page__container">
          <CategoryLeftSide
            categoryInfoLoading={categoryInfoLoading}
            products={data?.products}
            productsLoading={productsLoading}
            brandFilters={brandFilters}
            setBrandFilters={setBrandFilters}
            priceFilters={priceFilters}
            brands={categoryInfo?.brands}
            handleSubmitFilters={handleSubmitFilters}
          />

          <CategoryRightSide
            products={data?.products}
            productsLoading={productsLoading}
            sortBy={sortBy}
            setResultsPerPage={setResultsPerPage}
            filtersApplied={filtersApplied}
            filters={filters}
            handleRemoveFilters={handleRemoveFilters}
            handleSortByChange={handleSortByChange}
            setCartMenuOpen={setCartMenu}
            resultsPerPage={resultsPerPage}
            handleResultPerPageChange={handleResultPerPageChange}
            productsPageCount={data?.lastPage}
            filteredPageCount={filteredData?.lastPage}
            handleProductChangePage={handleProductChangePage}
            handleFilteredChangePage={handleFilteredChangePage}
            filteredPage={filteredPage}
            category={category}
            productsPage={productsPage}
            filteredProducts={filteredData?.filteredProducts}
            filteredProductsLoading={filteredProductsLoading}
          />
        </div>
      </div>
    </Layout>
  );
}
