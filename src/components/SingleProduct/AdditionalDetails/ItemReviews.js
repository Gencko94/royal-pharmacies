import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import moment from 'moment';
import 'moment/locale/ar';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function ItemReviews({ reviews, reviewsLoading }) {
  const { formatMessage, locale } = useIntl();
  moment.locale(locale);
  const resolvePlural = () => {
    switch (reviews.length) {
      case 1:
        return formatMessage({ id: 'one-review' });

      case 2:
        return formatMessage({ id: 'two-reviews' });

      case reviews.length > 10:
        return formatMessage({ id: 'one-review' });

      default:
        return formatMessage({ id: 'reviews' });
    }
  };
  if (reviewsLoading) {
    return (
      <div
        className="w-full flex flex-col items-center justify-center "
        style={{ height: '160px' }}
      >
        <h1 className="font-semibold mb-4 text-lg">
          {formatMessage({ id: 'loading-reviews' })}
        </h1>
        <Loader
          type="TailSpin"
          color="#b72b2b"
          height={50}
          width={50}
          visible={true}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center flex-wrap mb-2">
        <h1 className="font-semibold text-xl">
          {formatMessage({ id: 'single-product-average-rating' })}:
        </h1>
        <div className="mx-2">
          <Rating
            initialRating={2.5}
            readonly
            emptySymbol={<AiOutlineStar className="text-main-color h-6 w-6" />}
            fullSymbol={<AiFillStar className="text-main-color h-6 w-6" />}
            className=" pt-1"
          />
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <h1>{reviews.length > 2 && reviews.length}</h1>
          <h1 className="mx-1">{resolvePlural()}</h1>
        </div>
      </div>

      {!reviewsLoading && reviews.length !== 0 && (
        <div className="grid grid-cols-1 gap-2 p-3 bg-gray-100 rounded">
          {reviews.map((review, i) => {
            return (
              <div key={review.id}>
                <div>
                  <h1 className="font-semibold">{review.customer.name}</h1>
                </div>
                <div className="flex items-center">
                  <Rating
                    initialRating={review.rating}
                    readonly
                    emptySymbol={<AiOutlineStar className="text-main-color" />}
                    fullSymbol={<AiFillStar className="text-main-color" />}
                    className=" pt-1"
                  />

                  <h1 className="text-gray-600 text-sm mx-1">
                    {moment(review.created_at).fromNow()}
                  </h1>
                </div>
                <div className="mb-2">
                  <p className="">{review.review}</p>
                </div>
                {i !== reviews.length - 1 && <hr className="mt-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
