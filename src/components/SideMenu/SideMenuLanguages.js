import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

export default function SideMenuLanguages({
  handleHideLanguages,
  toggleSideMenu,
}) {
  const { formatMessage, locale } = useIntl();
  const { pathname } = useLocation();
  const getCurrentPath = pathname => {
    return pathname.slice(4);
  };
  return (
    <div className="sidebar-page">
      <div className="p-3 font-semibold justify-between flex items-center">
        <button
          className="relative rounded-full p-1"
          onClick={handleHideLanguages}
        >
          {locale === 'ar' ? (
            <BsChevronRight className="w-5 h-5" />
          ) : (
            <BsChevronLeft className="w-5 h-5" />
          )}
        </button>
        <h1 className="flex-1 text-center">
          {formatMessage({ id: 'language' })}
        </h1>
      </div>
      <hr />

      <button
        onClick={() => {
          if (locale === 'ar') {
            return;
          }
          toggleSideMenu();
          window.location.href = `/ar/${getCurrentPath(pathname)}`;
        }}
        className={`${
          locale === 'ar' && 'bg-main-color text-main-text'
        } py-2 px-2 mb-2 flex items-center font-cairo  justify-center font-semibold`}
      >
        العربية
      </button>
      <button
        onClick={() => {
          if (locale === 'en') {
            return;
          }
          toggleSideMenu();
          window.location.href = `/en/${getCurrentPath(pathname)}`;
        }}
        className={`${
          locale === 'en' && 'bg-main-color text-main-text'
        } py-2 px-2 mb-2 flex items-center  justify-center font-semibold`}
      >
        English
      </button>
    </div>
  );
}
