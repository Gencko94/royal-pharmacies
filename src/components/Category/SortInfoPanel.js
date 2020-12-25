import React from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';

export default function SortInfoPanel({
  sortBy,
  resultsPerPage,
  handleSortByChange,
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
        label: 5,
        value: 5,
      },
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.8fr 0.8fr',
        marginBottom: '0.5rem',
      }}
    >
      <div />
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
