import React from 'react';
import { Helmet } from 'react-helmet';
// import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
// import { SearchProvider } from '../contexts/SearchContext';
import Layout from '../components/Layout';
import { queryCache, useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { searchProducts, sortCategories } from '../Queries/Queries';
import { useIntl } from 'react-intl';
import SearchRightSide from '../components/Search/SearchRightSide';
export default function SearchResults() {
  const { query } = useParams();
  const { locale } = useIntl();

  /**
   * Main Fetch
   */

  const { data: products, isLoading: productsLoading } = useQuery(
    ['searchProducts', query],
    searchProducts,
    { retry: true }
  );
  // const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
  //   ['categoryInfo', query],
  //   getSingleCategoryInfo,
  //   { retry: true }
  // );
  const [sortByMutation] = useMutation(
    async query => {
      return await sortCategories(query);
    },
    {
      throwOnError: true,
      onSuccess: data => {
        console.log(data);
        queryCache.setQueryData(['categoryProducts', query], () => {
          return data;
        });
      },
    }
  );
  const handleSortBy = async sortBy => {
    try {
      // console.log(categoryInfo.id);
      const query = {
        page: 1,
        // category: categoryInfo.id,
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
        <title>{query}</title>
      </Helmet>
      <div className="max-w-default mx-auto p-4 overflow-hidden">
        <SearchRightSide
          products={products}
          productsLoading={productsLoading}
          // categoryInfoLoading={categoryInfoLoading}
          handleSortBy={handleSortBy}
          query={query}
        />
      </div>
    </Layout>
  );
}
