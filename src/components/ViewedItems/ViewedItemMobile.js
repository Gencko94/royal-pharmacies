import { motion } from 'framer-motion';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';

export default function ViewedItemMobile({ item }) {
  const { locale, formatMessage } = useIntl();
  const { removeViewedItems } = React.useContext(DataProvider);
  const variants = {
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
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="viewed-item__mobiles"
    >
      <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
        <LazyImage
          src={item.image?.link}
          origin="original"
          alt={item.translation[locale].title}
          height="100px"
        />
      </Link>
      <div className="pt-2">
        <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
          <h1 className=" font-semibold text-clamp-2 ">
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

        <button
          onClick={() => removeViewedItems(item.id)}
          className={`border-main-color transition duration-100 text-main-color border text-sm uppercase flex items-center justify-center  p-2 rounded  font-semibold `}
          style={{ width: '100px' }}
        >
          <h1 className="mx-2 whitespace-no-wrap">
            {formatMessage({ id: 'remove' })}
          </h1>
        </button>
      </div>
    </motion.div>
  );
}
