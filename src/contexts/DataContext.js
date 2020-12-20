import React from 'react';

import { useQuery } from 'react-query';
import { getAllCategories, getDeliveryCountries } from '../Queries/Queries';
export const DataProvider = React.createContext();
export default function DataContextProvider({ children }) {
  const localDeliveryCountry = localStorage.getItem('deliveryCountry');
  const [deliveryCountry, setDeliveryCountry] = React.useState(null);
  const [isLightTheme, setLightTheme] = React.useState(true);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const prefferedLanguage = localStorage.getItem('prefferedLanguage');

  const [language, setLanguage] = React.useState(() => {
    if (prefferedLanguage) {
      return prefferedLanguage;
    } else {
      return 'en';
    }
  });

  const handleLanguageChange = lang => {
    localStorage.setItem('prefferedLanguage', lang);
    setLanguage(lang);
  };

  const addViewedItems = id => {
    const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
    const isItemInHistory = visitedItems.find(item => item.id === id);
    if (!isItemInHistory) {
      visitedItems.unshift({ id });
      localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
      // setViewedItems(visitedItems);
    }
  };
  const removeViewedItem = id => {
    return new Promise(resolve => {
      setTimeout(() => {
        // const updated = viewedItems.filter(i => i !== id);
        // setViewedItems(updated);
        // localStorage.setItem('visitedItems', JSON.stringify(updated));
        resolve({
          message: 'ok',
          id,
        });
      }, 1000);
    });
  };

  const countries = ['usa', 'uk', 'jp', 'korea', 'kuwait', 'qatar', 'uae'];

  const { data: categories, isLoading: categoriesLoading } = useQuery(
    'categories',
    getAllCategories,
    {
      retry: true,
      refetchOnWindowFocus: false,
    }
  );
  const {
    data: deliveryCountries,
    isLoading: deliveryCountriesLoading,
  } = useQuery('delivery-countries', getDeliveryCountries, {
    retry: true,
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setDeliveryCountry(
        data.find(
          country =>
            country.translation.en.name ===
            JSON.parse(localDeliveryCountry).deliveryCountry.en
        )
      );
    },
  });
  return (
    <DataProvider.Provider
      value={{
        categories: categories,
        categoriesLoading: categoriesLoading,
        deliveryCountry: deliveryCountry,
        deliveryCountries,
        deliveryCountriesLoading,

        setDeliveryCountry,
        countries,
        isLightTheme,
        setLightTheme,
        language,
        handleLanguageChange,

        addViewedItems,
        removeViewedItem,
        searchBarValue,
        setSearchBarValue,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}
