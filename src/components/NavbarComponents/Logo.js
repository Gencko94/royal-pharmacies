import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
export default function Logo() {
  const { locale } = useIntl();
  return (
    <div
      className=" flex items-center justify-center"
      style={{ flexBasis: '120px' }}
    >
      <Link to={`/${locale}/`} className="-m-2">
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/original/1606839936-mrg-setting-store_logo.png`}
          alt="MRG-logo"
          style={{ width: '110px' }}
        />
      </Link>
    </div>
  );
}
