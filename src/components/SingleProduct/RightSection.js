import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { MdLocationOn } from 'react-icons/md';
import MoonLoader from 'react-spinners/MoonLoader';
import Select from 'react-select';
import { DataProvider } from '../../contexts/DataContext';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
export default function RightSection({
  data,
  handleAddToCart,
  quantity,
  setQuantity,
  handleRemoveFromCart,
  quantityOptions,
  addToCartButtonLoading,
  loading,
  itemInCart,
}) {
  const { formatMessage } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  // const isItemInCart = () => {
  //   const itemInCart = cartItems.find(item => data.id === item.id);
  //   if (itemInCart !== undefined) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  return (
    <div
      className="border  p-2 rounded shadow-sm self-start sticky  "
      style={{ top: '108px' }}
    >
      {loading && (
        <ContentLoader
          speed={2}
          viewBox="0 0 295 480"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="40" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="75" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="85" rx="5" ry="5" width="80%" height="25" />
          <rect x="0" y="125" rx="5" ry="5" width="60%" height="25" />
          <rect x="0" y="165" rx="5" ry="5" width="60%" height="25" />
          <rect x="0" y="200" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="210" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="245" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="255" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="295" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="335" rx="5" ry="5" width="100%" height="25" />
        </ContentLoader>
      )}
      {!loading && (
        <>
          <div className="">
            <h1>
              Sold By <span className="font-semibold">MRG</span>
            </h1>
            <h1>
              Delivered By <span className="font-semibold">MRG</span>
            </h1>
          </div>
          <hr />
          <div className={` rounded py-1  my-1 text-sm`}>
            <div className="flex justify-between items-center font-semibold  ">
              <div className="flex items-center ">
                <div className="flex items-center">
                  <h1>{formatMessage({ id: 'deliver-to' })}</h1>
                  <h1 className="uppercase mx-2">{deliveryCountry}</h1>
                  <MdLocationOn className="w-5 h-5 text-red-800 " />
                </div>
              </div>
              <button className={`py-0 px-2 text-xs bg-gray-200 rounded`}>
                {formatMessage({ id: 'change' })}
              </button>
            </div>
            <div className="">
              <div className="flex items-center">
                <h1 className="text-gray-700">
                  {formatMessage({ id: 'estimated-delivery' })} :
                </h1>
                <h1 className="mx-1">October 8</h1>
              </div>

              <div className="flex items-center">
                <h1 className="text-gray-700">
                  {formatMessage({ id: 'fastest-delivery' })} :
                </h1>
                <h1 className="mx-1">October 6</h1>
              </div>
            </div>
          </div>

          <hr className="mb-2" />
          <div className=" mr-2 flex justify-center items-center mb-2">
            <h1 className=" mr-2 flex-1 font-semibold">
              {formatMessage({ id: 'quantity' })} :{' '}
            </h1>
            <div className="mx-3 flex-1">
              <Select
                onChange={selectedOption => setQuantity(selectedOption)}
                options={quantityOptions}
                className="p-1"
                isSearchable={false}
                value={quantity}
              />
            </div>
          </div>
          <hr />
          <div className="text-gray-700 flex items-center justify-center py-2">
            <h1 className="hover:underline cursor-pointer">
              {formatMessage({ id: 'secure-transaction' })}
            </h1>
            <AiOutlineLock className="h-5 w-5 mx-1 " />
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => {
                if (itemInCart) {
                  handleRemoveFromCart(data.id);
                } else {
                  handleAddToCart();
                }
              }}
              className={`${
                addToCartButtonLoading
                  ? 'bg-gray-300'
                  : itemInCart
                  ? 'bg-main-color'
                  : 'bg-blue-700'
              } flex-1 text-main-text  p-1 px-2 rounded mb-2   flex items-center justify-center font-semibold`}
            >
              {addToCartButtonLoading ? (
                <MoonLoader size={19} color="#b72b2b" />
              ) : itemInCart ? (
                <>
                  <span>
                    <TiShoppingCart className="w-25p h-25p " />
                  </span>
                  <h1 className="mx-2 whitespace-no-wrap">
                    {formatMessage({ id: 'remove-from-cart' })}
                  </h1>
                </>
              ) : (
                <>
                  <span>
                    <TiShoppingCart className="w-25p h-25p" />
                  </span>
                  <h1 className="mx-2">
                    {formatMessage({ id: 'add-to-cart' })}
                  </h1>
                </>
              )}
            </button>

            <button className="bg-blue-500 py-1 px-2 rounded  text-white flex items-center justify-center font-semibold ">
              <span>
                <AiOutlineHeart className="w-25p h-25p" />
              </span>
              <h1 className="mx-1">
                {formatMessage({ id: 'add-to-wishlist' })}
              </h1>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
