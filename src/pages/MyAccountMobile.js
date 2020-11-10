import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import LayoutMobile from '../components/LayoutMobile';
import MobileTabs from '../components/MyAccountMobile/MobileTabs';
import MyAddressesMobile from '../components/MyAccountMobile/MyAddressesMobile';
import MyOrdersMobile from '../components/MyAccountMobile/MyOrdersMobile';
import MyProfileMobile from '../components/MyAccountMobile/MyProfileMobile';
import PaymentDetailsMobile from '../components/MyAccountMobile/PaymentDetailsMobile';
export default function MyAccountMobile() {
  const { page } = useParams();
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
    <LayoutMobile>
      <Helmet>
        <title>My Account | MRG</title>
      </Helmet>
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
    </LayoutMobile>
  );
}
