import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
export default function Register() {
  return (
    <div className=" font-body antialiased  text-gray-900 flex items-center justify-center bg-aliceblue relative  h-screen">
      <div className=" max-w-screen-md w-5/6 rounded pb-1  bg-gray-100 shadow-2xl   overflow-hidden">
        <div className="flex items-center flex-col p-4 pb-1 ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="rounded-full shadow-2xl mb-3"
              style={{ width: '125px', height: '125px' }}
            />
          </Link>
          <h2 className="text-2xl text-center text-gray-900">
            Register for Al AttiahMall
          </h2>
        </div>
        <hr />
        {/* inputs */}
        <div className="flex flex-col items-center px-4 py-2   bg-gray-100">
          {/* input  */}
          <div className="w-full mb-4 ">
            <h1 className="  text-md font-semibold">Username</h1>
            <input
              className=" mt-1 w-full rounded bg-gray-200 placeholder-gray-700 p-2 "
              type="text"
              placeholder="Enter your Username"
            />
          </div>
          {/* input  */}
          <div className="w-full mb-4 ">
            <h1 className="  text-md font-semibold">Email</h1>
            <input
              className=" mt-1 w-full rounded bg-gray-200 placeholder-gray-700 p-2 "
              type="text"
              placeholder="Enter your email address"
            />
          </div>
          {/* input */}
          <div className=" w-full mb-0 ">
            <h1 className="text-md  font-semibold">Password</h1>

            <input
              className=" mt-1 w-full rounded bg-gray-200 placeholder-gray-700 p-2 "
              type="password"
              placeholder="Enter your Password"
            />
          </div>
        </div>

        <div className="px-4 py-1">
          <button className="w-full rounded text-gray-100 bg-red-500 p-2 font-semibold hover:bg-red-400 transition duration-150 ">
            Create an account
          </button>
        </div>
        <div className="px-4 py-2">
          <h1 className="text-sm">
            Already have an Account ?{' '}
            <Link className="text-red-400" to="/app/login">
              Log in instead
            </Link>
          </h1>
        </div>
        <hr />
        <div className="px-4 w-full py-2 ">
          <h1 className="text-xs">
            By clicking “Create an account”, you agree to our{' '}
            <span className="text-red-400">Terms of Service</span> and{' '}
            <span className="text-red-400">Privacy Statement</span>. We’ll
            occasionally send you account related emails.
          </h1>
        </div>
      </div>
    </div>
  );
}
