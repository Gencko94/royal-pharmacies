import React from 'react';
import MobileTabs from '../components/MyAccountMobile/MobileTabs';
import MyAddressesMobile from '../components/MyAccountMobile/MyAddressesMobile';
import MyOrdersMobile from '../components/MyAccountMobile/MyOrdersMobile';
import MyProfileMobile from '../components/MyAccountMobile/MyProfileMobile';
import PaymentDetailsMobile from '../components/MyAccountMobile/PaymentDetailsMobile';
import { useMediaQuery } from 'react-responsive';
import SideTabs from '../components/MyAccount/SideTabs';
import MyProfile from '../components/MyAccount/MyProfile';
import MyAddresses from '../components/MyAccount/MyAddresses';
import MyOrders from '../components/MyAccount/MyOrders';
import PaymentDetails from '../components/MyAccount/PaymentDetails';

export default function MyAccount({
  match: {
    params: { page },
  },
}) {
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
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  return (
    <>
      {!isTabletOrAbove ? (
        <div style={{ minHeight: 'calc(100vh - 56px)' }}>
          <MobileTabs
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <div className="py-0 ">
            {selectedIndex === 0 && <MyProfileMobile />}
            {selectedIndex === 1 && <MyAddressesMobile />}
            {selectedIndex === 2 && <MyOrdersMobile />}
            {selectedIndex === 3 && <PaymentDetailsMobile />}
          </div>
        </div>
      ) : (
        <div
          style={{ minHeight: 'calc(100vh - 140px)' }}
          className="mb-4 pt-2 px-8"
        >
          <h1 className="text-2xl mb-2 font-bold">My Personal Account</h1>
          <div className="myaccount__grid ">
            <SideTabs
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />

            {selectedIndex === 0 && <MyProfile />}
            {selectedIndex === 1 && <MyAddresses />}
            {selectedIndex === 2 && <MyOrders />}
            {selectedIndex === 3 && <PaymentDetails />}
          </div>
        </div>
      )}
    </>
  );
}
