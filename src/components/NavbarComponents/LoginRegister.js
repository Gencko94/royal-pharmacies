import React from 'react';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';

export default function LoginRegister() {
  const { isLightTheme } = React.useContext(DataProvider);
  return (
    <div className="flex ml-auto text-first-nav-text-light  ">
      <Link to="/app/login">
        <button
          className={`p-1 font-semibold   rounded mr-1 ${
            isLightTheme
              ? 'hover:bg-second-nav-light hover:text-second-nav-text-light'
              : 'hover:bg-second-nav-dark hover:text-second-nav-text-dark'
          } transition duration-150`}
        >
          Login
        </button>
      </Link>
      <Link to="/app/register">
        <button
          className={`p-1 font-semibold   rounded ${
            isLightTheme
              ? 'hover:bg-second-nav-light hover:text-second-nav-text-light'
              : 'hover:bg-second-nav-dark hover:text-second-nav-text-dark'
          } transition duration-150`}
        >
          Register
        </button>
      </Link>
    </div>
  );
}
