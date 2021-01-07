import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LazyImage from '../../helpers/LazyImage';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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
      <Link to={`/${locale}/products/${item.slug}/${item.id}}`}>
        <LazyImage
          src={item.image}
          origin="original"
          alt={item[`name_${locale}`]}
          pb="calc(100% * 286/210)"
        />
      </Link>
      <div className="">
        <Link to={`/${locale}/products/${item.slug}/${item.id}}`}>
          <h1 className="font-semibold uppercase">{`${
            item[`name_${locale}`]
          }`}</h1>
        </Link>
        <Rating
          initialRating={item.rating_avg}
          emptySymbol={<AiOutlineStar className="text-main-color" />}
          fullSymbol={<AiFillStar className="text-main-color" />}
          className="pt-1"
          readonly
        />

        <div className="flex text-sm  items-center my-2 ">
          <button
            onClick={() => {
              handleRemoveItemFromWishList(item.id);
            }}
            className={`border-main-color hover:bg-main-color hover:text-main-text transition duration-100 text-main-color border text-sm uppercase flex items-center justify-center  p-2 rounded  font-semibold `}
            style={{ width: '200px' }}
          >
            {removeFromWishListButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={21}
                width={21}
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
