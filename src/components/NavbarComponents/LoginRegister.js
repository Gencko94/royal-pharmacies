import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginRegister() {
  return (
    <div className="flex ml-auto text-gray-100  ">
      <Link to="/app/login">
        <button className="py-1 px-1 font-semibold   rounded mr-1 hover:bg-gray-100 hover:text-nav-primary transition duration-150">
          Login
        </button>
      </Link>
      <Link to="/app/register">
        <button className="py-1 px-1 font-semibold  rounded hover:bg-gray-100 hover:text-nav-primary transition duration-150">
          Register
        </button>
      </Link>
    </div>
  );
}
