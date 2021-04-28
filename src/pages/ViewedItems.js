import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Layout from '../components/Layout';
import ViewedItem from '../components/ViewedItems/ViewedItem';
import NoViewedItems from '../components/ViewedItems/NoViewedItems';
import FeaturedItemsVertical from '../components/Cart/FeaturedItemsVertical';
import { getVisitedItems } from '../Queries/Queries';
export default function ViewedItems() {
  const { formatMessage } = useIntl();
  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery('viewedItems', getVisitedItems, {
    retry: true,
    refetchOnWindowFocus: false,
  });

  return (
    <Layout>
      <Helmet>
        <title>{formatMessage({ id: 'viewed-items' })}</title>
      </Helmet>
      {isLoading && (
        <div className="min-h-screen px-4 py-2 flex items-center justify-center">
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={40}
            width={40}
            visible={true}
          />
        </div>
      )}
      {!isLoading && (
        <div className="px-4 py-2 min-h-screen">
          <h1 className=" text-xl font-semibold">
            {formatMessage({ id: 'your-viewed-items' })}
          </h1>
          <hr className="my-2" />
          <div className="viewed-items-container__desktop">
            <AnimateSharedLayout>
              <motion.div className="viewed-items-grid__desktop" layout>
                <AnimatePresence>
                  {data.length !== 0 &&
                    data.map(item => {
                      return <ViewedItem key={item.id} item={item} />;
                    })}
                  {data.length === 0 && <NoViewedItems key="No Viewed Items" />}
                </AnimatePresence>
              </motion.div>
            </AnimateSharedLayout>
            <div className="self-start sticky" style={{ top: '100px' }}>
              <FeaturedItemsVertical />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
