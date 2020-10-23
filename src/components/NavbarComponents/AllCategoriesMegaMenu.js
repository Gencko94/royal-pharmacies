import React from 'react';
import { BiCaretRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function AllCategoriesMegaMenu({
  megaMenuRef,
  selectedCategory,
  loading,
}) {
  return (
    <div
      ref={megaMenuRef}
      className={`hidden font-normal  absolute left-100 top-0 bg-white text-nav-cat-text-light z-10 `}
      style={{
        // minWidth: '600px',
        width: '50vw',
        height: '489px',
      }}
    >
      {!loading && (
        <div className="">
          <div className="flex justify-between items-center py-2 px-3">
            <h1 className=" font-semibold">{selectedCategory.category}</h1>
            <Link className="text-sm font-normal hover:text-btn-primary-light hover:underline flex items-center ">
              See all {selectedCategory.category}
              <span className="ml-2 ">
                <BiCaretRight />
              </span>
              {/* <span>
                <BiCaretRight />
              </span> */}
            </Link>
          </div>
          <hr />
          <div className="all-categories__grid p-3 ">
            <div>
              <h1 className="font-bold px-2 py-1">Most Popular</h1>
              {selectedCategory.mostPopular.map((item, i) => {
                return (
                  <Link
                    key={i}
                    className="px-2 py-1  block text-sm hover:text-btn-primary-light"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
            <div>
              <h1 className="font-bold px-2 py-1">Top Brands</h1>
              {selectedCategory.topBrands.map((item, i) => {
                return (
                  <Link
                    key={i}
                    className="px-2 py-1 text-sm block hover:text-btn-primary-light"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
