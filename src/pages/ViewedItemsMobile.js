import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NoViewedItems from '../components/ViewedItems/NoViewedItems';
import ViewedItemMobile from '../components/ViewedItems/ViewedItemMobile';
import { getVisitedItems } from '../Queries/Queries';
import Layout from '../components/Layout';

export default function ViewedItemsMobile() {
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
        <title>{formatMessage({ id: 'viewed-items' })} | MRG</title>
      </Helmet>

      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={40}
            width={40}
            visible={isLoading}
          />
        </div>
      )}
      {!isLoading && (
        <div className=" p-2 min-h-screen">
          <h1 className=" text-xl font-semibold">
            {formatMessage({ id: 'your-viewed-items' })}
          </h1>
          <hr className="my-2" />
          <AnimateSharedLayout>
            <motion.div layout className="viewed-items-container__mobile">
              <AnimatePresence>
                {data.length !== 0 &&
                  data.map(item => {
                    return <ViewedItemMobile key={item.id} item={item} />;
                  })}
                {data.length === 0 && <NoViewedItems key="No Viewed Items" />}
              </AnimatePresence>
            </motion.div>
          </AnimateSharedLayout>
        </div>
      )}
    </Layout>
  );
}
