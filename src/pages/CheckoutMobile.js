import React from 'react';
import OrderPlacedMobile from '../components/CartMobile/GuestCheckoutMobile/OrderPlacedMobile';
import PersonalInformationMobile from '../components/MobileCheckout/PersonalInformationMobile';
import StepperMobile from '../components/CartMobile/GuestCheckoutMobile/StepperMobile';
import Layout from '../components/Layout';
import SelectAddressMobile from '../components/MobileCheckout/SelectAddressMobile';
import { DataProvider } from '../contexts/DataContext';
import { checkout } from '../Queries/Queries';
import { useMutation } from 'react-query';

export default function CheckoutMobile() {
  const { deliveryCountry } = React.useContext(DataProvider);
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState(null);

  const [
    checkoutMutation,
    { isLoading: checkoutLoading },
  ] = useMutation(checkout, { throwOnError: true });
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
  const handleCheckout = async () => {
    const order = {
      address: selectedAddress.id,
      payment_method: paymentMethod,
      order_type:
        deliveryCountry?.translation.en === 'Kuwait'
          ? 'local'
          : 'international',
    };
    try {
      await checkoutMutation({
        deliveryCountry,
        order,
      });
      setSelectedStep(2);
    } catch (error) {
      console.log(error.response);
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
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          )}
          {selectedStep === 1 && (
            <PersonalInformationMobile
              handleStepBack={handleStepBack}
              selectedAddress={selectedAddress}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handleCheckout={handleCheckout}
              checkoutLoading={checkoutLoading}
            />
          )}
          {selectedStep === 2 && <OrderPlacedMobile />}
        </div>
      </div>
    </Layout>
  );
}
