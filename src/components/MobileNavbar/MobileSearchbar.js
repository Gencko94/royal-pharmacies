import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import axios from 'axios';
import { searchBarSearch } from '../../Queries/Queries';
import Autosuggest from 'react-autosuggest';
import theme from './theme.module.css';
import { BeatLoader } from 'react-spinners';
let cancelToken;
export default function MobileSearchbar({ isLightTheme }) {
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const { formatMessage } = useIntl();

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const getSuggestionValue = suggestion => {
    return suggestion.translation[0].title;
  };

  const renderSuggestion = (suggestion, { isHighlighted }) => {
    return (
      <div className={`p-2 ${isHighlighted && 'bg-gray-300 rounded'}`}>
        {suggestion.translation[0].title}
      </div>
    );
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength < 2) return [];
    setLoading(true);
    searchBarSearch(value, cancelToken).then(res => {
      setData(res);
      setLoading(false);
    });
  };
  const onSuggestionsClearRequested = () => {
    setData([]);
  };
  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div
        {...containerProps}
        className="absolute  left-0 bg-body-light w-full rounded"
        style={{ top: '110%' }}
      >
        {children}
      </div>
    );
  };
  const renderInputComponent = inputProps => {
    return (
      <input
        {...inputProps}
        className={`w-full p-2
            ${
              isLightTheme
                ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
                : 'bg-nav-cat-dark text-nav-cat-text-dark placeholder-gray-500'
            }  `}
      />
    );
  };
  const handleSelect = (event, { suggestion }) => {
    console.log(suggestion);
  };
  return (
    <div
      className={`${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700 '
          : 'bg-first-nav-light text-nav-cat-text-dark placeholder-gray-500 shadow-itemsSlider-shallow'
      } rounded flex items-center overflow-hidden flex-1 `}
    >
      <div
        className={`${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-nav-cat-dark text-nav-cat-text-dark'
        }  p-1  `}
      >
        <BiSearch className=" w-5 h-5 " />
      </div>
      <Autosuggest
        theme={theme}
        inputProps={{
          value: searchBarValue,
          placeholder: formatMessage({ id: 'nav.search.placeholder' }),
          onChange: (e, { newValue }) => setSearchBarValue(newValue),
        }}
        renderInputComponent={renderInputComponent}
        suggestions={data}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={handleSelect}
      />
      <div
        className="p-2 flex items-center justify-center"
        style={{ width: '15%' }}
      >
        <BeatLoader loading={isLoading} size={8} color={'#b72b2b'} />
      </div>
      {/* <form onSubmit={handleSearch} className="flex-1">
        <input
          value={searchBarValue}
          onChange={e => setSearchBarValue(e.target.value)}
          type="search"
          className={` ${
            isLightTheme
              ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
              : 'bg-first-nav-light text-nav-cat-text-dark placeholder-gray-500'
          } p-1 w-full `}
          placeholder={formatMessage({ id: 'nav.search.placeholder' })}
        />
      </form> */}
    </div>
  );
}
