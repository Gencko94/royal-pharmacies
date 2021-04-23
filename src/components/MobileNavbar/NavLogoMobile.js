import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';

export default function NavLogoMobile() {
  const { locale } = useIntl();
  const { settings } = React.useContext(DataProvider);
  return (
    <div className=" flex-1 mx-2">
      <Link to={`/${locale}/`} className="-my-2">
        {settings && (
          <img
            src="/logo.png"
            alt="Royal Pharmacies"
            style={{ width: '90px' }}
          />
        )}
      </Link>
    </div>
  );
}
