import React from 'react';
import OrderPlacedMobile from '../components/CartMobile/GuestCheckoutMobile/OrderPlacedMobile';
import PersonalInformationMobile from '../components/MobileCheckout/PersonalInformationMobile';
import StepperMobile from '../components/CartMobile/GuestCheckoutMobile/StepperMobile';
import Layout from '../components/Layout';
import SelectAddressMobile from '../components/MobileCheckout/SelectAddressMobile';
import { DataProvider } from '../contexts/DataContext';
import { checkout } from '../Queries/Queries';
import { useMutation } from 'react-query';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { useIntl } from 'react-intl';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function CheckoutMobile() {
  const { deliveryCountry } = React.useContext(DataProvider);
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [paymentUrl, setPaymentUrl] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { cartItems, cartItemsLoading, coupon } = React.useContext(
    CartAndWishlistProvider
  );
  const { authenticationLoading } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
  const closeError = () => {
    setErrorOpen(false);
  };

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
    setSelectedStep(selectedStep + 1);
    setStepDone({
      ...stepDone,
      [selectedStep]: true,
    });
  };
  const handleSelectAddress = address => {
    setSelectedAddress(address);
    handleStepForward();
  };
  const handleCheckout = async () => {
    const order = {
      address: selectedAddress.id,
      payment_method: paymentMethod,
      order_type:
        deliveryCountry?.translation.en.name === 'Kuwait'
          ? 'local'
          : 'international',
    };
    try {
      const res = await checkoutMutation({
        deliveryCountry,
        order,
        coupon,
      });
      setStepDone({
        ...stepDone,
        1: true,
      });

      setPaymentUrl(res.payment);
      setSelectedStep(2);
    } catch (error) {
      setErrorOpen(true);
      if (
        error.response?.data?.message ===
        'Coupon already used by this customer.'
      ) {
        return setErrorMessage(formatMessage({ id: 'coupon-limit-reached' }));
      }
      setErrorMessage(formatMessage({ id: 'something-went-wrong-snackbar' }));
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStep]);
  if (cartItemsLoading || authenticationLoading) {
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
          style={{ height: 'calc(100vh - 110px)', maxWidth: '360px' }}
        >
          <h1 className="text-lg font-semibold">
            {formatMessage({ id: 'checkout-cart-empty' })}
          </h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className="xxl:max-w-default md:max-w-screen-xl mx-auto">
        <StepperMobile selectedStep={selectedStep} stepDone={stepDone} />
        <div className="mb-3" style={{ minHeight: 'calc(100vh - 231px)' }}>
          {selectedStep === 0 && (
            <SelectAddressMobile handleSelectAddress={handleSelectAddress} />
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
          {selectedStep === 2 && (
            <OrderPlacedMobile
              paymentUrl={paymentUrl}
              paymentMethod={paymentMethod}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
