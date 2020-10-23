import React from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { DataProvider } from '../../../contexts/DataContext';
import AllCategoriesMegaMenu from '../AllCategoriesMegaMenu';
import AllCategoriesMenu from '../AllCategoriesMenu';
export default function AllCategories({ dropDownbgRef }) {
  const { allCategories } = React.useContext(DataProvider);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const menuRef = React.useRef();
  const megaMenuRef = React.useRef();
  const handleMenuOpen = () => {
    menuRef.current && menuRef.current.classList.remove('hidden');
    megaMenuRef.current && megaMenuRef.current.classList.remove('hidden');
    dropDownbgRef.current && dropDownbgRef.current.classList.remove('hidden');
  };
  const handleMenuClose = () => {
    menuRef.current.classList.add('hidden');

    megaMenuRef.current.classList.add('hidden');
    dropDownbgRef.current.classList.add('hidden');
  };
  const handleChangeCategory = name => {
    setSelectedCategory(categories.filter(cat => cat.category === name)[0]);
  };
  React.useEffect(() => {
    setCategories(allCategories);
    setSelectedCategory(allCategories[0]);
    setLoading(false);
  }, [allCategories]);

  return (
    <div
      onMouseEnter={handleMenuOpen}
      onMouseLeave={handleMenuClose}
      className="border-r  grid place-items-center  "
    >
      <div className=" px-2 py-2 font-semibold hover:shadow-navCategory flex items-center justify-between relative">
        <span className="mr-8">All Categories</span>
        <BiCaretDown className="w-5 h-5" />
        <AllCategoriesMenu
          menuRef={menuRef}
          categories={categories}
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
          loading={loading}
        />
        <AllCategoriesMegaMenu
          megaMenuRef={megaMenuRef}
          selectedCategory={selectedCategory}
          loading={loading}
        />
      </div>
    </div>
  );
}
