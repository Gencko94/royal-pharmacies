import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { getCategoryProducts } from '../../Queries/Queries';
import CategoryProductItem from '../Category/CategoryProductItem';
import VariantCategoryProductItem from '../Category/VariantCategoryProductItem';

export default function MoreFrom({ categories, setSideMenuOpen }) {
  const { formatMessage } = useIntl();
  const category = React.useMemo(() => {
    return categories[0]?.parent_slug || categories[0]?.slug;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  const { data } = useQuery(
    [
      'category-products',
      {
        category,
        page: 1,
        resultsPerPage: { value: 30 },
      },
    ],
    getCategoryProducts,
    { retry: true, refetchOnWindowFocus: false, keepPreviousData: true }
  );

  return (
    <div className="my-4">
      <h1 className="text-2xl font-semibold mb-4">
        {formatMessage({ id: 'more-from' })}
      </h1>

      <div
        className={`${
          isTabletOrAbove ? 'more-from-grid__desktop' : 'more-from-grid__mobile'
        }`}
      >
        {data?.products.map(item => {
          return item.type === 'variation' &&
            Object.entries(item.new_variation_addons).length > 0 ? (
            <VariantCategoryProductItem
              key={item.id}
              setCartMenuOpen={setSideMenuOpen}
              item={item}
            />
          ) : (
            <CategoryProductItem
              key={item.id}
              setCartMenuOpen={setSideMenuOpen}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
}
