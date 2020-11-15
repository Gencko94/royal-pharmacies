import { Formik, useField } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';
import * as Yup from 'yup';
export default function LocationForm({
  markerAddress,

  addMutation,
  marker,
}) {
  const { formatMessage } = useIntl();
  const [defaultLocationChecked, setDefaultLocationChecked] = React.useState(
    false
  );
  const [userTypedLocation, setUserTypedLocation] = React.useState('');
  const validationSchema = Yup.object({
    apartmentOrHouseNumber: Yup.string().required(
      formatMessage({ id: 'apartment-empty' })
    ),
    buildingOrTowerNumber: Yup.string().required(
      formatMessage({ id: 'building-empty' })
    ),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
  });
  return (
    <div>
      <div className="font-bold p-2">
        <h1>{formatMessage({ id: 'location-details' })}</h1>
      </div>
      <div className="px-2">
        <div className="mb-1">
          <h1>
            {formatMessage({
              id: 'maps-detailed-address-street_neighborhood_governate',
            })}
          </h1>
          <textarea
            rows="3"
            className=" mt-1 w-full rounded border  p-1  "
            type="textarea"
            value={markerAddress || userTypedLocation}
            readOnly={markerAddress}
            onChange={e => setUserTypedLocation(e.target.value)}
          />
        </div>
        <Formik
          initialValues={{
            apartmentOrHouseNumber: '',
            buildingOrTowerNumber: '',
            phoneNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const res = await addMutation({
                lat: marker?.lat,
                lng: marker?.lng,
                defaultLocation: defaultLocationChecked,
                addressDetails: {
                  ...values,
                  markerAddress,
                  userTypedLocation,
                },
              });
              if (res === 'ok') {
                resetForm();
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
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
                <CustomTextInput
                  label={formatMessage({ id: 'maps-detailed-address-phone' })}
                  name="phoneNumber"
                  value={values.phoneNumber}
                  type="text"
                />

                <div className="p-2 ">
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
                    className={`${
                      !markerAddress && !userTypedLocation
                        ? 'btn-disabled'
                        : isSubmitting
                        ? 'bg-gray-300 text-main-text'
                        : 'bg-main-color text-main-text'
                    }   p-2 rounded  w-full  flex items-center justify-center font-semibold`}
                  >
                    {isSubmitting ? (
                      <MoonLoader size={19} color="#b72b2b" />
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
