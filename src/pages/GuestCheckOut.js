import React from 'react';
import SelectGuestAddress from '../components/Cart/GuestCheckout/SelectGuestAddress';
import OrderPlaced from '../components/Cart/GuestCheckout/OrderPlaced';
import GuestPersonalInformation from '../components/Cart/GuestCheckout/GuestPersonalInformation';
import Stepper from '../components/Cart/Stepper';
import Layout from '../components/Layout';

export default function GuestCheckOut() {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [guestAddress, setGuestAddress] = React.useState(null);
  const [personalInfo, setPersonalInfo] = React.useState({
    fullName: '',
    phoneNumber: '',
  });
  const [stepDone, setStepDone] = React.useState({
    0: false,
    1: false,
    2: false,
  });
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
              handleStepForward={handleStepForward}
              setGuestAddress={setGuestAddress}
            />
          )}
          {selectedStep === 1 && (
            <GuestPersonalInformation
              handleStepForward={handleStepForward}
              handleStepBack={handleStepBack}
              guestAddress={guestAddress}
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
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
