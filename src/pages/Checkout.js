import React from 'react';
import OrderPlaced from '../components/Cart/GuestCheckout/OrderPlaced';
import Stepper from '../components/Cart/Stepper';
import SelectAddress from '../components/Checkout/SelectAddress';
import Layout from '../components/Layout';
import PersonalInformation from '../components/Checkout/PersonalInformation';
import { DataProvider } from '../contexts/DataContext';
import { useMutation } from 'react-query';
import { checkout } from '../Queries/Queries';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorSnackbar from '../components/ErrorSnackbar';
export default function Checkout() {
  const [checkoutMutation, { isLoading: checkoutLoading }] = useMutation(
    checkout,
    {
      throwOnError: true,
    }
  );

  const { cartItems, cartItemsLoading } = React.useContext(
    CartAndWishlistProvider
  );
  const { deliveryCountry } = React.useContext(DataProvider);
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [paymentUrl, setPaymentUrl] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const { formatMessage } = useIntl();

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
      const res = await checkoutMutation({
        deliveryCountry,
        order,
      });
      console.log(res);
      setPaymentUrl(res.payment);
      setSelectedStep(2);
    } catch (error) {
      setErrorMessage(formatMessage({ id: 'something-went-wrong-snackbar' }));
      console.log(error.response);
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStep]);
  if (cartItemsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={50}
          width={50}
          visible={true}
        />
      </div>
    );
  }
  if (!cartItemsLoading && cartItems.length === 0) {
    return (
      <Layout>
        <div
          className="flex items-center justify-center mx-auto text-center"
          style={{ height: 'calc(100vh - 56px)', maxWidth: '600px' }}
        >
          <h1 className="text-2xl font-semibold">
            {formatMessage({ id: 'checkout-cart-empty' })}
          </h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="xxl:max-w-default md:max-w-screen-xl mx-auto">
        {errorOpen && (
          <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
        )}
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
          {selectedStep === 2 && (
            <OrderPlaced
              paymentUrl={paymentUrl}
              paymentMethod={paymentMethod}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
