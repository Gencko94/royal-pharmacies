import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import CategoryHeaderMobile from '../components/CategoryMobile/CategoryHeaderMobile';
import CategoryMobileItemGrid from '../components/CategoryMobile/CategoryMobileItemGrid';
import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import Layout from '../components/Layout';

import {
  filterProducts,
  getCategoryProducts,
  getSingleCategoryInfo,
} from '../Queries/Queries';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';

import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { scrollIntoView, scrollTo } from 'scroll-js';
import { Helmet } from 'react-helmet';

export default function CategoryMobile() {
  const { category } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: formatMessage({ id: 'Newest' }),
  });
  const [productsPage, setProductsPage] = React.useState(1);
  const [filteredPage, setFilteredPage] = React.useState(1);

  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState([500]);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 30,
    value: 30,
  });
  const [filters, setFilters] = React.useState([]);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [inView, setInView] = React.useState(false);
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
  const { data, isLoading: productsLoading, error: productsError } = useQuery(
    ['category-products', { category, page: productsPage, resultsPerPage }],
    getCategoryProducts,
    { refetchOnWindowFocus: false }
  );
  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    getSingleCategoryInfo,
    { retry: true, refetchOnWindowFocus: false }
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
  const history = useHistory();
  React.useEffect(() => {
    return () => {
      setProductsPage(1);
      setFilteredPage(1);
    };
  }, [history.location.pathname]);
  const handleProductChangePage = data => {
    scrollIntoView(
      document.getElementById('products_grid-mobile'),
      document.body
    );
    history.push({
      state: {
        page: data.selected + 1,
      },
    });
    setProductsPage(data.selected + 1);
  };
  const handleFilteredChangePage = data => {
    scrollIntoView(
      document.getElementById('products_grid-mobile'),
      document.body
    );
    history.push({
      state: {
        page: data.selected + 1,
      },
    });
    setFilteredPage(data.selected + 1);
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
    scrollTo(window, { top: 500, behavior: 'smooth' });
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
    scrollTo(window, { top: 500, behavior: 'smooth' });
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
          filteredProducts={filteredData?.filteredProducts}
          filteredProductsLoading={filteredProductsLoading}
          setProductsPage={setProductsPage}
          filtersApplied={filtersApplied}
          handleResultPerPageChange={handleResultPerPageChange}
        />
        {(!filtersApplied && data?.products?.length > 0 && !productsLoading) ||
        (filtersApplied &&
          filteredData?.filteredProducts?.length > 0 &&
          !filteredProductsLoading) ? (
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
            pageCount={filtersApplied ? filteredData?.lastPage : data?.lastPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            initialPage={filtersApplied ? filteredPage - 1 : productsPage - 1}
            disableInitialCallback={true}
            onPageChange={
              filtersApplied
                ? handleFilteredChangePage
                : handleProductChangePage
            }
            containerClassName={'text-center my-2'}
            subContainerClassName={'p-3 inline'}
            pageLinkClassName="p-3"
            activeClassName={'bg-main-color font-bold text-main-text'}
            pageClassName=" inline-block mx-2 rounded-full text-lg"
            previousClassName="p-3 inline font-bold"
            nextClassName="p-3 inline font-bold"
            disabledClassName="text-gray-500"
          />
        ) : null}
      </div>
      <AnimatePresence>
        {inView && !cartMenuOpen && data?.products.length !== 0 && (
          <SortInfoPanelMobile
            productsLoading={productsLoading}
            products={data?.products}
            brandFilters={brandFilters}
            handleBrandChange={handleBrandChange}
            filtersApplied={filtersApplied}
            setSortByOpen={setSortByOpen}
            setFiltersOpen={setFiltersOpen}
            filtersOpen={filtersOpen}
            sortByOpen={sortByOpen}
            sortBy={sortBy}
            handleSortByChange={handleSortByChange}
            handleChangePriceInput={handleChangePriceInput}
            handlePriceChange={handlePriceChange}
            handleSubmitPrice={handleSubmitPrice}
            priceFilters={priceFilters}
            brands={categoryInfo?.brands}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
