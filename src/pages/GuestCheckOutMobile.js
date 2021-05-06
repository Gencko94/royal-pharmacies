import React from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import GuestPersonalInformationMobile from '../components/CartMobile/GuestCheckoutMobile/GuestPersonalInformationMobile';
import GuestSelectAddressMobile from '../components/CartMobile/GuestCheckoutMobile/GuestSelectAddressMobile';
import OrderPlacedMobile from '../components/CartMobile/GuestCheckoutMobile/OrderPlacedMobile';
import StepperMobile from '../components/CartMobile/GuestCheckoutMobile/StepperMobile';
import Layout from '../components/Layout';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { DataProvider } from '../contexts/DataContext';
import { guestCheckout } from '../Queries/Queries';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Redirect } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
export default function GuestCheckOutMobile() {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [stepDone, setStepDone] = React.useState({
    0: false,
    1: false,
    2: false,
  });
  const { deliveryCountry } = React.useContext(DataProvider);
  const { guestCartItems, coupon, guestCartItemsLoading } = React.useContext(
    CartAndWishlistProvider
  );
  const {
    mutateAsync: guestCheckoutMutation,
    isLoading: checkoutLoading,
  } = useMutation(guestCheckout, { throwOnError: true });
  const { authenticationLoading, userId } = React.useContext(AuthProvider);
  const [guestAddress, setGuestAddress] = React.useState({
    lat: '',
    lng: '',
    addressDetails: {
      phoneNumber: '',
      apartmentOrHouseNumber: '',
      buildingOrTowerNumber: '',
      additionalDetails: '',
      markerAddress: '',
    },
  });
  const options = [
    { value: '+965', label: '+965' },
    { value: '+966', label: '+966' },
  ];
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState(null);
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
        coupon,
      });
      setStepDone({
        ...stepDone,
        1: true,
      });
      if (paymentMethod === 'cod') {
        setSelectedStep(2);
      } else {
        window.location.href = res.payment;
      }
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
      } else if (
        error.response?.data?.message === 'You email belongs to another account'
      ) {
        return setErrorMessage(formatMessage({ id: 'guest-checkout-login' }));
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
      <StepperMobile selectedStep={selectedStep} stepDone={stepDone} />
      <div className="mb-3" style={{ minHeight: 'calc(100vh - 231px)' }}>
        {selectedStep === 0 && (
          <GuestSelectAddressMobile
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
          <GuestPersonalInformationMobile
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            handleStepBack={handleStepBack}
            guestAddress={guestAddress}
            name={name}
            phoneNumber={phoneNumber}
            handleGuestCheckout={handleGuestCheckout}
            checkoutLoading={checkoutLoading}
          />
        )}
        {selectedStep === 2 && <OrderPlacedMobile />}
      </div>
    </Layout>
  );
}
