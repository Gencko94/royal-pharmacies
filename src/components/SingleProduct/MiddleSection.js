import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { useMediaQuery } from 'react-responsive';

export default function MiddleSection({ data }) {
  const isDesktop = useMediaQuery({ query: '(min-width:1070px)' });
  return (
    <div className="flex flex-col w-full ">
      <h1 className="font-semibold text-xl">{data.name}</h1>

      <div className="flex items-center ">
        <Rating
          initialRating={4.5}
          emptySymbol={<AiOutlineStar className="text-red-700" />}
          fullSymbol={<AiFillStar className="text-red-700" />}
          className="mr-2 pt-1"
        />
        <h1 className="text-sm">36 Ratings</h1>
      </div>
      <h1 className=" font-semibold mb-1 text-green-700">In Stock</h1>
      <hr />
      <div className=" mb-1   font-semibold">
        <h1 className=" mr-2 ">
          Price :{' '}
          <span className=" text-xl font-bold text-red-700">
            {data.price} KD
          </span>{' '}
        </h1>
      </div>

      <ul
        className={`${
          isDesktop ? 'text-sm' : 'text-sm'
        } bg-gray-200  py-2 list-disc pl-4`}
      >
        <li>
          The nephilim Edition contains all the loot from the Collector's
          Edition as well as the Limited Edition Darksiders: the forbidden land
          board game!{' '}
        </li>
        <li>
          Blast Angels and demons as the gunslinging Horseman strife, playable
          for the first time
        </li>
        <li>
          Swap between the powerful swordsman war and strife instantly in
          frenetic, single-player gameplay
        </li>
        <li>
          Explore the epic world of Darksiders and wreak havoc with a friend in
          two-player cooperative mode{' '}
        </li>
        <li>
          Experience a brand new story campaign that takes place before the
          original Darksiders, exploring the origin of the Seven seals{' '}
        </li>
      </ul>
    </div>
  );
}
