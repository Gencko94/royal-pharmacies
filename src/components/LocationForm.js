import { Formik, useField } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as Yup from 'yup';
import Select from 'react-select';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorSnackbar from './ErrorSnackbar';
import { AnimatePresence } from 'framer-motion';
const options = [
  { value: '+965', label: '+965' },
  { value: '+966', label: '+966' },
];
export default function LocationForm({
  markerAddress,
  setShowMap,
  marker,
  setMarker,
}) {
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const { addAddressMutation } = React.useContext(AuthProvider);
  const [userTypedLocation, setUserTypedLocation] = React.useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
  const { formatMessage } = useIntl();
  const [defaultLocationChecked, setDefaultLocationChecked] = React.useState(
    false
  );
  const validationSchema = Yup.object({
    apartmentOrHouseNumber: Yup.string().required(
      formatMessage({ id: 'required-field' })
    ),
    buildingOrTowerNumber: Yup.string().required(
      formatMessage({ id: 'required-field' })
    ),
    addressName: Yup.string().required(formatMessage({ id: 'required-field' })),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'required-field' })),
    additionalDetails: Yup.string(),
  });
  const handleCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
  };
  const handleClearLocation = () => {
    setMarker(null);
    setUserTypedLocation('');
  };
  return (
    <div>
      <AnimatePresence>
        {errorSnackbarOpen && (
          <ErrorSnackbar
            message={formatMessage({ id: 'something-went-wrong-snackbar' })}
            closeFunction={handleCloseSnackbar}
          />
        )}
      </AnimatePresence>

      <div className="font-bold p-2">
        <h1>{formatMessage({ id: 'location-details' })}</h1>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor={'location'}
            className={`text-sm font-bold text-gray-700`}
          >
            {formatMessage({ id: 'delivery-location' })}
          </label>
          <button
            onClick={handleClearLocation}
            className="text-main-color text-sm hover:underline"
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
            apartmentOrHouseNumber: '',
            buildingOrTowerNumber: '',
            phoneNumber: '',
            additionalDetails: '',
            addressName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            try {
              await addAddressMutation({
                lat: marker?.lat,
                lng: marker?.lng,
                defaultLocation: defaultLocationChecked,
                addressDetails: {
                  phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                  ...values,
                  markerAddress: markerAddress,
                  userTyped_address: userTypedLocation,
                },
              });
              setShowMap(false);
            } catch (error) {
              setErrorSnackbarOpen(true);
            }
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
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
                <CustomTextInput
                  label={formatMessage({
                    id: 'maps-detailed-address-name',
                  })}
                  name="addressName"
                  value={values.addressName}
                  type="text"
                />
                <CustomTextAreaInput
                  label={formatMessage({
                    id: 'maps-details-extra-details',
                  })}
                  name="additionalDetails"
                  value={values.additionalDetails}
                />

                <div className=" ">
                  <div className="flex items-center mb-2">
                    <label>{formatMessage({ id: 'mark-as-default' })}</label>
                    <input
                      className=" mx-2"
                      type="checkbox"
                      checked={defaultLocationChecked}
                      onChange={() =>
                        setDefaultLocationChecked(!defaultLocationChecked)
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!markerAddress && !userTypedLocation}
                    className={`  ${
                      !markerAddress && !userTypedLocation
                        ? 'bg-gray-500 text-gray-300'
                        : 'bg-main-color text-main-text'
                    } p-2 rounded  w-full  flex items-center uppercase justify-center font-semibold`}
                  >
                    {isSubmitting ? (
                      <Loader
                        type="ThreeDots"
                        color="#fff"
                        height={23}
                        width={23}
                        visible={isSubmitting}
                      />
                    ) : (
                      <h1>{formatMessage({ id: 'confirm-btn' })}</h1>
                    )}
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

const CustomTextInput = ({ label, value, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="w-full mb-1 relative">
      <label htmlFor={name} className={`text-sm font-bold text-gray-700 mb-1`}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        onBlur={e => {
          field.onBlur(e);
        }}
        className=" w-full rounded-sm border   p-1"
      />
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
const CustomTextAreaInput = ({ label, value, name, ...props }) => {
  const [field] = useField(name);
  const { formatMessage } = useIntl();
  return (
    <div className="w-full mb-1 relative">
      <div className="flex items-center mb-1">
        <label htmlFor={name} className={`text-sm font-bold text-gray-700`}>
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
      <label htmlFor={name} className={`text-sm font-bold text-gray-800 mb-1`}>
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
