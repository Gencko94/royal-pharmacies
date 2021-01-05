import { Formik, useField } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as Yup from 'yup';
import Select from 'react-select';
const options = [
  { value: '+965', label: '+965' },
  { value: '+966', label: '+966' },
];
export default function GuestLocationForm({
  markerAddress,
  marker,
  handleAddAddressAndInfo,
  guestAddress,
  name,
  phoneNumber,
  setMarker,
  email,
}) {
  const { formatMessage } = useIntl();
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const [userTypedLocation, setUserTypedLocation] = React.useState('');
  const validationSchema = Yup.object({
    email: Yup.string().email(formatMessage({ id: 'email-validation' })),
    apartmentOrHouseNumber: Yup.string().required(
      formatMessage({ id: 'required-field' })
    ),
    buildingOrTowerNumber: Yup.string().required(
      formatMessage({ id: 'required-field' })
    ),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'required-field' })),
    additionalDetails: Yup.string(),
    name: Yup.string().required(formatMessage({ id: 'required-field' })),
  });
  const handleClearLocation = () => {
    setMarker(null);
    setUserTypedLocation('');
  };
  return (
    <div>
      <div className="font-bold text-center border-b p-2">
        <h1>{formatMessage({ id: 'location-details' })}</h1>
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <label
            htmlFor={'location'}
            className={`text-sm font-semibold text-gray-700`}
          >
            {formatMessage({ id: 'delivery-location' })}
          </label>
          <button
            onClick={handleClearLocation}
            className="text-main-color hover:underline"
          >
            {formatMessage({ id: 'clear' })}
          </button>
        </div>
        <textarea
          rows="3"
          id="location"
          className=" mt-1 w-full rounded border  p-1  "
          type="textarea"
          value={markerAddress || userTypedLocation}
          readOnly={markerAddress}
          onChange={e => setUserTypedLocation(e.target.value)}
        />
        <Formik
          initialValues={{
            apartmentOrHouseNumber:
              guestAddress.addressDetails.apartmentOrHouseNumber,
            buildingOrTowerNumber:
              guestAddress.addressDetails.buildingOrTowerNumber,
            phoneNumber: phoneNumber,
            name: name,
            additionalDetails: guestAddress.addressDetails.additionalDetails,
            email,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleAddAddressAndInfo({
              guestAddress: {
                lat: marker?.lat,
                lng: marker?.lng,
                addressDetails: {
                  phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                  ...values,
                  markerAddress,
                  userTyped_location: userTypedLocation,
                },
              },
              name: values.name,
              phoneNumber: values.phoneNumber,
              email: values.email,
            });
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <CustomTextInput
                  label={formatMessage({
                    id: 'full-name',
                  })}
                  name="name"
                  value={values.name}
                  type="text"
                />
                <CustomTextInput
                  label={formatMessage({
                    id: 'email-address',
                  })}
                  name="email"
                  value={values.email}
                  type="text"
                  optional
                />
                <PhoneNumberCustomInput
                  label={formatMessage({ id: 'maps-detailed-address-phone' })}
                  name="phoneNumber"
                  value={values.phoneNumber}
                  type="text"
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />
                <div className="grid grid-cols-2 gap-1">
                  <CustomTextInput
                    label={formatMessage({
                      id: 'maps-detailed-address-apartment',
                    })}
                    name="apartmentOrHouseNumber"
                    value={values.apartmentOrHouseNumber}
                    type="text"
                  />
                  <CustomTextInput
                    label={formatMessage({
                      id: 'maps-detailed-address-building',
                    })}
                    name="buildingOrTowerNumber"
                    value={values.buildingOrTowerNumber}
                    type="text"
                  />
                </div>

                <CustomTextAreaInput
                  label={formatMessage({
                    id: 'maps-details-extra-details',
                  })}
                  name="additionalDetails"
                  value={values.additionalDetails}
                />

                <div className=" ">
                  <button
                    disabled={!markerAddress || userTypedLocation}
                    type="submit"
                    className={`
                       ${
                         !markerAddress || userTypedLocation
                           ? 'bg-gray-500 text-gray-300'
                           : 'bg-main-color text-main-text'
                       }
                       p-2 rounded  w-full  flex items-center uppercase justify-center font-semibold`}
                  >
                    <h1>{formatMessage({ id: 'confirm-location' })}</h1>
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

const CustomTextInput = ({ label, value, name, optional, ...props }) => {
  const [field, meta] = useField(name);
  const { formatMessage } = useIntl();
  return (
    <div className="w-full mb-2 relative">
      <div className="flex items-center">
        <label htmlFor={name} className={`text-sm font-semibold text-gray-700`}>
          {label}
        </label>
        {optional && (
          <h1 className="text-xs italic mx-3">
            ({formatMessage({ id: 'maps-details-optional' })})
          </h1>
        )}
      </div>
      <input
        {...field}
        {...props}
        onBlur={e => {
          field.onBlur(e);
        }}
        className=" w-full rounded-sm border   p-1"
      />
      {meta?.touched && meta?.error ? (
        <h1 className="text-xs text-main-color mt-1">{meta?.error}</h1>
      ) : (
        <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};
const CustomTextAreaInput = ({ label, value, name, ...props }) => {
  const [field] = useField(name);
  const { formatMessage } = useIntl();
  return (
    <div className="w-full mb-1 relative">
      <div className="flex items-center">
        <label htmlFor={name} className={`text-sm font-semibold text-gray-700`}>
          {label}
        </label>
        <h1 className="text-xs italic mx-3">
          ({formatMessage({ id: 'maps-details-optional' })})
        </h1>
      </div>
      <textarea
        rows={3}
        {...field}
        {...props}
        onBlur={e => {
          field.onBlur(e);
        }}
        className=" w-full rounded-sm border   p-1"
      />
    </div>
  );
};
const PhoneNumberCustomInput = ({
  label,
  value,
  name,
  countryCode,
  setCountryCode,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="w-full mb-1 flex flex-col ">
      <label
        htmlFor={name}
        className={`text-sm font-semibold text-gray-800 mb-1`}
      >
        {label}
      </label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.4fr 1fr',
          gap: '0.5rem',
        }}
      >
        <Select
          options={options}
          isSearchable={false}
          value={countryCode}
          onChange={setCountryCode}
          styles={{
            dropdownIndicator: provided => {
              return {
                ...provided,
                padding: '0.25rem',
              };
            },
            valueContainer: provided => {
              return {
                ...provided,
                padding: '0.5rem',
              };
            },
          }}
        />

        <input
          {...field}
          {...props}
          onBlur={e => {
            field.onBlur(e);
          }}
          className={` border rounded w-full p-2 ${
            meta.error && 'border-main-color'
          }`}
        />
      </div>
      {meta.touched && meta.error ? (
        <h1 className="text-xs text-main-color mt-1">{meta.error}</h1>
      ) : (
        <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};
