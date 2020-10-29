import React from 'react';

import { BiCaretDown } from 'react-icons/bi';
import { useIntl } from 'react-intl';
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
  const { formatMessage } = useIntl();
  return (
    <div className="relative">
      <button
        onClick={toggleCountryList}
        className=" p-1 flex items-center rounded hover:bg-main-color  transition duration-100"
      >
        <h1 className="text-sm uppercase ">
          {formatMessage({ id: 'nav.shipTo' })}
        </h1>
        <img
          src={flags[deliveryCountry]}
          className="w-20p h-20p mx-1 "
          alt="uae"
        />
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
              className={`py-2 flex px-6 uppercase items-center font-semibold  w-full text-nav-primary hover:bg-second-nav-light hover:text-second-nav-text-light`}
            >
              <input
                type="checkbox"
                className="form-checkbox rounded-full text-red-500 mr-2"
                checked={deliveryCountry === country}
                readOnly={true}
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
