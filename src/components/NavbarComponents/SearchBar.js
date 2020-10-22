import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
// import OrderFrom from './OrderFrom';

export default function SearchBar() {
  const { isLightTheme } = React.useContext(DataProvider);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const history = useHistory();
  const handleSearch = e => {
    if (!searchBarValue) {
      return;
    }
    e.preventDefault();
    history.push(`/search/q=${searchBarValue}`);
  };
  return (
    <div
      className={`flex  mr-3 py-0 rounded overflow-hidden  relative  ${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light'
          : 'bg-nav-cat-dark text-nav-cat-text-dark'
      }    `}
    >
      <button
        onClick={handleSearch}
        className="grid place-items-center p-2 bg-nav-cat-light border-r mr-1 "
      >
        <BiSearch className=" w-5 h-5" />
      </button>
      <form onSubmit={handleSearch}>
        <input
          className={`flex-grow  p-2 ${
            isLightTheme
              ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
              : 'bg-nav-cat-dark text-nav-cat-text-dark placeholder-gray-500'
          }  `}
          style={{ width: '600px' }}
          type="text"
          placeholder="What are you looking for ?"
          value={searchBarValue}
          onChange={e => setSearchBarValue(e.target.value)}
        />
      </form>
      {/* <OrderFrom /> */}
    </div>
  );
}
