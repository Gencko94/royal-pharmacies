import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import { queryCache, useMutation, useQuery } from 'react-query';
import Select from 'react-select';
import { DataProvider } from '../../contexts/DataContext';
import ProfileEditModalMobile from './ProfileEditModalMobile';

export default function MyProfileMobile() {
  const { formatMessage } = useIntl();
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  const { getUserProfileInfo, editUserProfileInfo } = React.useContext(
    DataProvider
  );
  const [profileEditModalOpen, setProfileEditModalOpen] = React.useState(false);
  /**
   * Main Fetch
   */

  const { data, isLoading } = useQuery(
    'userProfile',
    async () => {
      const res = await getUserProfileInfo();
      return res;
    },
    { refetchOnWindowFocus: false }
  );

  /**
   * Edit Fetch
   */

  const [editMutation] = useMutation(
    async data => {
      console.log(data);
      return await editUserProfileInfo(data);
    },
    {
      onSuccess: data => {
        console.log(data);
        queryCache.setQueryData('userProfile', prev => {
          return {
            ...prev,
            ...data,
          };
        });
        setProfileEditModalOpen(false);
      },
    }
  );

  const containerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };
  if (isLoading)
    return (
      <div className=" p-4 " style={{ height: 'calc(-173px + 100vh)' }}>
        <div className="flex h-full justify-center items-center">
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={40}
            width={40}
            visible={isLoading}
          />
        </div>
      </div>
    );
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="">
          <div className="px-3 py-3 flex justify-between  text-gray-900">
            <h1 className="text-xl font-semibold">
              {' '}
              {formatMessage({ id: 'general-information' })}
            </h1>
            <button
              onClick={() => setProfileEditModalOpen(true)}
              className="px-2 py-1 text-sm  font-semibold bg-main-color text-main-text rounded"
            >
              {formatMessage({ id: 'edit' })}
            </button>
          </div>
          <hr />
          <div className=" ">
            <div className="py-4 px-3 flex  ">
              <h1 className=" font-semibold w-2/4">
                {formatMessage({ id: 'full-name' })}
              </h1>
              <h1 className="">{data.fullName}</h1>
            </div>

            <div className="py-4 px-3 flex  bg-red-100">
              <h1 className=" font-semibold w-2/4">
                {formatMessage({ id: 'phone-number' })}
              </h1>
              <h1 className="">{data.phoneNumber}</h1>
            </div>
            <div className="py-4 px-3 flex  ">
              <h1 className=" font-semibold w-2/4">
                {formatMessage({ id: 'email-address' })}
              </h1>
              <h1 className="">{data.email}</h1>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-2" />
        <div className="">
          <div className="px-3 py-3 flex justify-between text-gray-900">
            <h1 className="text-xl font-semibold">
              {' '}
              {formatMessage({ id: 'security' })}
            </h1>
            <button className="py-1 px-2 text-sm  font-semibold bg-main-color text-main-text rounded">
              {formatMessage({ id: 'edit' })}
            </button>
          </div>
          <hr />
          <div className="">
            <div className="py-4 px-3 flex  bg-red-100">
              <h1 className=" font-semibold w-2/4">
                {formatMessage({ id: 'password' })}
              </h1>
              <h1 className="">**********</h1>
            </div>
          </div>
        </div>
        <hr className="mt-5 mb-2" />
        <div className="">
          <div className="px-3 py-3 text-gray-900">
            <h1 className="text-xl font-semibold">
              {formatMessage({ id: 'language' })}
            </h1>
          </div>
          <hr />
          <div className="">
            <div className="py-4 px-3 flex items-center ">
              <h1 className=" font-semibold w-2/4">
                {formatMessage({ id: 'preffered-language' })}
              </h1>
              <Select
                defaultValue={language}
                onChange={e => setLanguage(e)}
                options={languages}
                className="flex-1 text-center"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {profileEditModalOpen && (
          <ProfileEditModalMobile
            data={data}
            setProfileEditModalOpen={setProfileEditModalOpen}
            editMutation={editMutation}
          />
        )}
      </AnimatePresence>
    </>
  );
}
