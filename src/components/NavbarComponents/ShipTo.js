import React from 'react';

import { BiCaretDown } from 'react-icons/bi';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
export default function ShipTo() {
  const {
    deliveryCountry,
    setDeliveryCountry,
    flags,
    countries,
  } = React.useContext(DataProvider);

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
        className="  flex items-center rounded p-1 hover:bg-second-nav-light  transition duration-100"
      >
        <span className="text-sm mr-2">
          Deliver to <span className="font-bold">{deliveryCountry}</span>
        </span>
        <BiCaretDown />
      </button>
      <div
        ref={countryListRef}
        className="absolute p-2 transform z-20 scale-0 mt-1 text-gray-900 font-semibold   bg-gray-100 w-full  overflow-hidden left-0  top-100  transition duration-150 origin-top"
        style={{ width: '200px' }}
      >
        {countries.map((country, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                setDeliveryCountry(country);
                toggleCountryList();
              }}
              className="py-2 flex px-6 items-center font-semibold  w-full text-nav-primary hover:bg-second-nav-light hover:text-second-nav-text-light"
            >
              <input
                type="checkbox"
                className="form-checkbox rounded-full text-red-500 mr-2"
                checked={deliveryCountry === country}
              />
              <img
                src={flags[country]}
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
