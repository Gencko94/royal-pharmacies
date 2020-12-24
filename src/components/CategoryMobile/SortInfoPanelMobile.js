import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { BiFilter, BiFilterAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { useIntl } from 'react-intl';
import FiltersMobile from './FiltersMobile';
import SortByMobile from './SortByMobile';
export default function SortInfoPanelMobile({
  setFiltersOpen,
  setSortByOpen,
  sortByOpen,
  filtersOpen,
  handleSortByChange,
  sortBy,
  products,
  productsLoading,
  handleSubmitPrice,
  handleChangePriceInput,
  priceFilters,
  brandFilters,
  handleBrandChange,
  handlePriceChange,
}) {
  const { formatMessage } = useIntl();
  const variant = {
    initial: {
      y: 42,
    },
    firstAnimation: {
      y: 0,
      top: null,
      transition: {
        type: 'tween',
      },
    },
    secondAnimation: {
      transition: {
        type: 'tween',
      },
    },
    containerExited: {
      y: 42,
    },
  };
  const buttonVariants = {
    start: {
      backgroundColor: '#f7f7fa',
      color: '#252525',
    },
    animation: {
      backgroundColor: '#b72b2b',
      color: '#fff',
    },
  };
  const closeButtonVariant = {
    closeInitial: {
      opacity: 0,
      y: '-100%',
    },
    closeAnimate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
      },
    },
    closeExited: {
      opacity: 0,
      y: '-100%',
    },
  };
  const [options, setOptions] = React.useState(['filter', 'sort']);
  const [showCloseButton, setShowCloseButton] = React.useState(false);
  const handleChangeView = type => {
    if (type === 'sort') {
      setOptions(options.filter(i => i !== 'filter'));
      setShowCloseButton(true);
      setSortByOpen(true);
    } else {
      setOptions(options.filter(i => i !== 'sort'));
      setShowCloseButton(true);
      setFiltersOpen(true);
    }
  };
  const handleClose = () => {
    if (sortByOpen) {
      setSortByOpen(false);
    } else {
      setFiltersOpen(false);
    }
    setOptions(['filter', 'sort']);
    setShowCloseButton(false);
  };
  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        variants={variant}
        initial="initial"
        animate={
          sortByOpen || filtersOpen ? 'secondAnimation' : 'firstAnimation'
        }
        exit="containerExited"
        className=" fixed bottom-0 left-0 right-0 z-50 bg-body-light"
      >
        <AnimateSharedLayout>
          <motion.div
            layout
            className="flex items-center relative justify-center"
          >
            {options.map(option => {
              return (
                <motion.button
                  key={option}
                  layout
                  variants={buttonVariants}
                  initial="start"
                  animate={filtersOpen || sortByOpen ? 'animation' : 'start'}
                  onClick={() => handleChangeView(option)}
                  className={` p-2 flex font-semibold items-center border w-full`}
                >
                  <motion.span layout>
                    {option === 'filter'
                      ? formatMessage({ id: 'filter-by' })
                      : formatMessage({ id: 'sort-by' })}
                  </motion.span>
                  <motion.span layout className="mx-3">
                    {options === 'filter' ? (
                      <BiFilterAlt className="w-5 h-5" />
                    ) : (
                      <BiFilter className="w-6 h-6" />
                    )}
                  </motion.span>
                </motion.button>
              );
            })}

            <AnimatePresence>
              {showCloseButton && (
                <motion.div
                  variants={closeButtonVariant}
                  initial="closeInitial"
                  animate="closeAnimate"
                  exit="closeExited"
                  className="absolute right-10 top-10"
                >
                  <button onClick={handleClose}>
                    <MdClose className="w-6 h-6 text-main-text" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>
        {sortByOpen && (
          <SortByMobile
            handleSortByChange={handleSortByChange}
            sortBy={sortBy}
            handleClose={handleClose}
          />
        )}
        {filtersOpen && (
          <FiltersMobile
            products={products}
            productsLoading={productsLoading}
            handleSubmitPrice={handleSubmitPrice}
            handleChangePriceInput={handleChangePriceInput}
            priceFilters={priceFilters}
            brandFilters={brandFilters}
            handleBrandChange={handleBrandChange}
            handlePriceChange={handlePriceChange}
            handleClose={handleClose}
          />
        )}
      </motion.div>
    </AnimateSharedLayout>
  );
}
