import React from 'react';
import Helmet from 'react-helmet';
import SideTabs from '../components/MyAccount/SideTabs';
import MyProfile from '../components/MyAccount/MyProfile';
import MyAddresses from '../components/MyAccount/MyAddresses';
import MyOrders from '../components/MyAccount/MyOrders';
import PaymentDetails from '../components/MyAccount/PaymentDetails';
import { DataProvider } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { AnimateSharedLayout, motion } from 'framer-motion';

export default function MyAccount() {
  const { page } = useParams();
  console.log(page);
  const { isLightTheme } = React.useContext(DataProvider);
  const mapPageToIndex = {
    profile: 0,
    addresses: 1,
    orders: 2,
    payment: 3,
    'order-history': 4,
  };
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  React.useEffect(() => {
    setSelectedIndex(() => {
      if (page) {
        return mapPageToIndex[page];
      } else {
        return 0;
      }
    });
  }, [mapPageToIndex, page]);
  return (
    <Layout>
      <Helmet>
        <title>My Account | MRG</title>
      </Helmet>
      <AnimateSharedLayout>
        <motion.div
          layout
          initial={false}
          className={`p-4 pb-3 ${
            isLightTheme
              ? 'bg-body-light text-body-text-light'
              : 'bg-body-dark text-body-text-dark'
          } max-w-default mx-auto myaccount__grid`}
          style={{ minHeight: 'calc(-62px + 100vh)' }}
        >
          <SideTabs
            isLightTheme={isLightTheme}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />

          {selectedIndex === 0 && <MyProfile isLightTheme={isLightTheme} />}
          {selectedIndex === 1 && <MyAddresses isLightTheme={isLightTheme} />}
          {selectedIndex === 2 && <MyOrders isLightTheme={isLightTheme} />}
          {selectedIndex === 3 && (
            <PaymentDetails isLightTheme={isLightTheme} />
          )}
        </motion.div>
      </AnimateSharedLayout>
    </Layout>
  );
}
