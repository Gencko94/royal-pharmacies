import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';

export default function MegaMenu({ data }) {
  const { formatMessage, locale } = useIntl();
  const containerVariants = {
    hidden: {
      opacity: 0,
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      transition: {
        duration: 0.1,
        staggerChildren: 0.1,
      },
    },
    exited: {
      opacity: 0,
    },
  };
  const childVariants = {
    hidden: {
      y: -30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exited"
      className={`absolute z-20  top-100 left-0 w-full max-w-default overflow-hidden shadow-lg  cursor-default bg-body-light text-body-text-light
       `}
    >
      <div className="p-3 pt-4 max-w-screen-xl mx-auto">
        <div className={`flex`}>
          <motion.div
            variants={childVariants}
            className="  flex flex-1 flex-col"
          >
            <h1 className=" text-xl text-center font-bold mb-2 ">
              {formatMessage({ id: 'categories' })}
            </h1>
            <div className="nav-category__grid p-3 ">
              {data.children.map(item => {
                return (
                  <Link
                    to={`/${locale}/${item.category.slug}`}
                    key={item.id}
                    className="px-2 py-1 flex flex-col justify-center items-center text-sm hover:text-main-color"
                  >
                    <LazyImage
                      src={item.category.translation[locale].image?.link}
                      alt={item.category.translation[locale].name}
                      pb={'100%'}
                    />
                    <h1
                      className="text-center font-semibold "
                      style={{ height: '42px', marginTop: '0.25rem' }}
                    >
                      {item.translation[locale].name}
                    </h1>
                  </Link>
                );
              })}
            </div>
          </motion.div>
          <motion.div variants={childVariants} className="flex-1">
            <h1 className="font-bold text-center text-xl mb-2 ">
              {formatMessage({ id: 'top-brands' })}
            </h1>

            <div className="nav-category-brands__grid">
              {data.category.list_brands.map(brand => (
                <div key={brand.id}>
                  <Link
                    className="overflow-hidden rounded-full border-2 block"
                    to={`/${locale}/brands/${brand?.slug}`}
                  >
                    <LazyImage
                      src={brand.logo?.link}
                      alt={brand?.translation[locale].name}
                      pb={'100%'}
                    />
                  </Link>
                  <h1
                    className="text-center text-sm font-semibold "
                    style={{ height: '42px', marginTop: '0.25rem' }}
                  >
                    {brand?.translation[locale].name}
                  </h1>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
