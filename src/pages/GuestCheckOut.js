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

export default function GuestCheckOut() {
  const [selectedStep, setSelectedStep] = React.useState(0);
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
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [stepDone, setStepDone] = React.useState({
    0: false,
    1: false,
    2: false,
  });
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
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
