import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';

export default function SideMenuCustomerService({ handleHideCustomerService }) {
  const { formatMessage, locale } = useIntl();
  const { settings } = React.useContext(DataProvider);
  return (
    <div className="sidebar-page">
      <div className="p-3 font-semibold justify-between flex items-center">
        <button
          className="relative rounded-full p-1"
          onClick={handleHideCustomerService}
        >
          {locale === 'ar' ? (
            <BsChevronRight className="w-5 h-5" />
          ) : (
            <BsChevronLeft className="w-5 h-5" />
          )}
        </button>
        <h1 className="flex-1 text-center">
          {formatMessage({ id: 'customer-service' })}
        </h1>
      </div>
      <hr />
      <div className="flex  items-center justify-center mt-2 mb-4 ">
        <div className="p-1  rounded-full bg-main-color ">
          <IoMdCall className=" h-25p w-25p text-main-text" />
        </div>
        <div className="flex flex-col text-center mx-6 font-semibold">
          <h1>{formatMessage({ id: 'footer-help-center' })}</h1>
          <h1>
            {formatMessage({ id: 'footer-call' })} {settings?.store_mobile}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <div className="p-1  rounded-full bg-main-color">
          <MdEmail className=" h-25p w-25p text-main-text" />
        </div>
        <div className="flex text-center font-semibold flex-col mx-6">
          <h1>{formatMessage({ id: 'footer-contact-email' })}</h1>
          <h1>{settings?.store_email}</h1>
        </div>
      </div>
    </div>
  );
}
