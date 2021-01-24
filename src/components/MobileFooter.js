import React from 'react';
import { useQuery } from 'react-query';
import { getFooterData } from '../Queries/Queries';

import FirstSection from './MobileFooter/FirstSection';
import SecondSection from './MobileFooter/SecondSection';
import ThirdSection from './MobileFooter/ThirdSection';

export default function MobileFooter() {
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
