import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useIntl } from 'react-intl';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { scrollTo } from 'scroll-js';
import CategoryItemLoader from '../components/Category/CategoryItemLoader';
import CategoryProductItem from '../components/Category/CategoryProductItem';
import VariantCategoryProductItem from '../components/Category/VariantCategoryProductItem';
import Layout from '../components/Layout';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import { getSingleBrandProducts } from '../Queries/Queries';

export default function SingleBrandMobile() {
  const { formatMessage, locale } = useIntl();
  const { slug } = useParams();
  const [page, setPage] = React.useState(1);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const handlePageChange = data => {
    scrollTo(window, { top: 100 });
    setPage(data.selected + 1);
  };
  const { data, isLoading: productsLoading } = useQuery(
    ['single-brand', { slug, page, number: 24 }],
    getSingleBrandProducts,
    {
      retry: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  return (
    <Layout>
      <div className="min-h-screen p-3">
        <Helmet>
          <title>
            {data?.brandName?.[locale].name ||
              formatMessage({ id: 'shop-on-mrg' })}
          </title>
        </Helmet>
        <AnimatePresence>
          {cartMenuOpen && (
            <SideCartMenuMobile
              key="side-cart"
              setSideMenuOpen={setCartMenuOpen}
            />
          )}
          {cartMenuOpen && (
            <motion.div
              key="sidecart-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartMenuOpen(false)}
              className="side__addCart-bg"
            ></motion.div>
          )}
          {productsLoading && (
            <div
              key="loader"
              className="brand-grid__mobile py-2 min-h-full"
              style={{ minHeight: 'calc(100vh - 150px)' }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
                return <CategoryItemLoader key={i} />;
              })}
            </div>
          )}
          {!productsLoading && (
            <div
              key="header"
              className="flex justify-center flex-col items-center"
            >
              <h1 className="font-bold text-xl mb-3">
                {formatMessage({ id: 'shop-brands' })}{' '}
                {data?.brandName?.[locale].name}{' '}
                {formatMessage({ id: 'at-mrg' })}
              </h1>
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${data?.brandLogo}`}
                alt={data?.brandName?.[locale].name}
                style={{ maxHeight: '150px', width: 'auto' }}
              />
            </div>
          )}
          <div
            key="items"
            className="brand-grid__mobile py-2 min-h-full"
            style={{ minHeight: 'calc(100vh - 150px)' }}
          >
            {data?.products?.map(item => {
              return item.type === 'variation' &&
                item.new_variation_addons.length > 0 ? (
                <VariantCategoryProductItem
                  key={item.id}
                  setCartMenuOpen={setCartMenuOpen}
                  item={item}
                />
              ) : (
                <CategoryProductItem
                  key={item.id}
                  setCartMenuOpen={setCartMenuOpen}
                  item={item}
                />
              );
            })}
          </div>
        </AnimatePresence>
        <ReactPaginate
          previousLabel={<GoChevronLeft className="w-6 h-6 inline" />}
          nextLabel={<GoChevronRight className="w-6 h-6 inline" />}
          breakLabel={'...'}
          breakClassName={'inline'}
          pageCount={data?.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          initialPage={page - 1}
          disableInitialCallback={true}
          onPageChange={handlePageChange}
          containerClassName={'my-2 w-full text-center'}
          subContainerClassName={'p-3 inline'}
          pageLinkClassName="p-3"
          activeClassName={'bg-main-color font-bold text-main-text'}
          pageClassName=" inline-block mx-2 rounded-full text-lg"
          previousClassName="p-3 inline font-bold"
          nextClassName="p-3 inline font-bold"
          disabledClassName="text-gray-500"
        />
      </div>
    </Layout>
  );
}
