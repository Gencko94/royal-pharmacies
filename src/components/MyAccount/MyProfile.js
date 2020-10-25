import React from 'react';
import ProfileModal from '../Modals/ProfileModal';
import useClickAway from '../../hooks/useClickAway';
import Select from 'react-select';
export default function MyProfile({ isLightTheme }) {
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  const [profileEditModalOpen, setProfileEditModalOpen] = React.useState(false);
  const generalInformationOptions = [
    { title: 'Full Name', value: 'John Doe' },
    { title: 'Email Address', value: 'John@Doe.com' },
    { title: 'Phone Number', value: '+123456789' },
    { title: 'Date of Birth', value: '1/1/1990' },
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

  return (
    <div
      className={`rounded-lg overflow-y-auto ${
        isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider-wide'
      }`}
      // style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      <div className="">
        <div className="px-3 py-3 flex">
          <h1 className="text-xl font-semibold"> General Information</h1>
          <button
            onClick={() => setProfileEditModalOpen(true)}
            className={`px-4 py-1 ml-auto font-semibold ${
              isLightTheme
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-btn-primary-dark text-btn-secondary-dark'
            } rounded`}
          >
            Edit
          </button>
        </div>
        <hr />
        <div className=" ">
          {generalInformationOptions.map((option, i) => {
            return (
              <div
                key={i}
                className={`${
                  i % 2 ? '' : isLightTheme ? 'bg-body-light' : 'bg-body-dark'
                } py-4 px-3 flex    `}
              >
                <h1 className=" font-semibold w-2/4">{option.title}</h1>
                <h1 className="">{option.value}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="mt-4 mb-1" />

      <div className="">
        <div className="px-3 py-3">
          <h1 className="text-xl font-semibold"> Language Preferences</h1>
        </div>
        <hr />
        <div className="">
          <div
            className={`${
              isLightTheme
                ? 'bg-body-light text-body-text-light'
                : 'bg-body-dark text-body-text-dark'
            } py-3 px-3 flex items-center   `}
          >
            <h1 className=" font-semibold flex-1">Preffered Language</h1>
            <Select
              defaultValue={language}
              onChange={e => setLanguage(e)}
              options={languages}
              className="flex-1 text-center"
            />
            {/* <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className={`${
                !isLightTheme && 'bg-nav-cat-dark text-nav-cat-text-dark'
              } form-select`}
            >
              {languages.map((language, i) => {
                return <option key={i}>{language}</option>;
              })}
            </select> */}
          </div>
        </div>
      </div>
      <hr className="mb-1" />

      <div className="">
        <div className="px-3 py-3 flex ">
          <h1 className="text-xl font-semibold"> Change Password</h1>
          <button
            className={`px-4 py-1 ml-auto font-semibold ${
              isLightTheme
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-btn-primary-dark text-btn-secondary-dark'
            } rounded`}
          >
            Edit
          </button>
        </div>
        <hr />
        <div className="">
          <div
            className={`${
              isLightTheme ? 'bg-nav-cat-light' : 'bg-nav-cat-dark'
            } py-4 px-3 flex `}
          >
            <h1 className=" font-semibold w-2/4">Password</h1>
            <h1 className="">**********</h1>
          </div>
        </div>
      </div>

      <ProfileModal
        profileModalRef={profileModalRef}
        profileModalBoxRef={profileModalBoxRef}
        profileEditModalOpen={profileEditModalOpen}
      />
    </div>
  );
}
