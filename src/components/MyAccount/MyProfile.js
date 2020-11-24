import React from 'react';
import ProfileEditModal from '../Modals/ProfileEditModal';
import Select from 'react-select';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import { AnimatePresence, motion } from 'framer-motion';
import { queryCache, useMutation, useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { editUserProfileInfo, getUserProfileInfo } from '../../Queries/Queries';
export default function MyProfile() {
  const { isLightTheme } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  const [profileEditModalOpen, setProfileEditModalOpen] = React.useState(false);

  /**
   * Main Fetch
   */

  const { data, isLoading, isError } = useQuery(
    'userProfile',
    async () => {
      const res = await getUserProfileInfo();
      return res.userData;
    },
    { refetchOnWindowFocus: false }
  );

  /**
   * Edit Fetch
   */

  const [editMutation] = useMutation(
    async data => {
      const res = await editUserProfileInfo(data);
      return res.userData;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('userProfile', prev => {
          return {
            ...prev,
            email: data.email,
            name: data.name,
          };
        });
        setProfileEditModalOpen(false);
      },
      throwOnError: true,
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
  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative"
        style={{ height: 'calc(-90px + 100vh)' }}
      >
        <div className="flex h-full justify-center items-center">
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={40}
            width={40}
            visible={isLoading}
          />
        </div>
      </motion.div>
    );
  }
  if (isError) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative"
        style={{ height: 'calc(-90px + 100vh)' }}
      >
        <div className="flex h-full justify-center items-center">
          <h1 className="text-lg font-semibold">
            {formatMessage({ id: 'something-went-wrong-snackbar' })}
          </h1>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
      style={{ height: 'calc(-90px + 100vh)' }}
    >
      <div className="">
        <div className="bg-main-color text-main-text px-3 py-3 flex items center justify-between">
          <h1 className="text-lg">
            {formatMessage({ id: 'general-information' })}
          </h1>
          <button
            onClick={() => setProfileEditModalOpen(true)}
            className={`px-4 text-sm py-1 font-semibold bg-body-light text-btn-primary-light rounded`}
          >
            {formatMessage({ id: 'edit' })}
          </button>
        </div>
        <div className=" ">
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">{formatMessage({ id: 'full-name' })}</h1>
              <h1 className="">{data.name}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'phone-number' })}
              </h1>
              <h1 className="">{data.mobile}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'email-address' })}
              </h1>
              <h1 className="">{data.email}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'date-joined' })}
              </h1>
              <h1 className="">{data.created_at}</h1>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className="">
        <div className="px-3 py-3 bg-main-color text-main-text flex items-center justify-between ">
          <h1 className="text-lg">{formatMessage({ id: 'security' })}</h1>
          <button
            className={`px-4 py-1 text-sm font-semibold bg-body-light text-btn-primary-light rounded`}
          >
            {formatMessage({ id: 'edit' })}
          </button>
        </div>
        <div className="">
          <div
            className={`${
              isLightTheme ? 'bg-nav-cat-light' : 'bg-nav-cat-dark'
            } py-4 px-3 flex `}
          >
            <h1 className=" w-2/4">{formatMessage({ id: 'password' })}</h1>
            <h1 className="">**********</h1>
          </div>
        </div>
      </div>
      <div className="">
        <div className="px-3 py-3 bg-main-color text-main-text">
          <h1 className="text-lg ">{formatMessage({ id: 'language' })}</h1>
        </div>
        <div className="">
          <div
            className={`${
              isLightTheme
                ? 'bg-body-light text-body-text-light'
                : 'bg-body-dark text-body-text-dark'
            } py-3 px-3 flex items-center   `}
          >
            <h1 className=" font-semibold flex-1">
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

      <AnimatePresence>
        {profileEditModalOpen && (
          <ProfileEditModal
            editMutation={editMutation}
            data={data}
            setProfileEditModalOpen={setProfileEditModalOpen}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
