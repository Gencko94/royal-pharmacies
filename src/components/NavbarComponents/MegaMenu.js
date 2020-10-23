import React from 'react';

export default function MegaMenu({ data, isLightTheme, menuRef }) {
  return (
    <div
      id="mega-menu"
      ref={menuRef}
      className={`absolute z-20  top-100 left-0 min-w-full overflow-hidden  cursor-default ${
        isLightTheme
          ? 'bg-white text-nav-cat-text-light'
          : 'bg-second-nav-dark text-nav-cat-text-dark'
      } `}
    >
      {data && (
        <div className="p-3 pt-4 w-full">
          <div
            className={`
             flex   `}
          >
            <div className="  flex flex-col" style={{ flexBasis: '15%' }}>
              <h1 className="font-semibold mb-2 ">Categories</h1>
              <div className="flex flex-col">
                {data.subCategories.map((subCategory, i) => (
                  <h1 key={i} className="mb-2 text-sm">
                    {subCategory}
                  </h1>
                ))}
              </div>
            </div>
            <div className=" pl-4" style={{ flexBasis: '35%' }}>
              <h1 className="font-semibold mb-2 ">Top Brands</h1>

              <div className="nav-category-brands__grid">
                {data.brands.map((img, i) => (
                  <img
                    src={img}
                    alt="hi"
                    key={i}
                    className="border rounded-sm"
                  />
                ))}
              </div>
            </div>
            <div
              className="   pl-4 w-full "
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 0.5fr',
                flexBasis: '50%',
              }}
            >
              {data.images.map((img, i) => (
                <div className=" mr-2 ">
                  <img className="" src={img} alt="hi" key={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
