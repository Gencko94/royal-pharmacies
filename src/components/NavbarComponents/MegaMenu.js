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
      className={`absolute z-20  top-100 left-0 w-full max-w-default overflow-hidden shadow-lg  cursor-default bg-white text-nav-cat-text-light
       `}
    >
      <div className="p-3 pt-4 w-full">
        <div className={`flex`}>
          <motion.div
            variants={childVariants}
            className="  flex flex-col"
            style={{ flexBasis: '15%' }}
          >
            <h1 className="font-semibold mb-2 ">
              {formatMessage({ id: 'categories' })}
            </h1>
            <div className="flex flex-col">
              {data.children.map(subCategory => (
                <Link
                  to={`/${locale}/${subCategory.category.slug}`}
                  key={subCategory.id}
                  className="mb-2 text-sm"
                >
                  {subCategory.translation[locale].name}
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={childVariants}
            className=" pl-4"
            style={{ flexBasis: '35%' }}
          >
            <h1 className="font-semibold mb-2 ">
              {formatMessage({ id: 'top-brands' })}
            </h1>

            <div className="nav-category-brands__grid">
              {data.category.list_brands.map(brand => (
                <Link to={`/${locale}/brands/${brand?.slug}`}>
                  <LazyImage
                    src={brand.logo?.link}
                    alt={brand?.translation[locale].name}
                    pb={'100%'}
                  />
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={childVariants}
            className="   pl-4 w-full "
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 0.5fr',
              flexBasis: '50%',
            }}
          >
            {/* {data.category.map((img, i) => (
                <div key={i} className=" mr-2 ">
                  <img className="" src={img} alt="hi" key={i} />
                </div>
              ))} */}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
