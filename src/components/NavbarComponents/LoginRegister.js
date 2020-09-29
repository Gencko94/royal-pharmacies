import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginRegister() {
  return (
    <div className="flex ml-auto ">
      <Link to="/app/login">
        <button className="py-1 px-2    rounded mr-3 hover:bg-white hover:text-nav-primary transition duration-150">
          Login
        </button>
      </Link>
      <Link to="/app/register">
        <button className="py-1 px-2 bg-red-700  rounded hover:bg-red-600 transition duration-150">
          Register
        </button>
      </Link>
    </div>
  );
}
