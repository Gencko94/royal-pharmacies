import { Formik, useField } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
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
  setGuestAddress,
  handleStepForward,
}) {
  const { formatMessage } = useIntl();
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const validationSchema = Yup.object({
    apartmentOrHouseNumber: Yup.number().required(
      formatMessage({ id: 'required-field' })
    ),
    buildingOrTowerNumber: Yup.number().required(
      formatMessage({ id: 'required-field' })
    ),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'required-field' })),
    additionalDetails: Yup.string(),
  });
  return (
    <div>
      <div className="font-bold p-2">
        <h1>{formatMessage({ id: 'location-details' })}</h1>
      </div>
      <div className="p-2">
        <Formik
          initialValues={{
            apartmentOrHouseNumber: '',
            buildingOrTowerNumber: '',
            phoneNumber: '',
            additionalDetails: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            setGuestAddress({
              lat: marker.lat,
              lng: marker.lng,

              addressDetails: {
                phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                ...values,
                markerAddress: markerAddress,
              },
            });
            handleStepForward();
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
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
                <PhoneNumberCustomInput
                  label={formatMessage({ id: 'maps-detailed-address-phone' })}
                  name="phoneNumber"
                  value={values.phoneNumber}
                  type="text"
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />

                <div className=" ">
                  <button
                    type="submit"
                    disabled={!markerAddress}
                    className={`${
                      !markerAddress
                        ? 'btn-disabled'
                        : isSubmitting
                        ? 'bg-gray-300 text-main-text'
                        : 'bg-main-color text-main-text'
                    }   p-2 rounded  w-full  flex items-center justify-center font-semibold`}
                  >
                    {isSubmitting ? (
                      <Loader
                        type="ThreeDots"
                        color="#b72b2b"
                        height={20}
                        width={20}
                        visible={isSubmitting}
                      />
                    ) : (
                      <h1>{formatMessage({ id: 'confirm-location' })}</h1>
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
    <div className="w-full mb-2 relative">
      <label htmlFor={name} className={`text-sm font-semibold text-gray-700`}>
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
