import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/mrgnavlogo.png';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
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
    <div className="w-full mt-10  relative">
      <label
        htmlFor={name}
        className={`rtl-form-label   ${
          activeLabel ? 'form__label-active' : 'form__label'
        }  text-gray-700 pointer-events-none`}
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
        className=" rounded-sm  w-full border-b   p-1 "
        onClick={() => setActiveLabel(true)}
        onFocus={() => setActiveLabel(true)}
      />
      {meta.touched && meta.error ? (
        <h1 className="text-xs mt-1 text-main-color">{meta.error}</h1>
      ) : (
        <h1 className="text-xs mt-1 text-main-color" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};

export default function Login() {
  const { formatMessage, locale } = useIntl();
  const { userLogin } = React.useContext(AuthProvider);
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
    password: Yup.string().required(formatMessage({ id: 'password-empty' })),
  });
  return (
    <div className="  text-gray-900 flex justify-center items-center   h-screen relative">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" rounded z-2  max-w-screen-xs w-5/6 pb-1  shadow-2xl   overflow-hidden">
        <div className="flex items-center flex-col p-4 pb-1 bg-main-color text-main-text ">
          <Link to={`/${locale}/`}>
            <img
              src={logo}
              alt="logo"
              className=" mb-3"
              style={{ width: '140px', height: '75px' }}
            />
          </Link>
          <h2 className="text-xl text-center bold">
            {formatMessage({ id: 'login-to-mrg' })}
          </h2>
        </div>
        <hr />

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            setErrorOpen(false);
            try {
              const res = await userLogin(values);
              if (res === 'ok') {
                history.goBack();
              } else {
                actions.setErrors({
                  email: 'Email or Password is not correct',
                  password: 'Email or password is not correct',
                });
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
              <form className="px-4 py-2" onSubmit={handleSubmit}>
                <CustomTextInput
                  label={formatMessage({ id: 'email-label' })}
                  name="email"
                  type="email"
                  value={values.email}
                />
                <CustomTextInput
                  label={formatMessage({ id: 'password-label' })}
                  name="password"
                  type="password"
                  value={values.password}
                />
                <div className=" py-1 mt-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`${
                      isSubmitting
                        ? 'bg-main-color cursor-not-allowed'
                        : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                    } w-full rounded   p-2 font-semibold  transition duration-150 `}
                  >
                    {isSubmitting && <BeatLoader size={10} />}
                    {!isSubmitting && formatMessage({ id: 'login-button' })}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>

        <div className="px-4 py-2">
          <h1 className="text-sm">
            {formatMessage({ id: 'new-to-family' })}
            <Link
              className="text-second-nav-light"
              to={`/${locale}/app/register`}
            >
              {formatMessage({ id: 'join-us-here' })}
            </Link>
          </h1>
          <button className=" text-sm text-second-nav-light">
            {formatMessage({ id: 'forgot-password' })}
          </button>
        </div>
      </div>
    </div>
  );
}
