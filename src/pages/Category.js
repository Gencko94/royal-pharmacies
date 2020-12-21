import React from 'react';
import { Helmet } from 'react-helmet';
import CategoryLeftSide from '../components/Category/CategoryLeftSide';
import CategoryRightSide from '../components/Category/CategoryRightSide';
// import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
// import { SearchProvider } from '../contexts/SearchContext';
import Layout from '../components/Layout';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getCategoryProducts,
  getSingleCategoryInfo,
  filterProducts,
} from '../Queries/Queries';
import CategoryHeader from '../components/Category/CategoryHeader';
import { useIntl } from 'react-intl';
export default function Category() {
  const { category } = useParams();
  const { locale } = useIntl();
  const [brandFilters, setBrandFilters] = React.useState(null);
  const [sortBy, setSortBy] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [resultsPerPage, setResultsPerPage] = React.useState(10);

  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [priceFilters, setPriceFilters] = React.useState([10000]);
  const [filters, setFilters] = React.useState([]);

  /**
   * Main Fetch
   */

  const { data: products, isLoading: productsLoading } = useQuery(
    ['category-products', category],
    getCategoryProducts,
    { retry: true, refetchOnWindowFocus: false }
  );
  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    getSingleCategoryInfo,
    { retry: true, refetchOnWindowFocus: false }
  );
  const {
    data: filteredProducts,
    isLoading: filteredProductsLoading,
  } = useQuery(
    [
      'filtered-products',
      {
        category: categoryInfo?.id,
        brandFilters,
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
  const handleRemoveFilters = type => {
    setFilters(prev => {
      return prev.filter(i => i.type !== type);
    });
    if (type === 'Brand') {
      setBrandFilters(null);
    }
    if (type === 'Sort') {
      setSortBy(null);
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
  return (
    <Layout>
      <Helmet>
        <title>Search</title>
      </Helmet>
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
            categoryInfo={categoryInfo}
            categoryInfoLoading={categoryInfoLoading}
            products={products}
            productsLoading={productsLoading}
            brandFilters={brandFilters}
            setBrandFilters={setBrandFilters}
            handleBrandChange={handleBrandChange}
            priceFilters={priceFilters}
            handlePriceChange={handlePriceChange}
            handleChangePriceInput={handleChangePriceInput}
            handleSubmitPrice={handleSubmitPrice}
          />

          <CategoryRightSide
            products={products}
            productsLoading={productsLoading}
            categoryInfoLoading={categoryInfoLoading}
            sortBy={sortBy}
            setPage={setPage}
            setResultsPerPage={setResultsPerPage}
            filteredProducts={filteredProducts}
            filteredProductsLoading={filteredProductsLoading}
            filtersApplied={filtersApplied}
            filters={filters}
            handleRemoveFilters={handleRemoveFilters}
            handleSortByChange={handleSortByChange}
          />
        </div>
      </div>
    </Layout>
  );
}
