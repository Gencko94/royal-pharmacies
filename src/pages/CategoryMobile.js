import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CategoryHeaderMobile from '../components/CategoryMobile/CategoryHeaderMobile';
import CategoryMobileItemGrid from '../components/CategoryMobile/CategoryMobileItemGrid';
import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import Layout from '../components/Layout';
import Select from 'react-select';
import {
  filterProducts,
  getCategoryProducts,
  getSingleCategoryInfo,
} from '../Queries/Queries';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuItemMobile';
import { useInView } from 'react-intersection-observer';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { scrollIntoView } from 'scroll-js';

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
  const [priceFilters, setPriceFilters] = React.useState([10000]);
  const [resultsPerPage, setResultsPerPage] = React.useState({
    label: 20,
    value: 20,
  });
  const [filters, setFilters] = React.useState([]);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [triggerRef, inView] = useInView();
  const { data, isLoading: productsLoading } = useQuery(
    ['category-products', { category, page: productsPage, resultsPerPage }],
    getCategoryProducts,
    { retry: true, refetchOnWindowFocus: false }
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

  const handleProductChangePage = data => {
    scrollIntoView(document.getElementById('main'), document.body);
    setProductsPage(data.selected + 1);
  };
  const handleFilteredChangePage = data => {
    scrollIntoView(document.getElementById('main'), document.body);
    setFilteredPage(data.selected + 1);
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
        <CategoryHeaderMobile
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
        />
        <hr className="my-4" />

        {(!filtersApplied && data?.products?.length > 0 && !productsLoading) ||
          (filtersApplied &&
            filteredData?.filteredProducts?.length > 0 &&
            !filteredProductsLoading && (
              <div
                className="grid"
                style={{ gridTemplateColumns: '0.5fr 0.6fr' }}
              >
                <div></div>
                <div className="flex items-center">
                  <h1 className="font-semibold">
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
            ))}
        <AnimateSharedLayout>
          <motion.div layout className="px-3">
            {filters.length !== 0 && (
              <>
                <motion.h1 layout className="text-lg mb-2 font-semibold">
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
          triggerRef={triggerRef}
          setProductsPage={setProductsPage}
          filtersApplied={filtersApplied}
          handleResultPerPageChange={handleResultPerPageChange}
        />
        {(!filtersApplied && data?.products?.length > 0 && !productsLoading) ||
          (filtersApplied &&
            filteredData?.filteredProducts?.length > 0 &&
            !filteredProductsLoading && (
              <ReactPaginate
                previousLabel={<GoChevronLeft className="w-6 h-6 inline" />}
                nextLabel={<GoChevronRight className="w-6 h-6 inline" />}
                breakLabel={'...'}
                breakClassName={'inline'}
                pageCount={
                  filtersApplied ? filteredData?.lastPage : data?.lastPage
                }
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                initialPage={
                  filtersApplied ? filteredPage - 1 : productsPage - 1
                }
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
            ))}
      </div>
      <AnimatePresence>
        {inView && data?.products.length !== 0 && (
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
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
