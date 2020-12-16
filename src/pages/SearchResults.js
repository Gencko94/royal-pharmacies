import React from 'react';
import { Helmet } from 'react-helmet';
import CategoryLeftSide from '../components/Category/CategoryLeftSide';
import CategoryRightSide from '../components/Category/CategoryRightSide';
// import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
// import { SearchProvider } from '../contexts/SearchContext';
import Layout from '../components/Layout';
import { queryCache, useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getCategoryProducts,
  getSingleCategoryInfo,
  sortCategories,
} from '../Queries/Queries';
import { useIntl } from 'react-intl';
export default function SearchResults() {
  const { category } = useParams();
  const { locale } = useIntl();

  /**
   * Main Fetch
   */

  const { data: products, isLoading: productsLoading } = useQuery(
    ['categoryProducts', category],
    getCategoryProducts,
    { retry: true }
  );
  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    getSingleCategoryInfo,
    { retry: true }
  );
  const [sortByMutation] = useMutation(
    async query => {
      return await sortCategories(query);
    },
    {
      throwOnError: true,
      onSuccess: data => {
        console.log(data);
        queryCache.setQueryData(['categoryProducts', category], () => {
          return data;
        });
      },
    }
  );
  const handleSortBy = async sortBy => {
    try {
      console.log(categoryInfo.id);
      const query = {
        page: 1,
        category: categoryInfo.id,
        sortBy,
        sort_language: locale,
      };
      const res = await sortByMutation(query);
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className="max-w-default mx-auto p-4 overflow-hidden">
        <div className="search-page__container">
          <CategoryLeftSide
            categoryInfo={categoryInfo}
            categoryInfoLoading={categoryInfoLoading}
            products={products}
            productsLoading={productsLoading}
          />

          <CategoryRightSide
            products={products}
            productsLoading={productsLoading}
            categoryInfoLoading={categoryInfoLoading}
            handleSortBy={handleSortBy}
          />
        </div>
      </div>
    </Layout>
  );
}
