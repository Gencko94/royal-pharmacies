import React from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';

export default function SortInfoPanel({
  sortBy,
  resultsPerPage,
  handleSortByChange,
  handleResultPerPageChange,
  category,
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
  return (
    <div className="sm:grid sm:grid-cols-2 gap-2 mb-2 md:flex md:justify-end">
      {/* <div /> */}
      <div className="flex items-center">
        <h1>{formatMessage({ id: 'number-per-page' })}</h1>
        <Select
          isSearchable={false}
          options={resultsPerPageOptions}
          value={resultsPerPage}
          onChange={handleResultPerPageChange}
          className="mx-2"
          styles={{
            valueContainer: provided => {
              return {
                ...provided,
                paddingRight: '2rem',
              };
            },
          }}
        />
      </div>
      {!['best-seller', 'latest-products'].includes(category) && (
        <div className="flex items-center">
          <h1>{formatMessage({ id: 'sort-by' })}</h1>
          <Select
            isSearchable={false}
            options={sortByOptions}
            value={sortBy}
            onChange={handleSortByChange}
            className="mx-2"
            styles={{
              valueContainer: provided => {
                return {
                  ...provided,
                  paddingRight: '7rem',
                };
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
