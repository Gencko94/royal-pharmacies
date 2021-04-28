import { Formik, useField } from 'formik';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Select from 'react-select';
import Language from '../components/NavbarComponents/Language';
import { AiOutlineArrowLeft } from 'react-icons/ai';
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
          gridTemplateColumns: '0.3fr 0.7fr',
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
          className={` w-full border rounded  p-2 ${
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

const CustomTextInput = ({ label, value, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="w-full relative mb-2 flex flex-col">
      <label
        htmlFor={name}
        className={` text-sm font-semibold text-gray-800 mb-1 `}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        onBlur={e => {
          field.onBlur(e);
        }}
        className={`${meta.error && 'border'} w-full rounded-lg border   p-2`}
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

export default function LoginMobile() {
  const { formatMessage, locale } = useIntl();
  const { userLoginMutation } = React.useContext(AuthProvider);
  const { settings } = React.useContext(DataProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const closeError = () => {
    setErrorOpen(false);
  };
  const location = useLocation();
  let { from } = location.state || { from: { pathname: `/${locale}/` } };
  const history = useHistory();
  const validationSchema = Yup.object({
    password: Yup.string()
      .required(formatMessage({ id: 'password-empty' }))
      .min(6, formatMessage({ id: 'password-min-6' }))
      .max(15, formatMessage({ id: 'password-max-15' })),

    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
  });
  return (
    <div className=" text-gray-900 flex justify-center items-center px-4 py-2  h-screen relative">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" z-2  w-full   overflow-hidden">
        <div className="flex items-center flex-col mb-2  rounded-lg ">
          <Link to={`/${locale}/`}>
            {settings && (
              <img
                src={settings?.store_logo_color}
                alt="logo"
                style={{ width: '100px', height: '50px' }}
                className=" mb-3"
              />
            )}
          </Link>
          <h2 className="text-lg text-center">
            {formatMessage({ id: 'login-welcome-back' })}
          </h2>
        </div>
        <div className="rounded-lg border bg-gray-100 mb-2 shadow">
          <Formik
            initialValues={{
              password: '',
              phoneNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setErrors }) => {
              setErrorOpen(false);
              try {
                await userLoginMutation({
                  phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                  password: values.password,
                });

                history.replace(from);
              } catch (error) {
                if (error.response?.data.message) {
                  setErrors({
                    phoneNumber: formatMessage({
                      id: 'invalid-credentials',
                    }),
                    password: formatMessage({
                      id: 'invalid-credentials',
                    }),
                  });
                  return;
                }
                setErrorOpen(true);
                setErrorMessage(
                  formatMessage({ id: 'something-went-wrong-snackbar' })
                );
              }
            }}
          >
            {({ handleSubmit, values, isSubmitting }) => {
              return (
                <form className="px-3 py-2 " onSubmit={handleSubmit}>
                  <PhoneNumberCustomInput
                    label={formatMessage({ id: 'phone-label' })}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    type="text"
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                  />
                  <CustomTextInput
                    label={formatMessage({ id: 'password-label' })}
                    name="password"
                    value={values.password}
                    type="password"
                  />

                  <div className="mt-1">
                    <button
                      type="submit"
                      className={`${
                        isSubmitting
                          ? 'bg-main-color cursor-not-allowed'
                          : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                      } w-full rounded  p-2 flex items-center justify-center font-semibold  transition duration-150 uppercase `}
                    >
                      {isSubmitting && (
                        <Loader
                          type="ThreeDots"
                          color="#fff"
                          secondaryColor="black"
                          height={24}
                          width={24}
                          visible={isSubmitting}
                        />
                      )}
                      {!isSubmitting && formatMessage({ id: 'login-button' })}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
        <div className="text-sm">
          <div className="px-3 py-2">
            <h1>
              {formatMessage({ id: 'new-to-family' })}
              <Link
                className="text-main-color hover:underline"
                to={`/${locale}/app/register`}
              >
                {formatMessage({ id: 'join-us-here' })}
              </Link>
            </h1>
            <Link
              to={`/${locale}/app/password-reset`}
              className=" text-main-color hover:underline"
            >
              {formatMessage({ id: 'forgot-password' })}
            </Link>
          </div>
        </div>
      </div>
      <div className="credentials-language__container-mobile">
        <Language />
      </div>
      <div className="credentials-back-button__container-mobile">
        <button onClick={() => history.goBack()}>
          <AiOutlineArrowLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
