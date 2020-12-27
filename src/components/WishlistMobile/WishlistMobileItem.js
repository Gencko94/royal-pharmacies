import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Link } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';
export default function WishlistMobileItem({
  item,
  removeFromWishListButtonLoading,
  handleRemoveItemFromWishList,
}) {
  const { formatMessage, locale } = useIntl();
  const variant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      x: 300,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
  return (
    <motion.div
      layout
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="border-b "
    >
      <div className="py-2 cart__item-mobile">
        <Link to={`/${locale}/item/${item.id}}`}>
          <LazyImage
            src={item.image}
            origin="small"
            alt={item[`name_${locale}`]}
            pb="calc(100% * 286/210)"
          />
        </Link>
        <div className="">
          <Link to={`/${locale}/item/${item.id}}`}>
            <h1 className="font-semibold ">{`${item[`name_${locale}`]}`}</h1>
          </Link>

          {/* <div className="flex items-center mb-2">
            <h1 className=" font-semibold">{formatMessage({ id: 'price' })}</h1>
            <span className="mx-2">{item.price}</span>
          </div> */}
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromWishList(item.id);
          }}
          className={`${
            removeFromWishListButtonLoading === item.id
              ? 'bg-gray-300'
              : 'bg-main-color'
          }  text-main-text text-sm flex items-center justify-center flex-1 p-2 rounded  font-semibold uppercase`}
        >
          {removeFromWishListButtonLoading === item.id ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={20}
              width={20}
              visible={true}
            />
          ) : (
            <>
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-wishlist' })}
              </h1>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
