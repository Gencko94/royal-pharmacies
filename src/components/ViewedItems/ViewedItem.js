import { motion } from 'framer-motion';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';

export default function ViewedItem({ item }) {
  const { removeViewedItems } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();
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
      className="wishlist-item border-b py-1"
    >
      <Link to={`/${locale}/${item.slug}/${item.id}}`}>
        <LazyImage
          src={item.image?.link}
          origin="original"
          alt={item.translation[locale].title}
          height="110px"
        />
      </Link>
      <div className="">
        <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
          <h1 className="font-semibold uppercase">
            {' '}
            {item.translation[locale].title}
          </h1>
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
            onClick={() => removeViewedItems(item.id)}
            className={`border-main-color hover:bg-main-color hover:text-main-text transition duration-100 text-main-color border text-sm uppercase flex items-center justify-center  p-2 rounded  font-semibold `}
            style={{ width: '200px' }}
          >
            <h1 className="mx-2 whitespace-no-wrap">
              {formatMessage({ id: 'remove' })}
            </h1>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
