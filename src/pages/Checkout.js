import React from 'react';
import OrderPlaced from '../components/Cart/GuestCheckout/OrderPlaced';
import Stepper from '../components/Cart/Stepper';
import SelectAddress from '../components/Checkout/SelectAddress';
import Layout from '../components/Layout';
import PersonalInformation from '../components/Checkout/PersonalInformation';
import { DataProvider } from '../contexts/DataContext';
import { useMutation } from 'react-query';
import { checkout } from '../Queries/Queries';

export default function Checkout() {
  const [
    checkoutMutation,
    { isLoading: checkoutLoading },
  ] = useMutation(checkout, { throwOnError: true });

  const { deliveryCountry } = React.useContext(DataProvider);
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState(null);

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

  const handleSelectAddress = address => {
    setSelectedAddress(address);
    handleStepForward();
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
        <Stepper selectedStep={selectedStep} stepDone={stepDone} />
        <div className="mb-3" style={{ minHeight: 'calc(100vh - 150px)' }}>
          {selectedStep === 0 && (
            <SelectAddress
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              handleSelectAddress={handleSelectAddress}
            />
          )}
          {selectedStep === 1 && (
            <PersonalInformation
              handleStepBack={handleStepBack}
              selectedAddress={selectedAddress}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handleCheckout={handleCheckout}
              checkoutLoading={checkoutLoading}
            />
          )}
          {selectedStep === 2 && <OrderPlaced />}
        </div>
      </div>
    </Layout>
  );
}
