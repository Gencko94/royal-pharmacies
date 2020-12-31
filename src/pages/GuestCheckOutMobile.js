import React from 'react';
import { useMutation } from 'react-query';
import GuestPersonalInformationMobile from '../components/CartMobile/GuestCheckoutMobile/GuestPersonalInformationMobile';
import GuestSelectAddressMobile from '../components/CartMobile/GuestCheckoutMobile/GuestSelectAddressMobile';
import OrderPlacedMobile from '../components/CartMobile/GuestCheckoutMobile/OrderPlacedMobile';
import StepperMobile from '../components/CartMobile/GuestCheckoutMobile/StepperMobile';
import Layout from '../components/Layout';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { DataProvider } from '../contexts/DataContext';
import { guestCheckout } from '../Queries/Queries';

export default function GuestCheckOutMobile() {
  const [selectedStep, setSelectedStep] = React.useState(0);
  const [stepDone, setStepDone] = React.useState({
    0: false,
    1: false,
    2: false,
  });
  const { deliveryCountry } = React.useContext(DataProvider);
  const { guestCartItems } = React.useContext(CartAndWishlistProvider);
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
    },
  });

  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState(null);
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
  const handleGuestCheckout = async () => {
    const order = {
      customer: {
        name,
        mobile: phoneNumber,
        email,
      },
      cart: JSON.stringify(guestCartItems),
      address: {
        lat: guestAddress.lat?.toString(),
        lng: guestAddress.lng?.toString(),
        marked_address: guestAddress.addressDetails.markerAddress || '',
        address_name: guestAddress.addressDetails.addressName,
        apartment_house_number:
          guestAddress.addressDetails.apartmentOrHouseNumber,
        building_tower_number:
          guestAddress.addressDetails.buildingOrTowerNumber,
        phone_number: guestAddress.addressDetails.phoneNumber,
        addition_direction: guestAddress.addressDetails.additionalDetails,

        userTyped_address:
          guestAddress.addressDetails.userTyped_address || null,
        type: guestAddress.lat ? 'map' : 'text',
      },
      payment_method: paymentMethod,
      order_type:
        deliveryCountry?.translation.en === 'Kuwait'
          ? 'local'
          : 'international',
    };
    try {
      await guestCheckoutMutation({
        deliveryCountry,
        order,
      });
      // setSelectedStep(2);
    } catch (error) {
      console.log(error.response);
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
            name={name}
            phoneNumber={phoneNumber}
            handleAddAddressAndInfo={handleAddAddressAndInfo}
            guestAddress={guestAddress}
            email={email}
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
