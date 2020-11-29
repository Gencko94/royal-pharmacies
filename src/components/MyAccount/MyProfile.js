import React from 'react';
import ProfileEditModal from '../Modals/ProfileEditModal';
import Select from 'react-select';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../../contexts/AuthContext';
export default function MyProfile() {
  const { isLightTheme } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  const [profileEditModalOpen, setProfileEditModalOpen] = React.useState(false);
  const {
    userData,
    editMutation,
    authenticationLoading,
    authenticationFetching,
  } = React.useContext(AuthProvider);

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
  if (authenticationLoading || authenticationFetching) {
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
            visible={true}
          />
        </div>
      </motion.div>
    );
  }
  // if (isError) {
  //   return (
  //     <motion.div
  //       variants={containerVariants}
  //       initial="hidden"
  //       animate="visible"
  //       exit="exit"
  //       className="relative"
  //       style={{ height: 'calc(-90px + 100vh)' }}
  //     >
  //       <div className="flex h-full justify-center items-center">
  //         <h1 className="text-lg font-semibold">
  //           {formatMessage({ id: 'something-went-wrong-snackbar' })}
  //         </h1>
  //       </div>
  //     </motion.div>
  //   );
  // }
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
              <h1 className="">{userData.name}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'phone-number' })}
              </h1>
              <h1 className="">{userData.mobile}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'email-address' })}
              </h1>
              <h1 className="">{userData.email}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'date-joined' })}
              </h1>
              <h1 className="">{userData.created_at}</h1>
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
            <h1 className="flex-1">
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
            userData={userData}
            setProfileEditModalOpen={setProfileEditModalOpen}
            editMutation={editMutation}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
