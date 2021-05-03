import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import CategoryHeaderMobile from '../components/CategoryMobile/CategoryHeaderMobile';
import CategoryMobileItemGrid from '../components/CategoryMobile/CategoryMobileItemGrid';
import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import Layout from '../components/Layout';

import { getCategoryProducts, getSingleCategoryInfo } from '../Queries/Queries';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';

import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { scrollTo } from 'scroll-js';
import { Helmet } from 'react-helmet';
import { DataProvider } from '../contexts/DataContext';

export default function CategoryMobile() {
  const { category, id } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const { deliveryCountry, sideMenuOpen, settings } = React.useContext(
    DataProvider
  );
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  const [productsPage, setProductsPage] = React.useState(1);

  // const [filtersApplied, setFiltersApplied] = React.useState(false);
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
  }, [inView, sideMenuOpen]);
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
  React.useEffect(() => {
    return () => {
      setProductsPage(1);
    };
  }, [history.location.pathname]);
  const handleProductChangePage = data => {
    scrollTo(window, { top: 350, behavior: 'smooth' });
    history.push({
      state: {
        page: data.selected + 1,
      },
    });
    setProductsPage(data.selected + 1);
  };

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
            <SideCartMenuMobile
              key="side-cart-mobile"
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
          products={data?.products}
          productsLoading={productsLoading}
          setCartMenuOpen={setCartMenuOpen}
          setProductsPage={setProductsPage}
          handleResultPerPageChange={handleResultPerPageChange}
        />
        {data?.products?.length > 0 && !productsLoading && (
          <ReactPaginate
            previousLabel={
              locale === 'ar' ? (
                <GoChevronRight className="w-6 h-6 inline" />
              ) : (
                <GoChevronLeft className="w-6 h-6 inline" />
              )
            }
            nextLabel={
              locale === 'ar' ? (
                <GoChevronLeft className="w-6 h-6 inline" />
              ) : (
                <GoChevronRight className="w-6 h-6 inline" />
              )
            }
            breakLabel={'...'}
            breakClassName={'inline'}
            pageCount={data?.lastPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            initialPage={productsPage - 1}
            disableInitialCallback={true}
            onPageChange={handleProductChangePage}
            containerClassName={'text-center my-2'}
            subContainerClassName={'p-3 inline'}
            pageLinkClassName="p-3"
            activeClassName={'bg-main-color font-bold text-main-text'}
            pageClassName=" inline-block mx-2 rounded-full text-lg"
            previousClassName="p-3 inline font-bold"
            nextClassName="p-3 inline font-bold"
            disabledClassName="text-gray-500"
          />
        )}
        {data?.products.length === 0 && offers !== 't' && (
          <div className="p-6 flex flex-col items-center justify-center text-xl h-full">
            {formatMessage({ id: 'no-products' })}
          </div>
        )}
        {data?.products.length === 0 && offers === 't' && (
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
          data?.products.length !== 0 && (
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
    </Layout>
  );
}
