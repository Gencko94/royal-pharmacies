import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import theme from './theme.module.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useHistory } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

let cancelToken;
export default function MobileSearchbar({ windowScrolled }) {
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const { formatMessage, locale } = useIntl();
  const [noSuggestions, setNoSuggestions] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const getSuggestionValue = suggestion => {
    return suggestion.small_translation[locale].title;
  };
  React.useEffect(() => {
    if (windowScrolled) {
      setData([]);
      setSearchBarValue('');
      setNoSuggestions(false);
    }
  }, [windowScrolled]);
  const history = useHistory();
  const renderSuggestion = (suggestion, { isHighlighted }) => {
    return (
      <div className={`p-2 ${isHighlighted && 'bg-gray-300 rounded'}`}>
        {suggestion.small_translation[locale].title}
      </div>
    );
  };
  const onSuggestionsFetchRequested = async ({ value }) => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const inputThreshold = inputValue.length > 2;
    if (inputLength < 2) return [];
    setLoading(true);
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_MAIN_URL}/search-products`,
        params: { value: value, page: 1 },
        cancelToken: cancelToken.token,
      });
      if (res) {
        setData(res.data.data.data.slice(0, 7));
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
        className="absolute left-0 bg-body-light w-full rounded"
        style={{ top: '110%' }}
      >
        {children}
        {data?.length !== 0 && (
          <button
            onClick={() => {
              history.push(`/${locale}/search/q=${query}`);
              setData([]);
            }}
            className="p-2 bg-gray-400 w-full transition duration-75"
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
      <input
        {...inputProps}
        className={`w-full p-2 bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700`}
      />
    );
  };
  const handleSelect = (event, { suggestion }) => {
    history.push(`/${locale}/c/${suggestion.id}`);
  };
  return (
    <div
      className={`bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700 rounded flex items-center overflow-hidden flex-1 `}
    >
      <div className={`bg-nav-cat-light text-nav-cat-text-light p-1  `}>
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
      {searchBarValue.length !== 0 && (
        <div className="p-1">
          <button
            onClick={() => {
              setNoSuggestions(false);
              setSearchBarValue('');
            }}
            className=" transition duration-100 flex items-center justify-center p-1 hover:shadow-sm hover:bg-gray-300 rounded"
          >
            <AiOutlineClose className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="p-1">
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={30}
          width={30}
          visible={isLoading}
        />
      </div>
    </div>
  );
}
