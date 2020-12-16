import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function NavLogoMobile() {
  const { locale } = useIntl();
  return (
    <div className=" flex-1">
      <Link to={`/${locale}/`} className="block -my-2">
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/original/1606839936-mrg-setting-store_logo.png`}
          alt="MRG-logo"
          style={{ width: '95px' }}
        />
      </Link>
    </div>
  );
}
