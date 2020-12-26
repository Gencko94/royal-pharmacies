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
import { useInView } from 'react-intersection-observer';
import { scrollIntoView } from 'scroll-js';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Select from 'react-select';
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
  const [priceFilters, setPriceFilters] = React.useState([10000]);
  const [filters, setFilters] = React.useState([]);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 20,
    value: 20,
  });
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [triggerRef, inView] = useInView();

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
  const resultsPerPageOptions = React.useMemo(
    () => [
      {
        label: 20,
        value: 20,
      },
      {
        label: 30,
        value: 30,
      },
      {
        label: 40,
        value: 40,
      },
    ],
    []
  );
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
        {products?.products.length !== 0 && (
          <div
            className="grid border-b mb-1"
            style={{ gridTemplateColumns: '0.5fr 0.5fr' }}
          >
            <div className="p-3 ">
              <h1>
                {products?.products.length > 2 && products?.products.length}{' '}
                {resolvePlural()} <strong>{query}</strong>
              </h1>
            </div>
            <div className="flex items-center">
              <h1 className="font-semibold text-sm">
                {formatMessage({ id: 'number-per-page' })}
              </h1>
              <Select
                isSearchable={false}
                options={resultsPerPageOptions}
                value={resultsPerPage}
                onChange={handleResultPerPageChange}
                className="mx-2 flex-1"
              />
            </div>
          </div>
        )}

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
                        onClick={() => handleRemoveFilters(item.type)}
                      >
                        {formatMessage({ id: item.type })} :{' '}
                        {formatMessage({ id: item.value })}
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
          products={products?.products}
          productsLoading={productsLoading}
          setCartMenuOpen={setCartMenuOpen}
          filteredProducts={filteredData?.filteredProducts}
          filteredProductsLoading={filteredProductsLoading}
          triggerRef={triggerRef}
        />
        {!productsLoading && !filteredProductsLoading && (
          <ReactPaginate
            previousLabel={<GoChevronLeft className="w-6 h-6 inline" />}
            nextLabel={<GoChevronRight className="w-6 h-6 inline" />}
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
        )}
        <AnimatePresence>
          {inView && (
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
