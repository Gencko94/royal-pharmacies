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
  handleChangePriceInput,
  priceFilters,
  brandFilters,
  brands,
  handleSubmitFilters,
}) {
  const { formatMessage, locale } = useIntl();
  const variant = {
    initial: {
      y: 58,
      transition: {
        type: 'tween',
      },
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
      y: 58,
      transition: {
        type: 'tween',
      },
    },
  };
  const buttonVariants = {
    start: {
      backgroundColor: '#edf2f7',
      color: '#252525',
      justifyContent: 'center',
      padding: '1rem',
      transition: {
        type: 'tween',
      },
    },
    animation: {
      backgroundColor: '#b72b2b',
      color: '#fff',
      justifyContent: 'start',
      padding: '0.5rem',
      transition: {
        type: 'tween',
      },
    },
  };
  const closeButtonVariant = {
    closeInitial: {
      opacity: 0,
      y: '-100%',
    },
    closeAnimate: {
      opacity: 1,
      y: '-50%',
      type: 'tween',
      transition: {
        delay: 0.5,
        type: 'tween',
      },
    },
    closeExited: {
      opacity: 0,
      y: '-100%',
      type: 'tween',
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
                  className={`flex font-semibold items-center border w-full`}
                >
                  <motion.p className="text-lg" layout>
                    {option === 'filter'
                      ? formatMessage({ id: 'filter-by' })
                      : formatMessage({ id: 'sort-by' })}
                  </motion.p>
                  <motion.span layout className="mx-3">
                    {option === 'filter' ? (
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
                <motion.button
                  variants={closeButtonVariant}
                  initial="closeInitial"
                  animate="closeAnimate"
                  exit="closeExited"
                  className={`absolute ${
                    locale === 'ar' ? 'left-10' : 'right-10'
                  }`}
                  style={{ top: '50%' }}
                  onClick={handleClose}
                >
                  <MdClose className="w-6 h-6 text-main-text" />
                </motion.button>
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
            handleChangePriceInput={handleChangePriceInput}
            priceFilters={priceFilters}
            brandFilters={brandFilters}
            handleClose={handleClose}
            brands={brands}
            handleSubmitFilters={handleSubmitFilters}
          />
        )}
      </motion.div>
    </AnimateSharedLayout>
  );
}
