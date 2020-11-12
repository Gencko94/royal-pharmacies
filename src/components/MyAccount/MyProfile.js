import React from 'react';
import ProfileModal from '../Modals/ProfileModal';
import useClickAway from '../../hooks/useClickAway';
import Select from 'react-select';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import { motion } from 'framer-motion';
export default function MyProfile() {
  const { isLightTheme } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  const [profileEditModalOpen, setProfileEditModalOpen] = React.useState(false);
  const generalInformationOptions = [
    { title: 'full-name', value: 'John Doe' },

    { title: 'phone-number', value: '+123456789' },
    { title: 'date-of-birth', value: '1/1/1990' },
  ];
  const profileModalRef = React.useRef(null);
  const profileModalBoxRef = React.useRef(null);
  useClickAway(profileModalBoxRef, () => {
    setProfileEditModalOpen(false);
  });

  const checkEscKey = e => {
    if ('key' in e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setProfileEditModalOpen(false);
      }
    }
  };
  React.useEffect(() => {
    document.addEventListener('keydown', checkEscKey);
    return () => {
      document.removeEventListener('keydown', checkEscKey);
    };
  }, []);
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
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
          {generalInformationOptions.map((option, i) => {
            return (
              <div key={i}>
                <div
                  className={`${
                    i % 2 ? '' : isLightTheme ? 'bg-body-light' : 'bg-body-dark'
                  } py-4 px-3 flex    `}
                >
                  <h1 className="  w-2/4">
                    {formatMessage({ id: option.title })}
                  </h1>
                  <h1 className="">{option.value}</h1>
                </div>
                <hr />
              </div>
            );
          })}
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
          <div className="">
            <div
              className={`${
                isLightTheme ? 'bg-nav-cat-light' : 'bg-nav-cat-dark'
              } py-4 px-3 flex `}
            >
              <h1 className="  w-2/4">
                {formatMessage({ id: 'email-address' })}
              </h1>
              <h1 className="">John@doe.com</h1>
            </div>
          </div>
          <hr />
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

      <ProfileModal
        profileModalRef={profileModalRef}
        profileModalBoxRef={profileModalBoxRef}
        profileEditModalOpen={profileEditModalOpen}
      />
    </motion.div>
  );
}
