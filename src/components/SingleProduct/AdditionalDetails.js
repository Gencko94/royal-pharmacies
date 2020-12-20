import React from 'react';
import { useIntl } from 'react-intl';
import ItemDescription from './AdditionalDetails/ItemDescription';
import ItemReviews from './AdditionalDetails/ItemReviews';

export default function AdditionalDetails({
  reviews,
  reviewsLoading,
  detailsTab,
  setDetailsTab,
  averageRating,
  ratingCount,
  data,
}) {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={() => setDetailsTab(0)}
          className={`text-lg p-2  text-center font-semibold uppercase  ${
            detailsTab === 0 ? 'border-b-4  border-main-color' : 'text-gray-600'
          } `}
        >
          {formatMessage({ id: 'additional-details__item-details' })}
        </button>

        <button
          onClick={() => setDetailsTab(1)}
          className={`text-lg p-2 mx-3 text-center font-semibold uppercase  ${
            detailsTab === 1 ? 'border-b-4 border-main-color' : 'text-gray-600'
          } `}
        >
          {formatMessage({ id: 'additional-details__item-reviews' })}
        </button>
      </div>
      <div className="py-2">
        {detailsTab === 0 && <ItemDescription data={data} />}

        {detailsTab === 1 && (
          <ItemReviews
            reviews={reviews}
            reviewsLoading={reviewsLoading}
            ratingCount={ratingCount}
            averageRating={averageRating}
          />
        )}
      </div>
    </div>
  );
}
