import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
export default function Login() {
  return (
    <div className="w-full text-gray-900 grid place-items-center bg-aliceblue  h-screen relative">
      <div className="container w-1/2 mx-auto rounded z-2 pb-1 bg-gray-100 shadow-2xl   overflow-hidden">
        <div className="flex items-center flex-col p-4 pb-1 ">
          <img
            src={logo}
            alt="logo"
            className="rounded-full  border-red-500 shadow-2xl mb-3"
            style={{ width: '125px', height: '125px' }}
          />
          <h2 className="text-3xl text-gray-900">Login to Al AttiahMall</h2>
        </div>
        <hr />
        {/* inputs */}
        <div className="flex flex-col items-center px-4 py-2   bg-gray-100">
          {/* input  */}
          <div className="w-full mb-4 ">
            <h1 className="  text-md font-semibold">Email</h1>
            <input
              id="email"
              className=" mt-1 w-full rounded bg-gray-200 placeholder-gray-700 p-2 "
              type="text"
              placeholder="Enter your email address"
            />
          </div>
          {/* input */}
          <div className=" w-full mb-0 ">
            <div className="flex items-center">
              <h1 className="text-md  font-semibold">Password</h1>
              <button className=" ml-auto text-sm text-red-400">
                Forgot Password ?
              </button>
            </div>
            <input
              id="password"
              className=" mt-1 w-full rounded bg-gray-200 placeholder-gray-700 p-2 "
              type="password"
              placeholder="Enter your Password"
            />
          </div>
        </div>

        <div className="px-4 py-1">
          <button className="w-full rounded text-gray-100 bg-red-500 p-2 font-semibold hover:bg-red-400 transition duration-150 ">
            Log in
          </button>
        </div>
        <div className="px-4 py-2">
          <h1 className="text-sm">
            Don't have an account ?{' '}
            <Link className="text-red-400" to="/app/register">
              Join us here
            </Link>
          </h1>
        </div>
        {/* <div className="px-4 py-2">
          <h1 className="text-xs">
            By clicking “Create an account”, you agree to our Terms of Service
            and Privacy Statement. We’ll occasionally send you account related
            emails.
          </h1>
        </div> */}
      </div>
      {/* <img
        className="absolute"
        src={logo}
        style={{
          width: '400px',
          height: '400px',
          opacity: '0.2',
          zIndex: '1',
          left: '77%',
          top: '33%',
        }}
        alt="logo"
      /> */}
    </div>
  );
}
