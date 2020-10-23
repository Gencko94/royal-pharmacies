import React from 'react';
import { Link } from 'react-router-dom';

export default function AllCategoriesMenu({
  menuRef,
  categories,
  handleChangeCategory,
  selectedCategory,
  loading,
}) {
  return (
    <>
      {!loading && (
        <div
          ref={menuRef}
          className={`hidden  absolute bg-nav-cat-light text-nav-cat-text-light  top-100 left-0 w-full text-sm z-20 overflow-hidden `}
        >
          {categories.map((item, i) => {
            return (
              <Link
                key={i}
                onMouseEnter={() => handleChangeCategory(item.category)}
                className={`px-4 py-2 font-semibold block ${
                  selectedCategory.category === item.category && 'bg-white'
                }`}
              >
                {item.category}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
