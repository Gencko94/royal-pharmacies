import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';

export default function FirstSection() {
  const { formatMessage, locale } = useIntl();
  const { settings } = React.useContext(DataProvider);
  return (
    <div className="bg-main-color text-main-text   px-4 py-3">
      <div className={`grid grid-cols-1 gap-2 mb-2`}>
        <div className="text-center  font-bold">
          <h1 className="text-lg">{formatMessage({ id: 'footer-help' })}</h1>
          <h1 className="text-sm  font-semibold">
            {formatMessage({ id: 'footer-reach' })}
          </h1>
        </div>
        <div className="flex  items-center justify-center mt-2 ">
          <div className="p-1  rounded-full bg-gray-800 ">
            <IoMdCall className=" h-25p w-25p" />
          </div>
          <div className="flex flex-col text-center mx-2 font-semibold">
            <h1 className="text-sm">
              {formatMessage({ id: 'footer-help-center' })}
            </h1>
            <h1 className="text-sm">
              {formatMessage({ id: 'footer-call' })} {settings?.store_mobile}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="p-1  rounded-full bg-gray-800">
            <MdEmail className=" h-25p w-25p" />
          </div>
          <div className="flex text-center font-semibold flex-col mx-2">
            <h1 className="text-sm">
              {formatMessage({ id: 'footer-contact-email' })}
            </h1>
            <h1 className="text-base">{settings?.store_email}</h1>
          </div>
        </div>
      </div>
      <div className="text-center mt-2 text-lg font-bold ">
        <h1>{formatMessage({ id: 'download-apps' })}</h1>
      </div>
      <div className="flex justify-evenly items-center">
        {settings?.app_apple_store && (
          <a
            rel="noopener noreferrer"
            href={`${settings?.app_apple_store}`}
            target="_blank"
            className="mr-4"
          >
            <img
              style={{ width: '200px' }}
              src={`/images/apple-badge-${locale}.png`}
              alt="Download MRG Application on App Store"
            />
          </a>
        )}
        {settings?.app_google_play && (
          <a
            rel="noopener noreferrer"
            href={`${settings?.app_google_play}`}
            target="_blank"
            className="mr-4"
          >
            <img
              style={{ width: '200px' }}
              src={`/images/google-badge-${locale}.png`}
              alt="Download MRG Application on Google Play"
            />
          </a>
        )}
      </div>
    </div>
  );
}
