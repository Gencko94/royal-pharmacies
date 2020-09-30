import React from 'react';
import kuwait from '../../assets/flags/kuwait.svg';
import qatar from '../../assets/flags/qatar.svg';
import uae from '../../assets/flags/uae.svg';
import { BiCaretDown } from 'react-icons/bi';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
export default function Flag() {
  const { country, setCountry } = React.useContext(DataProvider);
  const mapCountryToFlags = {
    Kuwait: kuwait,
    Qatar: qatar,
    UAE: uae,
  };
  const [countryListOpen, setCountryListOpen] = React.useState(false);
  const countryListRef = React.useRef(null);
  useClickAway(countryListRef, () => {
    if (countryListOpen) {
      countryListRef.current.classList.replace('scale-100', 'scale-0');
      setCountryListOpen(false);
    }
  });
  const toggleCountryList = () => {
    if (countryListRef.current) {
      countryListRef.current.classList.replace('scale-0', 'scale-100');
      setCountryListOpen(true);
    }
  };
  return (
    <div className=" flex items-center relative ">
      <img
        src={mapCountryToFlags[country]}
        alt="flag"
        className="w-25p h-25p mr-2"
      />
      <div className="">
        <button
          onClick={toggleCountryList}
          className="  flex items-center rounded p-1 hover:bg-red-300 transition duration-100"
        >
          <span className="text-sm mr-2">
            Ship to <span className="font-bold">{country}</span>
          </span>
          <BiCaretDown />
        </button>
        <div
          ref={countryListRef}
          className="absolute transform z-20 scale-0 mt-1  w-full rounded overflow-hidden left-0  top-100  transition duration-150 origin-top"
          style={{ width: '200px' }}
        >
          <button
            onClick={() => {
              setCountry('Kuwait');
              toggleCountryList();
            }}
            className="py-2 flex px-6 items-center  w-full bg-nav-secondary text-nav-primary hover:bg-nav-primary hover:text-nav-secondary"
          >
            <input
              type="checkbox"
              className="form-checkbox rounded-full text-red-500 mr-2"
              checked={country === 'Kuwait'}
            />
            <img src={kuwait} className="w-20p h-20p mr-2 " alt="uae" />
            Kuwait
          </button>
          <button
            onClick={() => {
              setCountry('UAE');
              toggleCountryList();
            }}
            className="py-2 flex px-6 items-center  w-full bg-nav-secondary text-nav-primary hover:bg-nav-primary hover:text-nav-secondary"
          >
            <input
              type="checkbox"
              className="form-checkbox rounded-full text-red-500 mr-2"
              checked={country === 'UAE'}
            />
            <img src={uae} className="w-20p h-20p mr-2 " alt="uae" />
            UAE
          </button>
          <button
            onClick={() => {
              setCountry('Qatar');
              toggleCountryList();
            }}
            className=" py-2 flex items-center px-6  w-full bg-nav-secondary text-nav-primary hover:bg-nav-primary hover:text-nav-secondary"
          >
            <input
              type="checkbox"
              className="form-checkbox rounded-full text-red-500 mr-2"
              checked={country === 'Qatar'}
            />
            <img src={qatar} className="w-20p h-20p mr-2 " alt="qatar" />
            Qatar
          </button>
        </div>
      </div>
    </div>
  );
}
