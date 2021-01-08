import { motion } from 'framer-motion';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Rating from 'react-rating';
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
        <Link to={`/${locale}/products/${item.slug}/${item.id}}`}>
          <LazyImage
            src={item.image}
            origin="small"
            alt={item[`name_${locale}`]}
            pb="calc(100% * 286/210)"
          />
        </Link>
        <div className="">
          <Link to={`/${locale}/products/${item.slug}/${item.id}}`}>
            <h1 className="font-semibold ">{`${item[`name_${locale}`]}`}</h1>
          </Link>
          <Rating
            initialRating={item.rating_avg}
            emptySymbol={<AiOutlineStar className="text-main-color" />}
            fullSymbol={<AiFillStar className="text-main-color" />}
            className="pt-1"
            readonly
          />
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromWishList(item.id);
          }}
          className={`
              bg-main-color
          } text-main-text text-sm flex items-center justify-center flex-1 p-2 rounded  font-semibold uppercase`}
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
