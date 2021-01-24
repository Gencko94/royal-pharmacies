import React from 'react';
import { useQuery } from 'react-query';
import { getFooterData } from '../Queries/Queries';

import FirstSection from './Footer/FirstSection';
import SecondSection from './Footer/SecondSection';
import ThirdSection from './Footer/ThirdSection';
export default function Footer() {
  const { data } = useQuery('footerCategories', getFooterData, {
    refetchOnWindowFocus: false,
    retry: true,
  });
  return (
    <div className="w-full">
      <FirstSection />
      <SecondSection categories={data?.categories} />
      <ThirdSection pages={data?.pages} />
    </div>
  );
}
