import React from 'react';
import GuestPersonalInformationMobile from '../components/CartMobile/GuestCheckoutMobile/GuestPersonalInformationMobile';
import GuestSelectAddressMobile from '../components/CartMobile/GuestCheckoutMobile/GuestSelectAddressMobile';
import OrderPlacedMobile from '../components/CartMobile/GuestCheckoutMobile/OrderPlacedMobile';
import StepperMobile from '../components/CartMobile/GuestCheckoutMobile/StepperMobile';
import Layout from '../components/Layout';

export default function GuestCheckOutMobile() {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [guestAddress, setGuestAddress] = React.useState(null);

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
      <StepperMobile selectedStep={selectedStep} stepDone={stepDone} />
      <div className="mb-3" style={{ minHeight: 'calc(100vh - 180px)' }}>
        {selectedStep === 0 && (
          <GuestSelectAddressMobile
            handleStepForward={handleStepForward}
            guestAddress={guestAddress}
            setGuestAddress={setGuestAddress}
          />
        )}
        {selectedStep === 1 && (
          <GuestPersonalInformationMobile
            handleStepForward={handleStepForward}
            handleStepBack={handleStepBack}
            guestAddress={guestAddress}
          />
        )}
        {selectedStep === 2 && (
          <OrderPlacedMobile
            handleStepForward={handleStepForward}
            handleStepBack={handleStepBack}
          />
        )}
      </div>
    </Layout>
  );
}
