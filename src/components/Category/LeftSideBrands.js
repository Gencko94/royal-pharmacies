import React from 'react';

export default function LeftSideBrands({
  products,
  handleBrandChange,
  brandFilters,
}) {
  const brands = React.useMemo(() => {
    console.log('triggered');
    let brands = [];
    products.forEach(product => {
      if (product.brand_id) {
        brands.push(product.brand_id);
      }
    });
    brands = [...new Set([...brands])];
    return brands;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (brands.length === 0) {
    return null;
  }
  return (
    <div className="mb-4">
      <h1 className="text-xl font-semibold">Brand</h1>
      <hr className="my-2" />
      <div className="flex flex-col justify-center">
        {brands.map(brand => {
          return (
            <div key={brand} className="flex items-center mb-2 text-sm ">
              <input
                type="checkbox"
                className="form-checkbox border-gray-600 text-red-700 mr-5"
                onChange={() => handleBrandChange(brand)}
                checked={brandFilters === brand}
              />
              <label
                className="hover:underline hover:text-blue-700 cursor-pointer"
                htmlFor={brand}
              >
                {brand}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
