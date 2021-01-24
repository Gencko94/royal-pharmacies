import React from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

export default function LanguageMobile() {
  const { locale } = useIntl();
  const { pathname } = useLocation();

  const getCurrentPath = pathname => {
    return pathname.slice(4);
  };
  return (
    <div className="p-1">
      {locale === 'en' && (
        <a
          href={`/ar/${getCurrentPath(pathname)}`}
          className="font-semibold font-cairo transition duration-100 hover:text-gray-300"
        >
          العربية
        </a>
      )}
      {locale === 'ar' && (
        <a
          href={`/en/${getCurrentPath(pathname)}`}
          className="font-semibold font-cairo transition duration-100 hover:text-gray-300"
        >
          English
        </a>
      )}
    </div>
  );
}
