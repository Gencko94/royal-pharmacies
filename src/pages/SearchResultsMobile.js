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

export default function SearchResultsMobile() {
  const { query } = useParams();
  const { locale, formatMessage } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState(null);
  const [sortBy, setSortBy] = React.useState({
    value: 'newest',
    label: 'Newest',
  });
  const [page, setPage] = React.useState(1);

  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState([10000]);
  const [filters, setFilters] = React.useState([]);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [triggerRef, inView] = useInView();

  const { data: products, isLoading: productsLoading } = useQuery(
    ['searchProducts', query],
    searchProducts,
    { retry: true, refetchOnWindowFocus: false }
  );

  const {
    data: filteredProducts,
    isLoading: filteredProductsLoading,
  } = useQuery(
    [
      'filtered-products',
      {
        search: query,
        brandFilters,
        sortBy,
        page,
        resultsPerPage: 25,
        locale,
        priceFilters,
      },
    ],
    filterProducts,
    { retry: true, refetchOnWindowFocus: false, enabled: filtersApplied }
  );

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
        newArr.push({ type: 'Brand', value: brand });

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
  const resolvePlural = () => {
    switch (products.length) {
      case 1:
        return formatMessage({ id: 'one-search-results' });

      case 2:
        return formatMessage({ id: 'two-search-results' });

      case products.length > 10:
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
        {products && (
          <div className="p-3 border-b">
            <h1>
              {products.length > 2 && products.length} {resolvePlural()}{' '}
              <strong>{query}</strong>
            </h1>
          </div>
        )}
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
          products={products}
          productsLoading={productsLoading}
          setCartMenuOpen={setCartMenuOpen}
          filteredProducts={filteredProducts}
          filteredProductsLoading={filteredProductsLoading}
          triggerRef={triggerRef}
          setPage={setPage}
        />
        <AnimatePresence>
          {inView && (
            <SortInfoPanelMobile
              productsLoading={productsLoading}
              products={products}
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
