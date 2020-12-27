import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
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
      <Link to={`/${locale}/c/${item.id}`}>
        <LazyImage
          src={item.image.link}
          origin="original"
          alt={item.small_translation[locale].title}
          pb="calc(100% * 286/210)"
        />
      </Link>
      <div className="pt-2">
        <Link to={`/${locale}/c/${item.id}`}>
          <h1 className=" text-sm font-semibold text-clamp-2 ">
            {item.small_translation[locale].title}
          </h1>
        </Link>

        <button
          onClick={() => removeViewedItems(item.id)}
          className={`
            
          
              bg-main-color text-main-text
           px-2 py-1 rounded-sm flex items-center uppercase justify-center`}
          style={{ width: '76px' }}
        >
          {formatMessage({ id: 'remove' })}
        </button>
      </div>
    </motion.div>
  );
}
