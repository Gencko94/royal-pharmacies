import { AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';
const sortByOptions = [
  { value: 'newest', label: 'Newest' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Price (High to Low)', value: 'price-desc' },
];
export default function SortInfoPanel({
  sortBy,
  handleRemoveFilters,
  filters,
  handleSortByChange,
}) {
  const { formatMessage } = useIntl();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.4fr',
        marginBottom: '0.5rem',
      }}
    >
      <AnimateSharedLayout>
        <motion.div layout className="flex items-center">
          {filters.length !== 0 && (
            <>
              <motion.h1 layout className="text-lg font-semibold">
                {formatMessage({ id: 'filtered-by' })}
              </motion.h1>
              <motion.div layout className="mx-1 flex items-center">
                {filters.map(item => {
                  return (
                    <motion.button
                      layout
                      className="mx-1 py-1 px-2 bg-main-color text-main-text rounded-full"
                      key={item.value}
                      onClick={() => handleRemoveFilters(item.type)}
                    >
                      {formatMessage({ id: item.type })} : {item.value}
                    </motion.button>
                  );
                })}
              </motion.div>
            </>
          )}
        </motion.div>
      </AnimateSharedLayout>
      <Select
        isSearchable={false}
        options={sortByOptions}
        value={sortBy}
        onChange={handleSortByChange}
        placeholder="Sort By"
      />
    </div>
  );
}
