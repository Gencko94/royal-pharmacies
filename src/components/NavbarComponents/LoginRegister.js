import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function LoginRegister() {
  const { formatMessage, locale } = useIntl();
  return (
    <div className="flex ml-auto text-first-nav-text-light  ">
      <Link to={`/${locale}/app/login`}>
        <button
          className={`p-1 font-semibold   rounded mr-1 
          hover:bg-main-color hover:text-main-text
           transition duration-150`}
        >
          {formatMessage({ id: 'nav.login' })}
        </button>
      </Link>
      <Link to={`/${locale}/app/register`}>
        <button
          className={`p-1 font-semibold   rounded 
              hover:bg-main-color hover:text-main-text
           transition duration-150`}
        >
          {formatMessage({ id: 'nav.register' })}
        </button>
      </Link>
      <Link to={`/${locale}/order/track`}>
        <button
          className={`p-1 font-semibold   rounded 
          hover:bg-main-color hover:text-main-text
           transition duration-150`}
        >
          {formatMessage({ id: 'nav.track' })}
        </button>
      </Link>
    </div>
  );
}
