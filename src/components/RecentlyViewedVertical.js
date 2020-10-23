import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';

export default function RecentlyViewedVertical({ visitedItems }) {
  return (
    <div className="border rounded p-2 bg-gray-100">
      <h1 className="mb-1">Your recently visited items</h1>
      <hr />
      {visitedItems.slice(0, 4).map((item, i) => {
        return (
          <div key={i} className="recent-items__container mb-1 ">
            <img src={item.photos.small} alt={item.name} />
            <div className="text-sm">
              <h1 className="truncate ">{item.name}</h1>
              <Rating
                initialRating={Math.round(Math.random() * 5)}
                emptySymbol={<AiOutlineStar className="text-red-700" />}
                fullSymbol={<AiFillStar className="text-red-700" />}
                className="mr-2 pt-1"
              />
              <h1 className="text-green-700">{item.price} KD</h1>
              <button className="p-1 text-xs bg-blue-700 text-white rounded ">
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
