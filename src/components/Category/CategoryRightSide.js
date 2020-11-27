import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
export default function CategoryRightSide({
  data,
  queryData,
  filteredData,
  filtersApplied,
}) {
  const { locale } = useIntl();
  console.log(data);
  return (
    <>
      {data.length !== 0 &&
        data.map(item => {
          return (
            <div key={item.id} className="">
              <div
                style={{ minHeight: '350px' }}
                className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg "
              >
                <Link to={`/${locale}/products/${item.id}`}>
                  <img
                    src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image.link}`}
                    alt="something"
                    className="w-full h-auto  "
                  />
                </Link>
                <hr />

                <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                  <h1 className="text-clamp-2 text-sm font-semibold">
                    <Link
                      title={item.translation[locale].title}
                      className="hover:underline"
                      to={`/products/${item.id}`}
                    >
                      {item.translation[locale].title}
                    </Link>
                  </h1>

                  <div className="flex items-center">
                    <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                      {item.simple_addons.price}{' '}
                      <span className="text-xs ">KD</span>
                    </p>
                    {/* {item.sale && (
                        <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                          {' '}
                          {item.priceBefore}{' '}
                          <span className="font-normal">KD</span>
                        </p>
                      )} */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {/* {filtersApplied &&
        (filteredData.length !== 0 ? (
          filteredData.map((item, i) => {
            return (
              <div key={i} className="">
                <div
                  style={{ minHeight: '350px' }}
                  className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg "
                >
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.photos.small}
                      alt="something"
                      className="w-full h-auto  "
                    />
                  </Link>
                  <hr />

                  <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                    <h1 className="text-clamp-2 text-sm font-semibold">
                      <Link
                        title={item.name}
                        className="hover:underline"
                        to={`/products/${item.id}`}
                      >
                        {item.name}
                      </Link>
                    </h1>

                    <div className="flex items-center">
                      <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                        {item.price} <span className="text-xs ">KD</span>
                      </p>
                      {item.sale && (
                        <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                          {' '}
                          {item.priceBefore}{' '}
                          <span className="font-normal">KD</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="absolute top-1/2 left-1/2 transform translate-y-n1/2 translate-x-n1/2 ">
            <h1 className="text-xl font-semibold">
              Oops, we didn't find what you need
            </h1>
          </div>
        ))} */}
    </>
  );
}
