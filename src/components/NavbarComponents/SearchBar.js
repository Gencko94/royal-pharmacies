import axios from 'axios';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import theme from './theme.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import { DataProvider } from '../../contexts/DataContext';
let cancelToken = undefined;
export default function SearchBar() {
  const { searchBarValue, setSearchBarValue } = React.useContext(DataProvider);
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [noSuggestions, setNoSuggestions] = React.useState(false);
  const { formatMessage, locale } = useIntl();
  const history = useHistory();

  // with controlling the arrows
  const getSuggestionValue = suggestion => {
    return suggestion.translation[locale].title;
  };
  const renderSuggestion = (suggestion, { isHighlighted }) => {
    return (
      <div
        className={`px-2 py-1 cursor-pointer flex items-center ${
          isHighlighted && 'bg-gray-300 rounded'
        }`}
      >
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/small/${suggestion.image?.link}`}
          alt=""
          style={{ height: '50px' }}
        />
        <h1 className="mx-1 text-sm">{suggestion.translation[locale].title}</h1>
      </div>
    );
  };

  React.useEffect(() => {
    if (searchBarValue.length === 0) {
      setNoSuggestions(false);
    }
  }, [searchBarValue]);
  const onSuggestionsFetchRequested = async ({ value }) => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();
    const inputValue = value.trim().toLowerCase();
    const inputThreshold = inputValue.length > 2;
    const inputLength = inputValue.length;

    if (inputLength <= 2) {
      setNoSuggestions(false);
      setLoading(false);
      return [];
    }

    setLoading(true);
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_MAIN_URL}/search-products`,
        params: { value: value, page: 1 },
        cancelToken: cancelToken.token,
      });
      if (res) {
        setData(res.data.data.data.slice(0, 8));
        if (inputThreshold && res.data.data.data.length === 0) {
          setNoSuggestions(true);
        } else {
          setNoSuggestions(false);
        }
        setLoading(false);
      }
    } catch (error) {
      if (axios.isCancel(error)) return [];
    }
  };
  const onSuggestionsClearRequested = () => {
    setData([]);
  };
  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div
        {...containerProps}
        className="absolute  left-0 bg-body-light w-full rounded"
        style={{ top: '110%' }}
      >
        {children}
        {data?.length !== 0 && (
          <button
            onClick={() => {
              history.push(`/${locale}/search/q=${query}`);
              setData([]);
            }}
            className="p-2 bg-gray-200 w-full transition duration-75"
          >
            {formatMessage({ id: 'see-all-search-results' })}{' '}
            <strong>{query}</strong>
          </button>
        )}
        {noSuggestions && (
          <div className="p-2">
            {formatMessage({ id: 'no-search-results' })}{' '}
            <strong>{query}</strong>
          </div>
        )}
      </div>
    );
  };
  const renderInputComponent = inputProps => {
    return (
      <div className="flex items-center">
        <input
          {...inputProps}
          className={`w-full rounded p-2 bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700`}
        />
      </div>
    );
  };
  const handleSelect = (event, { suggestion }) => {
    history.push(`/${locale}/products/${suggestion.slug}/${suggestion.id}`);
  };

  return (
    <div
      className={`flex rounded items-center relative  bg-nav-cat-light text-nav-cat-text-light mx-4 flex-1  `}
    >
      <button className=" p-2   bg-nav-cat-light  ">
        <BiSearch className=" w-5 h-5" />
      </button>
      <span className="border-r"></span>
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
      {searchBarValue.length !== 0 && (
        <button
          onClick={() => {
            setNoSuggestions(false);
            setSearchBarValue('');
          }}
          className="transition duration-100 p-1 hover:shadow-sm hover:bg-gray-300 rounded"
        >
          <AiOutlineClose className="w-4 h-4" />
        </button>
      )}
      <div className="px-2 py-1">
        <Loader
          type="TailSpin"
          color="#b72b2b"
          height={20}
          width={20}
          visible={isLoading}
        />
      </div>
    </div>
  );
}
