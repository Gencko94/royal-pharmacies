import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';

export default function ViewedItem({ item }) {
  const { removeViewedItems } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="viewed-item"
    >
      <Link to={`/${locale}/c/${item.id}`}>
        <LazyImage
          src={item.image.link}
          alt={item.small_translation[locale].title}
          origin="original"
          pb="calc(100% * 286/210)"
        />
      </Link>
      <div className="pt-2">
        <Link to={`/${locale}/c/${item.id}`}>
          <h1 className=" text-lg font-semibold text-clamp-2 ">
            {item.small_translation[locale].title}
          </h1>
        </Link>
        <button
          onClick={() => removeViewedItems(item.id)}
          className={`
            bg-main-color text-main-text
           flex items-center justify-center p-2 rounded`}
          style={{ width: '76px' }}
        >
          {formatMessage({ id: 'remove' })}
        </button>
      </div>
    </motion.div>
  );
}
