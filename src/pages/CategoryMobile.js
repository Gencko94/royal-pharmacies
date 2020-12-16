import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CategoryHeaderMobile from '../components/CategoryMobile/CategoryHeaderMobile';
// import FiltersMobile from '../components/CategoryMobile/FiltersMobile';
import CategoryMobileItemGrid from '../components/CategoryMobile/CategoryMobileItemGrid';
// import SortByMobile from '../components/CategoryMobile/SortByMobile';
// import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import Layout from '../components/Layout';
// import { SearchProvider } from '../contexts/SearchContext';
import { getCategoryProducts, getSingleCategoryInfo } from '../Queries/Queries';

export default function CategoryMobile() {
  const { category } = useParams();

  const { data: products, isLoading: productsLoading } = useQuery(
    ['categoryProducts', category],
    getCategoryProducts
  );
  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    getSingleCategoryInfo
  );

  return (
    <Layout>
      <div className="min-h-screen">
        <CategoryHeaderMobile
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
        />
        {/* <SortInfoPanelMobile
        loading={loading}
        query={query}
        queryData={queryData}
        setFiltersOpen={setFiltersOpen}
        filtersOpen={filtersOpen}
        brandFilters={brandFilters}
        handleBrandChange={handleBrandChange}
        filtersApplied={filtersApplied}
        setSortByOpen={setSortByOpen}
      />
      <FiltersMobile
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        handleCategoryChange={handleCategoryChange}
        numberOfItems={numberOfItems}
        categories={categories}
        brands={brands}
        loading={loading}
        brandFilters={brandFilters}
        handleBrandChange={handleBrandChange}
        highestPrice={highestPrice}
        setHighestPrice={setHighestPrice}
        lowestPrice={lowestPrice}
        setLowestPrice={setLowestPrice}
        handlePriceChange={handlePriceChange}
      />
      <SortByMobile
        sortByOpen={sortByOpen}
        setSortByOpen={setSortByOpen}
        handleSortByChange={handleSortByChange}
        setSortBy={setSortBy}
        sortBy={sortBy}
      /> */}
        <CategoryMobileItemGrid
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
          products={products}
          productsLoading={productsLoading}
        />
      </div>
    </Layout>
  );
}
