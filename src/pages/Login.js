import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mrgnavlogo.png';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const CustomTextInput = ({ label, value, name, ...props }) => {
  const [activeLabel, setActiveLabel] = React.useState(false);
  const checkEmptyInput = () => {
    if (value === '') {
      setActiveLabel(false);
    }
  };
  const [field, meta] = useField(name);
  return (
    <div className="w-full mb-2 relative">
      <label
        htmlFor={name}
        className={`${
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
        className=" mt-1 w-full rounded border-b   p-2 pt-5"
        onClick={() => setActiveLabel(true)}
        onFocus={() => setActiveLabel(true)}
      />
      {meta.touched && meta.error ? (
        <h1 className="text-xs text-main-color">{meta.error}</h1>
      ) : (
        <h1 className="text-xs text-main-color" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};

export default function Login() {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string().email(t('email-validation')).required(t('email-empty')),
    password: Yup.string().required(t('password-empty')),
  });
  return (
    <div className="font-body antialiased text-gray-900 flex justify-center items-center   h-screen relative">
      <div className=" rounded z-2  max-w-screen-xs w-5/6 pb-1  shadow-2xl   overflow-hidden">
        <div className="flex items-center flex-col p-4 pb-1 bg-main-color text-main-text ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className=" mb-3"
              style={{ width: '140px', height: '75px' }}
            />
          </Link>
          <h2 className="text-xl text-center bold">Login to MRG</h2>
        </div>
        <hr />

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              console.log(values);
              resetForm();
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <form className="px-4 py-2" onSubmit={handleSubmit}>
                <CustomTextInput
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                />
                <CustomTextInput
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                />
                <div className=" py-1">
                  <button
                    type="submit"
                    className={`w-full rounded text-second-nav-text-light bg-second-nav-light p-2 font-semibold hover:bg-red-800 transition duration-150 `}
                  >
                    Log in
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>

        <div className="px-4 py-2">
          <h1 className="text-sm">
            Are you new to the family ?{' '}
            <Link className="text-second-nav-light" to="/app/register">
              Join us here
            </Link>
          </h1>
          <button className=" text-sm text-second-nav-light">
            Forgot Password ?
          </button>
        </div>
      </div>
    </div>
  );
}
