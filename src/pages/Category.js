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
  getCategoryId,
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

  /**
   * Main Fetch
   */

  const { data: categoryId, isLoading: categoryIdLoading } = useQuery(
    ['categoryId', category],
    getCategoryId,
    { retry: true, refetchOnWindowFocus: false }
  );
  const { data: products, isLoading: productsLoading } = useQuery(
    [
      'categoryProducts',
      {
        categoryId,
        brandFilters,
        sortBy,
        page,
        resultsPerPage,
        locale,
      },
    ],
    getCategoryProducts,
    { retry: true, refetchOnWindowFocus: false, enabled: categoryId }
  );
  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    getSingleCategoryInfo,
    { retry: true, refetchOnWindowFocus: false }
  );
  const handleBrandChange = brand => {
    if (brandFilters === brand) {
      setBrandFilters(null);
    } else {
      setBrandFilters(brand);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className="max-w-default mx-auto p-4 overflow-hidden">
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
            categoryIdLoading={categoryIdLoading}
          />

          <CategoryRightSide
            products={products}
            productsLoading={productsLoading}
            categoryInfoLoading={categoryInfoLoading}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categoryIdLoading={categoryIdLoading}
            setPage={setPage}
            setResultsPerPage={setResultsPerPage}
          />
        </div>
      </div>
    </Layout>
  );
}
