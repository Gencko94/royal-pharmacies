import React from 'react';
import SelectGuestAddress from '../components/Cart/GuestCheckout/SelectGuestAddress';
import OrderPlaced from '../components/Cart/GuestCheckout/OrderPlaced';
import GuestPersonalInformation from '../components/Cart/GuestCheckout/GuestPersonalInformation';
import Stepper from '../components/Cart/Stepper';
import Layout from '../components/Layout';

export default function GuestCheckOut() {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [guestAddress, setGuestAddress] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [stepDone, setStepDone] = React.useState({
    0: false,
    1: false,
    2: false,
  });
  const handleAddAddressAndInfo = ({ guestAddress, phoneNumber, name }) => {
    setPhoneNumber(phoneNumber);
    setName(name);
    setGuestAddress(guestAddress);
    handleStepForward();
  };
  const handleStepBack = () => {
    if (selectedStep === 0) {
      return;
    } else {
      setSelectedStep(selectedStep - 1);
      setStepDone({
        ...stepDone,
        [selectedStep - 1]: false,
      });
    }
  };
  const handleStepForward = () => {
    if (selectedStep === 2) {
      return;
    } else {
      setSelectedStep(selectedStep + 1);
      setStepDone({
        ...stepDone,
        [selectedStep]: true,
      });
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStep]);
  return (
    <Layout>
      <div className="xxl:max-w-default md:max-w-screen-xl mx-auto">
        <Stepper selectedStep={selectedStep} stepDone={stepDone} />
        <div className="mb-3" style={{ minHeight: 'calc(100vh - 150px)' }}>
          {selectedStep === 0 && (
            <SelectGuestAddress
              name={name}
              phoneNumber={phoneNumber}
              handleAddAddressAndInfo={handleAddAddressAndInfo}
            />
          )}
          {selectedStep === 1 && (
            <GuestPersonalInformation
              handleStepForward={handleStepForward}
              handleStepBack={handleStepBack}
              guestAddress={guestAddress}
            />
          )}
          {selectedStep === 2 && (
            <OrderPlaced
              handleStepForward={handleStepForward}
              handleStepBack={handleStepBack}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
