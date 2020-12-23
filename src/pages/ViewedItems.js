import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';
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
        <title>Viewed Items | MRG</title>
      </Helmet>
      {isLoading && (
        <div className="min-h-screen px-4 py-2 flex items-center justify-center">
          <BeatLoader size={15} color={'#b72b2b'} />
        </div>
      )}
      {!isLoading && (
        <div className="px-4 py-2 min-h-screen">
          <h1 className=" text-xl font-semibold">
            {formatMessage({ id: 'your-viewed-items' })}
          </h1>
          <hr className="my-2" />
          <div className="viewed-items-grid__desktop">
            <AnimateSharedLayout>
              <motion.div layout>
                <AnimatePresence>
                  {data.length !== 0 &&
                    data.map(item => {
                      return <ViewedItem key={item.id} item={item} />;
                    })}
                  {data.length === 0 && <NoViewedItems key="No Viewed Items" />}
                </AnimatePresence>
              </motion.div>
            </AnimateSharedLayout>
            <div>
              <FeaturedItemsVertical />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
