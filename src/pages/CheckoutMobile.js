import React from 'react';
import OrderPlacedMobile from '../components/CartMobile/GuestCheckoutMobile/OrderPlacedMobile';
import PersonalInformationMobile from '../components/MobileCheckout/PersonalInformationMobile';
import StepperMobile from '../components/CartMobile/GuestCheckoutMobile/StepperMobile';
import Layout from '../components/Layout';
import SelectAddressMobile from '../components/MobileCheckout/SelectAddressMobile';

export default function CheckoutMobile() {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
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
        <StepperMobile selectedStep={selectedStep} stepDone={stepDone} />
        <div className="mb-3" style={{ minHeight: 'calc(100vh - 150px)' }}>
          {selectedStep === 0 && (
            <SelectAddressMobile
              handleStepForward={handleStepForward}
              setSelectedAddress={setSelectedAddress}
            />
          )}
          {selectedStep === 1 && (
            <PersonalInformationMobile
              handleStepForward={handleStepForward}
              handleStepBack={handleStepBack}
              selectedAddress={selectedAddress}
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
            />
          )}
          {selectedStep === 2 && (
            <OrderPlacedMobile
              handleStepForward={handleStepForward}
              handleStepBack={handleStepBack}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
