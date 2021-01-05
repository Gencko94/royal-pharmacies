import React from 'react';
import { FiMap } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useIntl } from 'react-intl';
export default function Stepper({ selectedStep, stepDone }) {
  const { formatMessage } = useIntl();
  return (
    <div className="p-4  md:max-w-screen-lg xxl:max-w-xl  mx-auto">
      <div className="">
        <div className="flex items-center ">
          <div className="flex items-center   relative">
            <div
              className={`rounded-full ${
                selectedStep === 0 &&
                'bg-main-color text-main-text border-main-color '
              } ${
                stepDone[0] && 'bg-green-700 border-green-700 text-main-text'
              } transition duration-500 ease-in-out h-12 w-12 py-3 border-2 `}
            >
              {stepDone[0] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <FiMap className="w-full h-full" />
              )}
            </div>
            <div
              className={`mx-1 ${
                selectedStep === 0 && 'font-bold'
              }  text-center text-sm  `}
            >
              {formatMessage({ id: 'address' })}
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out "></div>
          <div className="flex items-center relative">
            <div
              className={`${
                stepDone[1] && 'bg-green-700 border-green-700 text-main-text'
              } ${
                selectedStep === 1 &&
                'bg-main-color text-main-text border-main-color font-bold'
              } rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2  `}
            >
              {stepDone[1] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <FaUserAlt className="w-full h-full" />
              )}
            </div>
            <div
              className={`text-center mx-1 text-sm   ${
                selectedStep === 1 && 'font-bold '
              } `}
            >
              {formatMessage({ id: 'order-details' })}
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300`}
          ></div>
          <div className={`flex items-center relative`}>
            <div
              className={`${
                stepDone[2] && 'bg-green-700 border-green-700 text-main-text'
              } ${
                selectedStep === 2 &&
                'bg-main-color text-main-text border-main-color font-bold'
              } rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2`}
            >
              {stepDone[2] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <AiOutlineFileDone className="w-full h-full" />
              )}
            </div>
            <div
              className={`${
                selectedStep === 2 && 'font-bold'
              } text-center mx-1  text-sm `}
            >
              {formatMessage({ id: 'order-placement' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
