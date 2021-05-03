import React from 'react';
import { Helmet } from 'react-helmet';
import CategoryLeftSide from '../components/Category/CategoryLeftSide';
import CategoryRightSide from '../components/Category/CategoryRightSide';
import Layout from '../components/Layout';
import { useQuery } from 'react-query';
import { Redirect, useParams, useHistory, useLocation } from 'react-router-dom';
import { getCategoryProducts, getSingleCategoryInfo } from '../Queries/Queries';
import CategoryHeader from '../components/Category/CategoryHeader';
import { useIntl } from 'react-intl';
import { AnimatePresence, motion } from 'framer-motion';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { scrollTo } from 'scroll-js';
import { DataProvider } from '../contexts/DataContext';

export default function Category() {
  const history = useHistory();
  const { category, id } = useParams();
  const { deliveryCountry, settings } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const location = useLocation();
  const offers = new URLSearchParams(location.search).get('offers');
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  const [productsPage, setProductsPage] = React.useState(() => {
    return history.location.state?.page || 1;
  });

  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 20,
    value: 20,
  });

  const [priceFilters, setPriceFilters] = React.useState(null);
  const [filters, setFilters] = React.useState(() => {
    return [];
  });
  const [cartMenuOpen, setCartMenu] = React.useState(false);

  /**
   * Main Fetch
   */

  const { data, isLoading: productsLoading, error: productsError } = useQuery(
    [
      'category-products',
      {
        page: productsPage,
        resultsPerPage,
        id,
        brandFilters,
        priceFilters,
        sortBy,
        offers: offers === 't',
      },
    ],
    () =>
      getCategoryProducts({
        page: productsPage,
        resultsPerPage,
        id,
        brandFilters,
        priceFilters,
        sortBy,
        offers: offers === 't',
      }),
    { retry: true }
  );

  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    () => getSingleCategoryInfo(category),
    {
      retry: true,
      keepPreviousData: true,
    }
  );

  const handleResultPerPageChange = selectedValue => {
    setResultsPerPage(selectedValue);
  };
  React.useEffect(() => {
    return () => {
      setProductsPage(1);
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
          offers={offers}
        />

        <div className="search-page__container">
          <CategoryLeftSide
            categoryInfoLoading={categoryInfoLoading}
            products={data?.products}
            offers={offers}
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
            filters={filters}
            handleRemoveFilters={handleRemoveFilters}
            handleSortByChange={handleSortByChange}
            setCartMenuOpen={setCartMenu}
            resultsPerPage={resultsPerPage}
            handleResultPerPageChange={handleResultPerPageChange}
            productsPageCount={data?.lastPage}
            handleProductChangePage={handleProductChangePage}
            category={category}
            productsPage={productsPage}
          />
        </div>
        {data?.products.length === 0 && offers !== 't' && (
          <div className="p-6 flex flex-col items-center justify-center text-xl h-full">
            {/* <img src={placeholder} alt="No products" className="mb-4" /> */}
            {formatMessage({ id: 'no-products' })}
          </div>
        )}
        {data?.products.length === 0 && offers === 't' && (
          <div className="p-6 flex flex-col items-center justify-center  h-full">
            <h1 className="text-2xl font-bold text-center">
              {formatMessage({ id: 'no-offers' })}
            </h1>
            <h1 className="text-xl text-center">
              {formatMessage({ id: 'comeback-later' })}
            </h1>
            <button
              onClick={() =>
                history.push(`/${locale}/category/${category}/${id}`)
              }
              className="p-2 bg-main-color mt-2 text-main-text rounded text-lg "
            >
              {formatMessage({ id: 'go-to-products' })}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
