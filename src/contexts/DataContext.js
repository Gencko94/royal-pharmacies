import React from 'react';

import { useQuery, useQueryClient } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import {
  getAllCategories,
  getDeliveryCountries,
  getNavCategories,
  getSiteSettings,
} from '../Queries/Queries';
import { AuthProvider } from './AuthContext';

export const DataProvider = React.createContext();
export default function DataContextProvider({ children }) {
  const queryClient = useQueryClient();

  const localDeliveryCountry = localStorage.getItem('deliveryCountry');
  const [deliveryCountry, setDeliveryCountry] = React.useState(null);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const prefferedLanguage = localStorage.getItem('prefferedLanguage');
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  const { authenticationLoading } = React.useContext(AuthProvider);
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
    const visitedItems = JSON.parse(localStorage.getItem('browse-history'));
    const isItemInHistory = visitedItems.find(item => item.id === id);
    if (!isItemInHistory) {
      visitedItems.unshift({ id });
      localStorage.setItem('browse-history', JSON.stringify(visitedItems));
    }
  };

  const removeViewedItems = id => {
    let localVisited = localStorage.getItem('browse-history');
    let parsed = JSON.parse(localVisited);

    localVisited = parsed.filter(i => {
      return i.id !== id.toString();
    });

    localStorage.setItem('browse-history', JSON.stringify(localVisited));

    queryClient.setQueryData('viewedItems', prev => {
      return prev.filter(i => i.id !== id);
    });
  };

  const { data: categories, isLoading: categoriesLoading } = useQuery(
    'categories',
    getAllCategories,
    {
      retry: true,
      refetchOnWindowFocus: false,
      // enabled: !isTabletOrAbove,
    }
  );
  const { data: navCategories, isLoading: navCategoriesLoading } = useQuery(
    'nav-categories',
    getNavCategories,
    {
      retry: true,
      enabled: Boolean(isTabletOrAbove),
    }
  );
  const {
    data: deliveryCountries,
    isLoading: deliveryCountriesLoading,
    isIdle: deliveryCountriesIdle,
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
    enabled: Boolean(!authenticationLoading),
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
        deliveryCountriesIdle,
        setDeliveryCountry,
        language,
        handleLanguageChange,
        addViewedItems,
        removeViewedItems,
        searchBarValue,
        setSearchBarValue,
        settings,
        sideMenuOpen,
        setSideMenuOpen,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}
