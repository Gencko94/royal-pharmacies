import React from 'react';
import Helmet from 'react-helmet';
import SideTabs from '../components/MyAccount/SideTabs';
import MyProfile from '../components/MyAccount/MyProfile';
import MyAddresses from '../components/MyAccount/MyAddresses';
import MyOrders from '../components/MyAccount/MyOrders';
import PaymentDetails from '../components/MyAccount/PaymentDetails';
import { DataProvider } from '../contexts/DataContext';

export default function MyAccount({
  match: {
    params: { page },
  },
}) {
  const { isLightTheme } = React.useContext(DataProvider);
  const mapPageToIndex = {
    profile: 0,
    addresses: 1,
    orders: 2,
    payment: 3,
    order_history: 4,
  };
  const [selectedIndex, setSelectedIndex] = React.useState(() => {
    if (page) {
      return mapPageToIndex[page];
    } else {
      return 0;
    }
  });
  return (
    <>
      <Helmet>
        <title>My Account | Attiah Mall</title>
      </Helmet>
      <div
        style={{ minHeight: 'calc(100vh - 140px)' }}
        className={`mb-4 pt-2 px-8 ${
          isLightTheme
            ? 'bg-body-light text-body-text-light'
            : 'bg-body-dark text-body-text-dark'
        }`}
      >
        <h1 className="text-xl mb-2 font-semibold">My Personal Account</h1>
        <div className="myaccount__grid ">
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
        </div>
      </div>
    </>
  );
}
