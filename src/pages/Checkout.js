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
  const [paymentMethod, setPaymentMethod] = React.useState('K-net');
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
  const handleCheckout = async () => {
    const order = {
      address: selectedAddress.id,
      payment_method: 'knet',
      order_type: 'local',
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
              handleStepForward={handleStepForward}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          )}
          {selectedStep === 1 && (
            <PersonalInformation
              handleStepBack={handleStepBack}
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
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
