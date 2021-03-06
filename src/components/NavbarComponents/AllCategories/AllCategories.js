import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../../contexts/DataContext';
import AllCategoriesMegaMenu from '../AllCategoriesMegaMenu';
import AllCategoriesMenu from '../AllCategoriesMenu';
export default function AllCategories({ navCategories }) {
  const { formatMessage, locale } = useIntl();
  const { categories } = React.useContext(DataProvider);

  const [selectedCategory, setSelectedCategory] = React.useState(() => {
    if (categories) {
      return categories[0];
    } else {
      return {};
    }
  });
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const [subCategoriesOpen, setSubCategoriesOpen] = React.useState(false);

  const handleMenuOpen = () => {
    setCategoriesOpen(true);
  };
  const handleMenuClose = () => {
    setCategoriesOpen(false);
    setSubCategoriesOpen(false);
    setSelectedCategory({});
  };
  const handleMegaMenuOpen = categoryId => {
    setSubCategoriesOpen(true);
    setSelectedCategory(categories.find(cat => cat.id === categoryId));
  };

  if (!navCategories) {
    return null;
  }
  return (
    <div
      onMouseEnter={() => categories && handleMenuOpen()}
      onMouseLeave={handleMenuClose}
      className={`font-semibold items-center cursor-pointer flex  justify-between py-2 px-4 ${
        locale === 'ar' ? 'border-l' : 'border-r'
      } relative`}
      style={{ flexBasis: '250px' }}
    >
      <span className="uppercase " style={{ fontWeight: '900' }}>
        {formatMessage({ id: 'all-categories' })}
      </span>
      <BiCaretDown className="w-5 h-5" />
      <AnimatePresence>
        {categoriesOpen && (
          <AllCategoriesMenu
            categories={categories}
            selectedCategory={selectedCategory}
            handleMegaMenuOpen={handleMegaMenuOpen}
            subCategoriesOpen={subCategoriesOpen}
            handleMenuClose={handleMenuClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {subCategoriesOpen && (
          <AllCategoriesMegaMenu
            selectedCategory={selectedCategory}
            subCategoriesOpen={subCategoriesOpen}
            handleMenuClose={handleMenuClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
