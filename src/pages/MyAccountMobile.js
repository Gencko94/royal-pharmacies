import React from 'react';
import MobileTabs from '../components/MyAccountMobile/MobileTabs';
import MyAddressesMobile from '../components/MyAccountMobile/MyAddressesMobile';
import MyOrdersMobile from '../components/MyAccountMobile/MyOrdersMobile';
import MyProfileMobile from '../components/MyAccountMobile/MyProfileMobile';
import PaymentDetailsMobile from '../components/MyAccountMobile/PaymentDetailsMobile';
export default function MyAccountMobile({
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

  return (
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
  );
}
