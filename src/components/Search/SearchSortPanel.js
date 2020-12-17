import React from 'react';
import { useIntl } from 'react-intl';
// import Select from 'react-select';
// const sortByOptions = [
//   { value: 'newest', label: 'Newest' },
//   { label: 'Price (Low to High)', value: 'price-asc' },
//   { label: 'Price (High to Low)', value: 'price-desc' },
// ];
export default function SearchSortPanel({ handleSortBy, products, query }) {
  // const [sortBy, setSortBy] = React.useState(null);

  const { formatMessage } = useIntl();
  // const handleSortByChange = selectedValue => {
  //   handleSortBy(selectedValue.value);
  //   setSortBy(selectedValue);
  // };
  const resolvePlural = () => {
    switch (products.length) {
      case 1:
        return formatMessage({ id: 'one-search-result' });
      case 2:
        return formatMessage({ id: 'two-search-results' });
      case products.length > 10:
        return formatMessage({ id: 'more-than-10-search-results' });

      default:
        return formatMessage({ id: 'search-results' });
    }
  };
  return (
    <div className="text-lg">
      <div>
        <span className="text-gray-700">{products.length}</span>
        <span className="text-gray-700"> {resolvePlural()}</span>{' '}
        <strong>{query}</strong>{' '}
      </div>
      {/* <Select
        isSearchable={false}
        options={sortByOptions}
        value={sortBy}
        onChange={handleSortByChange}
        placeholder="Sort By"
      /> */}
    </div>
  );
}
