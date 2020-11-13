import { Formik, useField } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/mrgnavlogo.png';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthProvider } from '../contexts/AuthContext';
import { BeatLoader } from 'react-spinners';
import ErrorSnackbar from '../components/ErrorSnackbar';

const CustomTextInput = ({ label, value, name, ...props }) => {
  const [activeLabel, setActiveLabel] = React.useState(false);
  const checkEmptyInput = () => {
    if (value === '') {
      setActiveLabel(false);
    }
  };
  const [field, meta] = useField(name);
  return (
    <div className="w-full mt-10 relative">
      <label
        htmlFor={name}
        className={`rtl-form-label ${
          activeLabel ? 'form__label-active' : 'form__label'
        } text-sm font-semibold text-gray-700 pointer-events-none`}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        onBlur={e => {
          checkEmptyInput();
          field.onBlur(e);
        }}
        className=" w-full rounded-sm border-b   p-1"
        onClick={() => setActiveLabel(true)}
        onFocus={() => setActiveLabel(true)}
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

export default function Register() {
  const { formatMessage, locale } = useIntl();
  const { userRegister } = React.useContext(AuthProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const history = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(formatMessage({ id: 'email-validation' }))
      .required(formatMessage({ id: 'email-empty' })),
    password: Yup.string()
      .required(formatMessage({ id: 'password-empty' }))
      .min(6, formatMessage({ id: 'password-min-6' }))
      .max(15, formatMessage({ id: 'password-max-15' })),
    username: Yup.string().required(formatMessage({ id: 'username-empty' })),
  });
  return (
    <div className=" text-gray-900 flex justify-center items-center   h-screen relative">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" rounded z-2  max-w-screen-xs w-5/6 pb-1  shadow-2xl   overflow-hidden">
        <div className="flex items-center flex-col p-4 pb-1  bg-main-color text-main-text ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className=" mb-3"
              style={{ width: '140px', height: '70px' }}
            />
          </Link>
          <h2 className="text-xl text-center font-bold">
            {formatMessage({ id: 'register-on-mrg' })}
          </h2>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setErrorOpen(false);
            try {
              const res = await userRegister(values);
              if (res === 'ok') {
                resetForm();
                history.goBack();
              }
            } catch (error) {
              setErrorOpen(true);
              setErrorMessage('Something went wrong, Please try again');
            }
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => {
            return (
              <form className="px-4 py-2" onSubmit={handleSubmit}>
                <CustomTextInput
                  label={formatMessage({ id: 'username-label' })}
                  name="username"
                  value={values.username}
                  type="text"
                />
                <CustomTextInput
                  label={formatMessage({ id: 'email-label' })}
                  name="email"
                  value={values.email}
                  type="email"
                />
                <CustomTextInput
                  label={formatMessage({ id: 'password-label' })}
                  name="password"
                  value={values.password}
                  type="password"
                />

                <div className="py-1 mt-2">
                  <button
                    className={`${
                      isSubmitting
                        ? 'bg-main-color cursor-not-allowed'
                        : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                    } w-full rounded   p-2 font-semibold  transition duration-150 `}
                  >
                    {isSubmitting && <BeatLoader size={10} />}
                    {!isSubmitting && formatMessage({ id: 'register-button' })}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>

        <div className="px-4 py-2">
          <h1 className="text-sm">
            <FormattedMessage
              id="already-have-an-account"
              values={{
                link: word => (
                  <Link
                    className="text-second-nav-light"
                    to={`/${locale}/app/login`}
                  >
                    {word}
                  </Link>
                ),
              }}
            />
          </h1>
        </div>
        <hr />
        <div className="px-4 w-full py-2 ">
          <h1 className="text-xs">
            <FormattedMessage
              id="terms-of-service"
              values={{
                link: word => (
                  <span className="text-second-nav-light">{word}</span>
                ),
                tos: word => (
                  <span className="text-second-nav-light">{word}</span>
                ),
              }}
            />
          </h1>
        </div>
      </div>
    </div>
  );
}
