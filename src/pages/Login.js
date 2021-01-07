import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorSnackbar from '../components/ErrorSnackbar';

import Language from '../components/NavbarComponents/Language';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Select from 'react-select';
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
        className={`${
          meta.error && meta.touched && 'border-main-color'
        } w-full rounded-lg border  p-2`}
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

export default function Login() {
  const { formatMessage, locale } = useIntl();
  const { userLoginMutation } = React.useContext(AuthProvider);
  const { settings } = React.useContext(DataProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const location = useLocation();
  let { from } = location.state || { from: { pathname: `/${locale}/` } };
  const closeError = () => {
    setErrorOpen(false);
  };
  const history = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string().email(formatMessage({ id: 'email-validation' })),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
    password: Yup.string().required(formatMessage({ id: 'password-empty' })),
  });
  return (
    <div className="login-container">
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${settings?.login_background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="flex justify-center items-center   h-screen relative">
        {errorOpen && (
          <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
        )}
        <div className=" rounded z-2  max-w-screen-xs w-5/6">
          <div className="flex items-center flex-col mb-2  rounded-lg ">
            <Link to={`/${locale}/`}>
              {settings && (
                <img
                  src={settings?.store_logo_color}
                  alt="MRG-logo"
                  style={{ width: '100px', height: '50px' }}
                  className=" mb-3"
                />
              )}
            </Link>
            <h2 className="text-lg text-center">
              {formatMessage({ id: 'login-welcome-back' })}
            </h2>
          </div>
          <div className="rounded-lg border bg-gray-100 mb-2">
            <Formik
              initialValues={{
                phoneNumber: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                setErrorOpen(false);
                try {
                  await userLoginMutation({
                    phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                    password: values.password,
                  });
                  history.replace(from);
                } catch (error) {
                  if (error.response?.data.message) {
                    actions.setErrors({
                      phoneNumber: formatMessage({
                        id: 'invalid-credentials',
                      }),
                      password: formatMessage({
                        id: 'invalid-credentials',
                      }),
                    });
                    return;
                  } else {
                    setErrorOpen(true);
                    setErrorMessage(
                      formatMessage({ id: 'something-went-wrong-snackbar' })
                    );
                  }
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
                    <CustomTextInput
                      label={formatMessage({ id: 'password-label' })}
                      name="password"
                      type="password"
                      value={values.password}
                    />
                    <div className="mt-1">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className={`${
                          isSubmitting
                            ? 'bg-main-color cursor-not-allowed'
                            : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                        } w-full rounded uppercase flex items-center justify-center  p-2 font-semibold  transition duration-150 `}
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
          <div className="rounded-lg border text-sm">
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
        <div className="credentials-language__container">
          <Language />
        </div>
        <div className="credentials-back-button__container">
          <button onClick={() => history.goBack()}>
            <AiOutlineArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
