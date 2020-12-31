import { Formik, useField } from 'formik';
import React from 'react';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Select from 'react-select';
import * as Yup from 'yup';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { AuthProvider } from '../contexts/AuthContext';
import Language from '../components/NavbarComponents/Language';
import { useMediaQuery } from 'react-responsive';
import { DataProvider } from '../contexts/DataContext';
const options = [
  { value: '+965', label: '+965' },
  { value: '+966', label: '+966' },
];
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
    <div className="w-full mb-2 flex flex-col ">
      <label
        htmlFor={name}
        className={`text-sm font-semibold text-gray-800 mb-1`}
      >
        {label}
      </label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 1fr',
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

export default function PasswordReset() {
  const { userLogin } = React.useContext(AuthProvider);
  const { settings } = React.useContext(DataProvider);
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { formatMessage } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();
  const closeError = () => {
    setErrorOpen(false);
  };
  const validationSchema = Yup.object({
    email: Yup.string().email(formatMessage({ id: 'email-validation' })),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
    password: Yup.string().required(formatMessage({ id: 'password-empty' })),
  });
  return (
    <div className=" text-gray-900 px-2 flex justify-center items-center   h-screen relative">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" z-2  max-w-screen-sm overflow-hidden">
        <div className="flex items-center flex-col mb-4  rounded-lg text-center ">
          <Link to="/">
            <img
              src={settings?.store_logo_color}
              alt="logo"
              className=" mb-3"
              style={{ width: '100px', height: '50px' }}
            />
          </Link>
          <h2 className="text-xl mb-2 text-center font-semibold">
            {formatMessage({ id: 'password-reset' })}
          </h2>
          <h1>{formatMessage({ id: 'password-reset-enter-your-email' })}</h1>
        </div>
        <div className="rounded-lg border bg-gray-100 mb-2">
          <Formik
            initialValues={{
              phoneNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              setErrorOpen(false);
              try {
                const res = await userLogin({
                  phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                });
                if (res === 'ok') {
                } else {
                  actions.setSubmitting(false);
                }
              } catch (error) {
                setErrorOpen(true);
                setErrorMessage('Something went wrong, Please try again');
              }
            }}
          >
            {({ handleSubmit, values, isSubmitting }) => {
              return (
                <form className="px-3 py-2" onSubmit={handleSubmit}>
                  <PhoneNumberCustomInput
                    label={formatMessage({ id: 'phone-label' })}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                  />

                  <div className=" py-1 mt-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={`${
                        isSubmitting
                          ? 'bg-main-color cursor-not-allowed'
                          : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                      } w-full rounded uppercase  p-2 font-semibold  transition duration-150 `}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#fff"
                        height={20}
                        width={20}
                        visible={isSubmitting}
                      />
                      {!isSubmitting &&
                        formatMessage({ id: 'password-reset-send-button' })}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div
        className={`${
          isTabletOrAbove
            ? 'credentials-language__container'
            : 'credentials-language__container-mobile'
        }`}
      >
        <Language />
      </div>
      <div
        className={`${
          isTabletOrAbove
            ? 'credentials-back-button__container'
            : 'credentials-back-button__container-mobile'
        }`}
      >
        <button onClick={() => history.goBack()}>
          <AiOutlineArrowLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
