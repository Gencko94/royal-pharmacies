import React from 'react';
import SelectGuestAddress from '../components/Cart/GuestCheckout/SelectGuestAddress';
import OrderPlaced from '../components/Cart/GuestCheckout/OrderPlaced';
import GuestPersonalInformation from '../components/Cart/GuestCheckout/GuestPersonalInformation';
import Stepper from '../components/Cart/Stepper';
import Layout from '../components/Layout';
import { useMutation } from 'react-query';
import { DataProvider } from '../contexts/DataContext';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { guestCheckout } from '../Queries/Queries';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
export default function GuestCheckOut() {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { guestCartItems, coupon, guestCartItemsLoading } = React.useContext(
    CartAndWishlistProvider
  );
  const { authenticationLoading, userId } = React.useContext(AuthProvider);
  const options = [
    { value: '00965', label: '+965' },
    { value: '00966', label: '+966' },
  ];
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const [
    guestCheckoutMutation,
    { isLoading: checkoutLoading },
  ] = useMutation(guestCheckout, { throwOnError: true });
  const [guestAddress, setGuestAddress] = React.useState({
    lat: '',
    lng: '',
    addressDetails: {
      phoneNumber: '',
      apartmentOrHouseNumber: '',
      buildingOrTowerNumber: '',
      additionalDetails: '',
      markerAddress: '',
      userTyped_address: '',
    },
  });
  const [paymentUrl, setPaymentUrl] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [stepDone, setStepDone] = React.useState({
    0: false,
    1: false,
    2: false,
  });
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const { formatMessage, locale } = useIntl();
  const handleAddAddressAndInfo = ({
    guestAddress,
    phoneNumber,
    name,
    email,
  }) => {
    setPhoneNumber(phoneNumber);
    setName(name);
    setEmail(email);
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
    setSelectedStep(selectedStep + 1);
    setStepDone({
      ...stepDone,
      [selectedStep]: true,
    });
  };
  const handleGuestCheckout = async () => {
    const order = {
      customer: {
        name,
        mobile: `${countryCode.value}${phoneNumber}`,
        email,
      },
      cart: JSON.stringify(guestCartItems),
      address: {
        lat: guestAddress.lat?.toString(),
        lng: guestAddress.lng?.toString(),
        marked_address: guestAddress.addressDetails.markerAddress || '',
        apartment_house_number:
          guestAddress.addressDetails.apartmentOrHouseNumber,
        building_tower_number:
          guestAddress.addressDetails.buildingOrTowerNumber,
        phone_number: `${countryCode.value}${guestAddress.addressDetails.phoneNumber}`,
        addition_direction: guestAddress.addressDetails.additionalDetails,

        userTyped_address:
          guestAddress.addressDetails.userTyped_location || null,
        type: guestAddress.lat ? 'map' : 'text',
      },
      coupon,
      payment_method: paymentMethod,
      order_type:
        deliveryCountry?.translation.en.name === 'Kuwait'
          ? 'local'
          : 'international',
    };
    try {
      const res = await guestCheckoutMutation({
        deliveryCountry,
        order,
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
        error.response?.data?.message === 'Please login to your account first'
      ) {
        return setErrorMessage(formatMessage({ id: 'guest-checkout-login' }));
      } else if (
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
  if (guestCartItemsLoading || authenticationLoading) {
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
  if (!authenticationLoading && userId) {
    return <Redirect to={`/${locale}/checkout/user-checkout`} />;
  }
  if (!guestCartItemsLoading && guestCartItems?.length === 0) {
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
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className="xxl:max-w-default md:max-w-screen-xl mx-auto">
        <Stepper selectedStep={selectedStep} stepDone={stepDone} />
        <div className="mb-3" style={{ minHeight: 'calc(100vh - 150px)' }}>
          {selectedStep === 0 && (
            <SelectGuestAddress
              name={name}
              phoneNumber={phoneNumber}
              handleAddAddressAndInfo={handleAddAddressAndInfo}
              guestAddress={guestAddress}
              email={email}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />
          )}
          {selectedStep === 1 && (
            <GuestPersonalInformation
              handleStepBack={handleStepBack}
              guestAddress={guestAddress}
              name={name}
              phoneNumber={phoneNumber}
              checkoutLoading={checkoutLoading}
              handleGuestCheckout={handleGuestCheckout}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          )}
          {selectedStep === 2 && (
            <OrderPlaced
              handleStepForward={handleStepForward}
              handleStepBack={handleStepBack}
              paymentMethod={paymentMethod}
              paymentUrl={paymentUrl}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
