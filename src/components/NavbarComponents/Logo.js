import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
export default function Logo() {
  const { locale } = useIntl();
  const { settings } = React.useContext(DataProvider);

  return (
    <div
      className=" flex items-center justify-center"
      style={{ flexBasis: '120px' }}
    >
      <Link style={{ width: '100px' }} to={`/${locale}/`} className="-m-2">
        {settings && (
          <img
            src="/logo.png"
            alt={`${settings?.store_name_en} Logo`}
            style={{
              width: 'auto',
              maxHeight: '40px',
            }}
          />
        )}
      </Link>
    </div>
  );
}
