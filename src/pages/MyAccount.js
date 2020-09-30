import React from 'react';
import MobileTabs from '../components/MyAccount/MobileTabs';
import MyAddresses from '../components/MyAccount/MyAddresses';
import MyOrders from '../components/MyAccount/MyOrders';
import MyProfile from '../components/MyAccount/MyProfile';
import PaymentDetails from '../components/MyAccount/PaymentDetails';
export default function MyAccount() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <div className="">
      <MobileTabs
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <div className="py-0 ">
        {selectedIndex === 0 && <MyProfile />}
        {selectedIndex === 1 && <MyAddresses />}
        {selectedIndex === 2 && <MyOrders />}
        {selectedIndex === 3 && <PaymentDetails />}
      </div>
    </div>
  );
}
