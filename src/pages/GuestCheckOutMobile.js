import React from 'react';
import AddressMobile from '../components/Cart/GuestCheckoutMobile/AddressMobile';
import OrderPlacedMobile from '../components/Cart/GuestCheckoutMobile/OrderPlacedMobile';
import PersonalInformationMobile from '../components/Cart/GuestCheckoutMobile/PersonalInformationMobile';
import Stepper from '../components/Cart/Stepper';

export default function GuestCheckOutMobile() {
  const [selectedStep, setSelectedStep] = React.useState(2);
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
  return (
    <div className="">
      <Stepper selectedStep={selectedStep} stepDone={stepDone} />
      <div className="mb-3" style={{ minHeight: 'calc(100vh - 180px)' }}>
        {selectedStep === 0 && (
          <AddressMobile handleStepForward={handleStepForward} />
        )}
        {selectedStep === 1 && (
          <PersonalInformationMobile
            handleStepForward={handleStepForward}
            handleStepBack={handleStepBack}
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
  );
}
