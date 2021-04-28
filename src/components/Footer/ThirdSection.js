import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import { useIntl } from 'react-intl';

import { Link } from 'react-router-dom';

import { DataProvider } from '../../contexts/DataContext';

export default function ThirdSection({ pages }) {
  const { formatMessage, locale } = useIntl();
  const { settings } = React.useContext(DataProvider);
  return (
    <div
      className={`pt-4 px-8 pb-2 bg-first-nav-light text-main-text   flex items-center justify-between  `}
    >
      <div className="flex items-center ">
        <Link to={`/${locale}/`}>
          {settings && (
            <img
              src={settings?.store_logo}
              alt={`${settings?.store_name_en} Logo`}
              style={{ height: '44px' }}
            />
          )}
        </Link>
        <div className="flex items-center flex-col mx-2 text-sm justify-center">
          <h1 className=" font-semibold mb-1 text-center">
            &copy; 2021{' '}
            {locale === 'en'
              ? settings?.store_name_en
              : settings?.store_name_ar}
            . {formatMessage({ id: 'footer-all-rights' })} .{' '}
            {formatMessage({ id: 'footer-all-rights' })}
          </h1>
          <div className="text-center">
            {formatMessage({ id: 'developed-by' })}
            <a className="font-bold mx-1 " href="https://mamacgroup.com">
              MAMAC GROUP
            </a>
          </div>
        </div>
      </div>

      {pages && (
        <div className="flex text-sm justify-evenly flex-wrap">
          {pages.map(page => {
            return (
              page.type === 'page' && (
                <Link
                  key={page.id}
                  to={`/${locale}/site/${page.page?.slug}`}
                  className="mr-4"
                >
                  {page.translation[locale].name}
                </Link>
              )
            );
          })}
        </div>
      )}
      {settings && (
        <div className="flex justify-evenly">
          {settings?.sm_facebook && (
            <a
              rel="noopener noreferrer"
              href={`https://facebook.com/${settings?.sm_facebook}`}
              target="_blank"
              className="mr-4"
            >
              <FaFacebook className=" text-blue-600 h-25p w-25p" />
            </a>
          )}
          {settings?.sm_twitter && (
            <a
              rel="noopener noreferrer"
              href={`https://twitter.com/${settings?.sm_twitter}`}
              target="_blank"
              className="mr-4"
            >
              <FaTwitter className=" text-blue-400 h-25p w-25p" />
            </a>
          )}
          {settings?.sm_instagram && (
            <a
              rel="noopener noreferrer"
              href={`https://instagram.com/${settings?.sm_instagram}`}
              target="_blank"
              className="mr-4"
            >
              <FaInstagram className="h-25p w-25p text-red-400" />
            </a>
          )}
          {settings?.sm_linkedin && (
            <a
              rel="noopener noreferrer"
              href={`https://linkedin.com/${settings?.sm_linkedin}`}
              target="_blank"
              className="mr-4"
            >
              <FaLinkedin className="h-25p w-25p text-blue-600" />
            </a>
          )}
          {settings?.sm_whatsapp && (
            <a
              rel="noopener noreferrer"
              href={`https://wa.me/${settings?.sm_whatsapp}`}
              target="_blank"
              className="mr-4"
            >
              <FaWhatsapp className="h-25p w-25p text-green-600" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
