import React from 'react';

import { queryCache, useQuery } from 'react-query';
import {
  getAllCategories,
  getDeliveryCountries,
  getNavCategories,
  getSiteSettings,
} from '../Queries/Queries';
export const DataProvider = React.createContext();
export default function DataContextProvider({ children }) {
  const localDeliveryCountry = localStorage.getItem('deliveryCountry');
  const [deliveryCountry, setDeliveryCountry] = React.useState(null);
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
    }
  };

  const removeViewedItems = id => {
    let localVisited = localStorage.getItem('visitedItems');
    let parsed = JSON.parse(localVisited);

    localVisited = parsed.filter(i => {
      return i.id !== id.toString();
    });

    localStorage.setItem('visitedItems', JSON.stringify(localVisited));

    queryCache.setQueryData('viewedItems', prev => {
      return prev.filter(i => i.id !== id);
    });
  };

  const { data: categories, isLoading: categoriesLoading } = useQuery(
    'categories',
    getAllCategories,
    {
      retry: true,
      refetchOnWindowFocus: false,
    }
  );
  const { data: navCategories, isLoading: navCategoriesLoading } = useQuery(
    'nav-categories',
    getNavCategories,
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
  const { data: settings } = useQuery('settings', getSiteSettings, {
    retry: true,
    refetchOnWindowFocus: false,
  });
  return (
    <DataProvider.Provider
      value={{
        categories,
        navCategories,

        categoriesLoading,
        navCategoriesLoading,
        deliveryCountry,
        deliveryCountries,
        deliveryCountriesLoading,
        setDeliveryCountry,
        language,
        handleLanguageChange,
        addViewedItems,
        removeViewedItems,
        searchBarValue,
        setSearchBarValue,
        settings,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}
