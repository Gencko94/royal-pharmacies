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
import { scrollIntoView } from 'scroll-js';

export default function Category() {
  const history = useHistory();
  console.log(history, 'history');
  const { category } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);

  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  console.log(history.location.state, 'state');
  const [productsPage, setProductsPage] = React.useState(() => {
    return history.location.state?.page || 1;
    // return 1;
  });
  const [filteredPage, setFilteredPage] = React.useState(1);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 30,
    value: 30,
  });
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState([500]);
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
      // retry: true,
      refetchOnWindowFocus: false,
      // keepPreviousData: true,
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
      // keepPreviousData: true,
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
    scrollIntoView(document.getElementById('products_grid'), document.body);

    history.push({
      state: {
        page: data.selected + 1,
      },
    });
    setProductsPage(data.selected + 1);
  };
  const handleFilteredChangePage = data => {
    scrollIntoView(document.getElementById('products_grid'), document.body);
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
      setPriceFilters([1000]);
    }
  };

  const handlePriceChange = values => {
    setPriceFilters(values);
  };
  const handleChangePriceInput = e => {
    if (e.target.value < 0) return;
    if (e.target.value > 1000) return;
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
            ? categoryInfo.title[locale].name
            : formatMessage({ id: 'shop-on-mrg' })}
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

        {/* <Breadcrumbs data={categories} /> */}
        <div className="search-page__container">
          <CategoryLeftSide
            categoryInfoLoading={categoryInfoLoading}
            products={data?.products}
            productsLoading={productsLoading}
            brandFilters={brandFilters}
            setBrandFilters={setBrandFilters}
            handleBrandChange={handleBrandChange}
            priceFilters={priceFilters}
            handlePriceChange={handlePriceChange}
            handleChangePriceInput={handleChangePriceInput}
            handleSubmitPrice={handleSubmitPrice}
            brands={categoryInfo?.brands}
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
