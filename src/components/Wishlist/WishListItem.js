import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LazyImage from '../../helpers/LazyImage';

export default function WishListItem({
  item,
  handleRemoveItemFromWishList,
  removeFromWishListButtonLoading,
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
      className="wishlist-item"
    >
      <Link to={`/${locale}/${item.slug}/${item.id}}`}>
        <LazyImage
          src={item.image}
          origin="original"
          alt={item[`name_${locale}`]}
          pb="calc(100% * 286/210)"
        />
      </Link>
      <div className="">
        <Link to={`/${locale}/${item.slug}/${item.id}}`}>
          <h1 className="font-semibold text-lg uppercase">{`${
            item[`name_${locale}`]
          }`}</h1>
        </Link>

        <div className="flex text-sm  items-center my-2 ">
          <button
            onClick={() => {
              handleRemoveItemFromWishList(item.id);
            }}
            className={`border-main-color text-main-color border text-sm uppercase flex items-center justify-center  p-2 rounded  font-semibold `}
            style={{ width: '200px' }}
          >
            {removeFromWishListButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={25}
                width={25}
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
      </div>
    </motion.div>
  );
}
