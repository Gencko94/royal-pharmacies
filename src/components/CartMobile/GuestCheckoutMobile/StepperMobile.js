import React from 'react';
import { FiMap } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useIntl } from 'react-intl';
export default function StepperMobile({ selectedStep, stepDone }) {
  const { formatMessage, locale } = useIntl();
  return (
    <div className="p-4 mb-12 md:max-w-screen-lg xxl:max-w-xl  mx-auto">
      <div className="">
        <div className="flex items-center ">
          <div className="   relative">
            <div
              className={`rounded-full ${
                selectedStep === 0 &&
                'bg-main-color text-main-text border-main-color '
              } ${
                stepDone[0] && 'bg-green-700 border-green-700 text-main-text'
              } transition duration-500 ease-in-out h-10 w-10 py-2 border-2 `}
            >
              {stepDone[0] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <FiMap className="w-full h-full" />
              )}
            </div>
            <div
              className={` absolute my-2 ${
                locale === 'ar' && 'rtl-stepper-icon_1'
              } ${
                selectedStep === 0 ? 'font-bold' : 'font-medium'
              }  text-center    `}
              style={{ left: '-2px' }}
            >
              {formatMessage({ id: 'address' })}
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out "></div>
          <div className=" relative">
            <div
              className={`${
                stepDone[1] && 'bg-green-700 border-green-700 text-main-text'
              } ${
                selectedStep === 1 &&
                'bg-main-color text-main-text border-main-color font-bold'
              } rounded-full transition duration-500 ease-in-out h-10 w-10 py-2 border-2  `}
            >
              {stepDone[1] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <FaUserAlt className="w-full h-full" />
              )}
            </div>
            <div
              className={`${
                locale === 'ar' && 'rtl-stepper-icon_2'
              } absolute text-center my-2 ${
                selectedStep === 1 ? 'font-bold' : 'font-medium'
              } `}
              style={{ left: '-2px' }}
            >
              {formatMessage({ id: 'order-details' })}
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300`}
          ></div>
          <div className={` relative`}>
            <div
              className={`${
                stepDone[2] && 'bg-green-700 border-green-700 text-main-text'
              } ${
                selectedStep === 2 &&
                'bg-main-color text-main-text border-main-color font-bold'
              } rounded-full transition duration-500 ease-in-out h-10 w-10 py-2 border-2`}
            >
              {stepDone[2] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <AiOutlineFileDone className="w-full h-full" />
              )}
            </div>
            <div
              className={`${locale === 'ar' && 'rtl-stepper-icon_3'} absolute ${
                selectedStep === 2 ? 'font-bold' : 'font-medium'
              } text-center my-2  `}
              style={{ left: '-9px' }}
            >
              {formatMessage({ id: 'order-placement' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
