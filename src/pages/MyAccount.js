import React from 'react';
import MobileTabs from '../components/MyAccount/MobileTabs';
import MyOrders from '../components/MyAccount/MyOrders';
import MyProfile from '../components/MyAccount/MyProfile';
export default function MyAccount() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  return (
    <>
      <MobileTabs
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <div className="py-0 ">
        {selectedIndex === 0 && <MyProfile />}
        {selectedIndex === 1 && <MyOrders />}
      </div>
    </>
  );
}
