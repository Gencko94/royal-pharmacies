import React from 'react';
import { useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';

import { DataProvider } from '../../contexts/DataContext';
import NoOrders from './MyOrders/NoOrders';
import Orders from './MyOrders/Orders';

export default function MyOrders({ isLightTheme }) {
  const { getOrderedItems } = React.useContext(DataProvider);
  const { data, isLoading } = useQuery('orders', async () => {
    const res = await getOrderedItems();

    return res;
  });
  if (isLoading)
    return (
      <div
        className={`rounded-lg overflow-hidden ${
          isLightTheme
            ? 'shadow-itemsSlider-shallow'
            : 'shadow-itemsSlider-wide'
        }`}
      >
        <div className="flex h-full justify-center items-center">
          <BeatLoader size={10} color={'#b72b2b'} />
        </div>
      </div>
    );
  return (
    <div
      className={`rounded-lg overflow-hidden ${
        isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider-wide'
      }`}
    >
      {data.length === 0 && <NoOrders isLightTheme={isLightTheme} />}
      {data.length !== 0 && <Orders data={data} isLightTheme={isLightTheme} />}
    </div>
  );
}
