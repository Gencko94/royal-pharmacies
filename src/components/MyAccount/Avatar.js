import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../../contexts/AuthContext';
import AvatarLoader from './AvatarLoader';
import { IoMdPower } from 'react-icons/io';
export default function Avatar() {
  const { formatMessage } = useIntl();
  const {
    userData,
    authenticationLoading,
    authenticationFetching,
    userLogoutMutation,
  } = React.useContext(AuthProvider);
  if (authenticationLoading || authenticationFetching) {
    return <AvatarLoader />;
  }
  return (
    <motion.div className="flex mb-4 rounded-lg  p-2 border shadow-itemsSlider-shallow overflow-hidden ">
      <div
        className="flex items-center justify-center"
        style={{ flexBasis: '20%' }}
      >
        <div className="p-2 text-xl text-body-light rounded-full bg-gray-500">
          {userData?.name.split(' ')[0].charAt(0).toUpperCase()}
        </div>
      </div>
      <div className=" flex flex-col items-center flex-1 justify-center font-semibold mx-2 ">
        <div className="flex mb-1 items-center ">
          <h1>{formatMessage({ id: 'welcome-user' })} </h1>
          <h1 className="mx-1">{userData?.name}</h1>
        </div>
        <h1 className="mb-1">{userData?.mobile}</h1>
        <div className="flex items-center">
          <IoMdPower className=" w-5 h-5 text-main-color" />
          <button
            onClick={userLogoutMutation}
            className="hover:underline mx-1 font-semibold  text-main-color"
          >
            {formatMessage({ id: 'logout' })}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
