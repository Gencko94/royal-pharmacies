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
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { getSingleBrandProducts } from '../Queries/Queries';

export default function SingleBrand() {
  const { formatMessage, locale } = useIntl();
  const { slug } = useParams();
  const [page, setPage] = React.useState(1);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const handlePageChange = data => {
    scrollTo(window, { top: 500 });
    setPage(data.selected + 1);
  };
  const { data, isLoading: productsLoading } = useQuery(
    ['single-brand', { slug, page, number: 42 }],
    getSingleBrandProducts,
    {
      retry: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  return (
    <Layout>
      <Helmet>
        <title>
          {data
            ? `${data.brandName[locale].name} | ${formatMessage({
                id: 'mrg-mall-kuwait',
              })}`
            : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'}
        </title>
        <meta
          name="description"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.brandName?.[locale].name
                } ${formatMessage({ id: 'on-mrg-mall-kuwait' })}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
        <meta
          property="og:title"
          content={
            data
              ? `${data.brandName[locale].name} | ${formatMessage({
                  id: 'mrg-mall-kuwait',
                })}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
        <meta
          property="og:description"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.full_translation?.[locale].title
                }  ${formatMessage({ id: 'on-mrg-mall-kuwait' })}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
      </Helmet>
      <AnimatePresence>
        {cartMenuOpen && (
          <SideCartMenu key="side-cart" setSideMenuOpen={setCartMenuOpen} />
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
      </AnimatePresence>
      <div
        className="max-w-default mx-auto p-4 overflow-hidden"
        style={{ minHeight: 'calc(100vh - 150px)' }}
      >
        {!productsLoading && (
          <div className="flex justify-center flex-col items-center">
            <h1 className="font-bold text-2xl mb-3">
              {formatMessage({ id: 'shop-brands' })}{' '}
              {data?.brandName?.[locale].name} {formatMessage({ id: 'at-mrg' })}
            </h1>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${data?.brandLogo}`}
              alt={data?.brandName?.[locale].name}
              style={{ maxHeight: '200px', width: 'auto' }}
            />
          </div>
        )}

        {productsLoading && (
          <div className="brand-grid__desktop py-2 ">
            {[
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
            ].map(i => {
              return <CategoryItemLoader key={i} />;
            })}
          </div>
        )}
        <div className="brand-grid__desktop py-2 ">
          {data?.products?.map(item => {
            return item.type === 'variation' &&
              Object.entries(item.new_variation_addons).length > 0 ? (
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
      </div>
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
    </Layout>
  );
}
