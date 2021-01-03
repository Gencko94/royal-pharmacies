import React from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';

export default function SearchSortInfoPanel({
  sortBy,
  query,
  handleSortByChange,
  productsCount,
  resultsPerPage,
  handleResultPerPageChange,
}) {
  const { formatMessage } = useIntl();
  const sortByOptions = React.useMemo(
    () => [
      { value: 'newest', label: formatMessage({ id: 'Newest' }) },
      {
        label: formatMessage({ id: 'Price (Low to High)' }),
        value: 'price-asc',
      },
      {
        label: formatMessage({ id: 'Price (High to Low)' }),
        value: 'price-desc',
      },
    ],
    [formatMessage]
  );
  const resultsPerPageOptions = React.useMemo(
    () => [
      {
        label: 30,
        value: 30,
      },
      {
        label: 60,
        value: 60,
      },
    ],
    []
  );
  const resolvePlural = () => {
    switch (productsCount) {
      case 1:
        return formatMessage({ id: 'one-search-result' });

      case 2:
        return formatMessage({ id: 'two-search-results' });

      case productsCount > 10:
        return formatMessage({ id: 'more-than-10-search-results' });
      default:
        return formatMessage({ id: 'search-results' });
    }
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.7fr 0.7fr',
        marginBottom: '0.5rem',
      }}
      className="border-b"
    >
      <div layout className="flex items-center">
        {productsCount && (
          <div className="py-3 text-lg">
            <h1>
              <strong>{productsCount > 2 && productsCount}</strong>{' '}
              {resolvePlural()} <strong>{query}</strong>
            </h1>
          </div>
        )}
      </div>
      <div className="flex items-center w-full">
        <h1>{formatMessage({ id: 'number-per-page' })}</h1>
        <Select
          isSearchable={false}
          options={resultsPerPageOptions}
          value={resultsPerPage}
          onChange={handleResultPerPageChange}
          className="mx-2 flex-1"
        />
      </div>
      <div className="flex items-center w-full">
        <h1>{formatMessage({ id: 'sort-by' })}</h1>
        <Select
          isSearchable={false}
          options={sortByOptions}
          value={sortBy}
          onChange={handleSortByChange}
          className="mx-2 flex-1"
        />
      </div>
    </div>
  );
}
