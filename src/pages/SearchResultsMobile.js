import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CategoryMobileItemGrid from '../components/CategoryMobile/CategoryMobileItemGrid';
import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import Layout from '../components/Layout';
import { filterProducts, searchProducts } from '../Queries/Queries';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuItemMobile';

import { scrollIntoView } from 'scroll-js';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

export default function SearchResultsMobile() {
  const { query } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: 'Newest',
  });
  const [productsPage, setProductsPage] = React.useState(1);
  const [filteredPage, setFilteredPage] = React.useState(1);

  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState([500]);
  const [filters, setFilters] = React.useState([]);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 20,
    value: 20,
  });
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
  const { data: products, isLoading: productsLoading } = useQuery(
    ['searchProducts', { query, page: productsPage, resultsPerPage }],
    searchProducts,
    { retry: true, refetchOnWindowFocus: false }
  );

  const { data: filteredData, isLoading: filteredProductsLoading } = useQuery(
    [
      'filtered-products',
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
    scrollIntoView(document.getElementById('main'), document.body);
    setProductsPage(data.selected + 1);
  };
  const handleFilteredChangePage = data => {
    scrollIntoView(document.getElementById('main'), document.body);
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
  const resolvePlural = () => {
    switch (products?.products.length) {
      case 1:
        return formatMessage({ id: 'one-search-results' });

      case 2:
        return formatMessage({ id: 'two-search-results' });

      case products?.products.length > 10:
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
        {(!filtersApplied &&
          products?.products.length > 0 &&
          !productsLoading) ||
        (filtersApplied &&
          filteredData?.filteredProducts.length > 0 &&
          !filteredProductsLoading) ? (
          <div className="mb-1">
            <div className="px-3 pt-3">
              <h1 className="font-semibold text-lg">
                {products?.products.length > 2 && products?.products.length}{' '}
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
          products={products?.products}
          productsLoading={productsLoading}
          setCartMenuOpen={setCartMenuOpen}
          filteredProducts={filteredData?.filteredProducts}
          filteredProductsLoading={filteredProductsLoading}
          setProductsPage={setProductsPage}
          filtersApplied={filtersApplied}
          handleResultPerPageChange={handleResultPerPageChange}
        />
        {(!filtersApplied &&
          products?.products?.length > 0 &&
          !productsLoading) ||
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
            pageCount={
              filtersApplied ? filteredData?.lastPage : products?.lastPage
            }
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
        <AnimatePresence>
          {inView && products?.products.length !== 0 && (
            <SortInfoPanelMobile
              productsLoading={productsLoading}
              products={products?.products}
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
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
