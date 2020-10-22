import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
import { CSSTransition } from 'react-transition-group';

export default function DeliverTo() {
  const {
    deliveryCountry,
    setDeliveryCountry,
    flags,
    countries,
    isLightTheme,
  } = React.useContext(DataProvider);

  const [countryListOpen, setCountryListOpen] = React.useState(false);
  const countryListRef = React.useRef(null);
  useClickAway(countryListRef, () => {
    setCountryListOpen(false);
  });
  const toggleCountryList = () => {
    setCountryListOpen(true);
  };
  return (
    <div className=" ml-auto ">
      <button
        onClick={toggleCountryList}
        className=" relative flex items-center justify-center rounded-full  hover:bg-red-300 transition duration-100"
      >
        <img src={flags[deliveryCountry]} className="w-25p h-25p" alt="uae" />
      </button>
      <CSSTransition
        in={countryListOpen}
        timeout={200}
        unmountOnExit={true}
        classNames="deliver-to"
      >
        <div
          ref={countryListRef}
          className={`absolute rounded z-20 mt-2 font-semibold ${
            isLightTheme
              ? 'bg-second-nav-text-light text-second-nav-dark'
              : 'bg-second-nav-dark text-second-nav-text-dark'
          }`}
          style={{ right: '60px' }}
        >
          <h1 className="p-2">Deliver To</h1>
          <hr className="my-0" />
          {countries.map((country, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setDeliveryCountry(country);
                  toggleCountryList();
                }}
                className=" flex p-2  items-center w-full font-semibold text-sm "
              >
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full text-red-500 mr-2"
                  checked={deliveryCountry === country}
                  readOnly={true}
                />
                <img
                  src={flags[country]}
                  className="w-25p h-25p mr-2 "
                  alt="uae"
                />
                <h1 className="uppercase">{country}</h1>
              </button>
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
}
