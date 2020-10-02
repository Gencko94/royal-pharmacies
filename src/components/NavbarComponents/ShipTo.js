import React from 'react';
import kuwait from '../../assets/flags/kuwait.svg';
import qatar from '../../assets/flags/qatar.svg';
import uae from '../../assets/flags/uae.svg';
import { BiCaretDown } from 'react-icons/bi';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
export default function ShipTo() {
  const { selectedStore, setSelectedStore, countryList } = React.useContext(
    DataProvider
  );
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
    <div className="relative">
      <button
        onClick={toggleCountryList}
        className="  flex items-center rounded p-1 hover:bg-red-300 transition duration-100"
      >
        <span className="text-sm mr-2">
          Store <span className="font-bold">{selectedStore}</span>
        </span>
        <BiCaretDown />
      </button>
      <div
        ref={countryListRef}
        className="absolute p-2 transform z-20 scale-0 mt-1 text-gray-900 font-semibold   bg-nav-secondary w-full  overflow-hidden left-0  top-100  transition duration-150 origin-top"
        style={{ width: '200px' }}
      >
        {countryList.map((country, i) => {
          return (
            <button
              onClick={() => {
                setSelectedStore(country);
                toggleCountryList();
              }}
              className="py-2 flex px-6 items-center font-semibold  w-full text-nav-primary hover:bg-nav-primary hover:text-nav-secondary"
            >
              <input
                type="checkbox"
                className="form-checkbox rounded-full text-red-500 mr-2"
                checked={selectedStore === country}
              />
              <img
                src={mapCountryToFlags[country]}
                className="w-20p h-20p mr-2 "
                alt="uae"
              />
              {country}
            </button>
          );
        })}
      </div>
    </div>
  );
}
