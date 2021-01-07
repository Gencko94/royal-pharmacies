import { Formik, useField } from 'formik';
import React from 'react';

import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Layout from '../components/Layout';
import Select from 'react-select';
import * as Yup from 'yup';
import ErrorSnackbar from '../components/ErrorSnackbar';

import { DataProvider } from '../contexts/DataContext';
import { trackGuestOrder } from '../Queries/Queries';
import GuestOrders from '../components/TrackOrder/GuestOrders';
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

export default function TrackOrder() {
  const { settings } = React.useContext(DataProvider);
  const [countryCode, setCountryCode] = React.useState(options[0]);

  const { formatMessage, locale } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showGuestOrders, setShowGuestOrders] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const closeError = () => {
    setErrorOpen(false);
  };
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
  });

  return (
    <Layout>
      <AnimatePresence>
        {!showGuestOrders && (
          <motion.div
            initial={false}
            exit={{ opacity: 0 }}
            className=" text-gray-900 relative max-w-screen-sm mx-auto flex items-center justify-center"
            style={{
              height: 'calc(100vh - 140px)',
            }}
          >
            {errorOpen && (
              <ErrorSnackbar
                message={errorMessage}
                closeFunction={closeError}
              />
            )}
            <motion.div className=" z-2  overflow-hidden">
              <div className="flex items-center flex-col mb-4  rounded-lg text-center ">
                <Link to={`/${locale}/`}>
                  <img
                    src={settings?.store_logo_color}
                    alt="logo"
                    className=" mb-3"
                    style={{ width: '100px', height: '50px' }}
                  />
                </Link>
                <h2 className="text-xl mb-2 text-center font-bold">
                  {formatMessage({ id: 'track-my-order' })}
                </h2>
                <h1 className="font-semibold">
                  {formatMessage({ id: 'track-order-enter-your-phone' })}
                </h1>
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
                      const res = await trackGuestOrder({
                        phoneNumber: `${countryCode.value}${values.phoneNumber}`,
                      });
                      setOrders(res.orders);
                      setShowGuestOrders(true);
                      actions.setSubmitting(false);
                    } catch (error) {
                      if (error.response?.data?.message === 'user not exists') {
                        setErrorOpen(true);
                        setErrorMessage(
                          formatMessage({ id: 'track-order-no-orders' })
                        );
                      } else if (
                        error.response?.data?.message?.mobile[0] ===
                        'The selected mobile is invalid.'
                      ) {
                        actions.setErrors({
                          phoneNumber: formatMessage({ id: 'invalid-phone' }),
                        });
                      } else {
                        setErrorOpen(true);
                        setErrorMessage(
                          formatMessage({
                            id: 'something-went-wrong-snackbar',
                          })
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

                        <div className=" py-1 mt-2">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className={`${
                              isSubmitting
                                ? 'bg-main-color cursor-not-allowed'
                                : 'bg-main-color text-main-text hover:bg-main-color'
                            } w-full rounded uppercase flex items-center justify-center  p-2 font-semibold  transition duration-150 `}
                          >
                            <Loader
                              type="ThreeDots"
                              color="#fff"
                              height={24}
                              width={24}
                              visible={isSubmitting}
                            />
                            {!isSubmitting &&
                              formatMessage({ id: 'btn-track' })}
                          </button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGuestOrders && <GuestOrders orders={orders} />}
      </AnimatePresence>
    </Layout>
  );
}
