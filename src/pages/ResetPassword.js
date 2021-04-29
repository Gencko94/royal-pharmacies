import { Formik, useField } from 'formik';
import React from 'react';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Select from 'react-select';
import * as Yup from 'yup';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Language from '../components/NavbarComponents/Language';
import { useMediaQuery } from 'react-responsive';
import { DataProvider } from '../contexts/DataContext';
import { resetUserPassword } from '../Queries/Queries';
import { AnimatePresence, motion } from 'framer-motion';
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

export default function ResetPassword() {
  const { settings } = React.useContext(DataProvider);
  const [countryCode, setCountryCode] = React.useState(options[0]);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { formatMessage, locale } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();
  const { token } = useParams();
  const closeError = () => {
    setErrorOpen(false);
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required(formatMessage({ id: 'password-empty' }))
      .min(6, formatMessage({ id: 'password-min-6' }))
      .max(15, formatMessage({ id: 'password-max-15' })),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
  });
  return (
    <div className=" text-gray-900 px-2 flex justify-center items-center    h-screen relative">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" relative z-2  max-w-screen-sm ">
        <div className="flex items-center flex-col mb-4  rounded-lg text-center ">
          <Link to="/">
            <img
              src={settings?.store_logo}
              alt="logo"
              className=" mb-3"
              style={{ width: '100px', height: '50px' }}
            />
          </Link>
          <h2 className="text-xl mb-2 text-center font-semibold">
            {formatMessage({ id: 'set-up-new-password' })}
          </h2>
          <h1>{formatMessage({ id: 'password-reset-enter-new-password' })}</h1>
        </div>
        <div className="rounded-lg border bg-gray-100 mb-2">
          <Formik
            initialValues={{
              phoneNumber: '',
              newPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              setErrorOpen(false);
              try {
                const res = await resetUserPassword({
                  phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                  token,
                  newPassword: values.newPassword,
                });
                if (
                  res.message === 'your password has been successfully changed'
                ) {
                  setSuccess(true);
                } else {
                  actions.setSubmitting(false);
                }
              } catch (error) {
                if (
                  error.response.data.message ===
                  'Cannot find a user with this mobile'
                ) {
                  actions.setErrors({
                    phoneNumber: formatMessage({ id: 'invalid-phone' }),
                  });
                } else {
                  setErrorOpen(true);
                  setErrorMessage('Something went wrong, Please try again');
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
                    label={formatMessage({ id: 'new-password-label' })}
                    name="newPassword"
                    value={values.password}
                    type="password"
                  />

                  <div className=" py-1 mt-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={`${
                        isSubmitting
                          ? 'bg-main-color cursor-not-allowed'
                          : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                      } w-full rounded uppercase  flex items-center justify-center p-2 font-semibold  transition duration-150 `}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#fff"
                        height={25}
                        width={25}
                        visible={isSubmitting}
                      />
                      {!isSubmitting && formatMessage({ id: 'submit' })}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-3 py-2  mx-auto top-100 text-center w-full  text-sm absolute text-main-text rounded font-semibold bg-green-700"
            >
              <p>
                <FormattedMessage
                  id="password-reset-success"
                  values={{
                    link: word => (
                      <Link
                        to={`/${locale}/app/login`}
                        className="text-green-700 hover:underline"
                      >
                        {word}
                      </Link>
                    ),
                  }}
                />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
