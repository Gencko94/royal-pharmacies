import React from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';

export default function ThirdSection({ pages }) {
  const { formatMessage, locale } = useIntl();
  const { settings } = React.useContext(DataProvider);
  return (
    <div className="p-4 pb-2 text-gray-100 bg-gray-900 ">
      {pages && (
        <div className="flex flex-wrap text-sm mb-4 justify-around">
          {pages.map(page => {
            return (
              page.type === 'page' && (
                <Link
                  key={page.id}
                  className="flex-1 text-center"
                  to={`/${locale}/site/${page.page?.slug}`}
                >
                  {page.translation[locale].name}
                </Link>
              )
            );
          })}
        </div>
      )}
      <div className="flex justify-evenly mb-2">
        <a
          rel="noopener noreferrer"
          href={`${settings?.sm_facebook}`}
          target="_blank"
          className="mr-4"
        >
          <FaFacebook className=" text-blue-600 h-25p w-25p" />
        </a>
        <a
          rel="noopener noreferrer"
          href={`${settings?.sm_twitter}`}
          target="_blank"
          className="mr-4"
        >
          <FaTwitter className=" text-blue-400 h-25p w-25p" />
        </a>
        <a
          rel="noopener noreferrer"
          href={`${settings?.sm_instagram}`}
          target="_blank"
          className="mr-4"
        >
          <FaInstagram className="h-25p w-25p text-red-400" />
        </a>
        <a
          rel="noopener noreferrer"
          href={`${settings?.sm_linkedin}`}
          target="_blank"
          className="mr-4"
        >
          <FaLinkedin className="h-25p w-25p text-blue-600" />
        </a>
        <a
          rel="noopener noreferrer"
          href={`${settings?.sm_whatsapp}`}
          target="_blank"
          className="mr-4"
        >
          <FaWhatsapp className="h-25p w-25p text-green-600" />
        </a>
      </div>
      <div className=" px-4 py-2 flex justify-start items-end ">
        <Link to={`/${locale}/`}>
          {settings && (
            <img
              src={settings?.store_logo}
              alt="MRG-logo"
              style={{ maxHeight: '40px' }}
            />
          )}
        </Link>

        <div className="flex items-center flex-col mx-2 text-sm justify-center">
          <h1 className=" font-semibold mb-1 ">
            &copy; 2021 MRG . {formatMessage({ id: 'footer-all-rights' })}
          </h1>
          <div>
            Developed By
            <a className="font-bold mx-1" href="https://mamacgroup.com">
              MAMAC GROUP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
