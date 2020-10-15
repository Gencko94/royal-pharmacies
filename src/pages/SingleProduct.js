import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';

import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
import ImageZoom from '../components/SingleProduct/ImageZoom';
import MiddleSection from '../components/SingleProduct/MiddleSection';
import RightSection from '../components/SingleProduct/RightSection';
import RelatedItems from '../components/SingleProduct/RelatedItems';

export default function SingleProduct({
  match: {
    params: { id },
  },
}) {
  const { bestSeller, deliveryCountry } = React.useContext(DataProvider);
  const data = bestSeller.filter(item => item.id === id);

  const [detailsTab, setDetailsTab] = React.useState(0);

  React.useEffect(() => {
    // Add item to localStorage //
    const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
    const isItemInHistory = visitedItems.find(item => item.id === data[0].id);
    if (isItemInHistory !== undefined) {
      return;
    } else {
      visitedItems.push(data[0]);
      localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
    }
  });
  return (
    <div className=" px-4 ">
      <div className="mx-auto" style={{ maxWidth: '1560px ' }}>
        <Breadcrumbs />

        <div className="details__container">
          <div className="relative ">
            <ImageZoom data={data[0]} />
          </div>

          <MiddleSection data={data[0]} deliveryCountry={deliveryCountry} />
          <RightSection data={data[0]} />
        </div>
        <div id="details" className="py-2 mb-2">
          <h1 className="text-xl font-semibold mb-1 px-2">
            Additional Details
          </h1>
          <div className="flex justify-center mb-2">
            <button
              onClick={() => setDetailsTab(0)}
              className={`text-lg py-2 flex-1 text-center   ${
                detailsTab === 0 && 'border-red-700 border-b-2 text-red-700'
              }   bg-gray-400`}
            >
              Description
            </button>

            <button
              onClick={() => setDetailsTab(1)}
              className={`text-lg py-2 flex-1 text-center   ${
                detailsTab === 1 && 'border-red-700 border-b-2 text-red-700'
              }   bg-gray-400`}
            >
              Specifications
            </button>
            <button
              onClick={() => setDetailsTab(2)}
              className={`text-lg py-2 flex-1 text-center   ${
                detailsTab === 2 && 'border-red-700 border-b-2 text-red-700'
              }   bg-gray-400`}
            >
              Reviews
            </button>
          </div>
          <div className="px-2 text-sm">{data[0].description}</div>
        </div>
        <RelatedItems data={bestSeller} />
      </div>
    </div>
  );
}
