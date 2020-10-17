import React from 'react';
import ContentLoader from 'react-content-loader';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import miniBanner from '../../assets/banners/miniBanner.gif';
export default function MiddleSection({ data, deliveryCountry }) {
  return (
    <div className="flex flex-col w-full ">
      {!data && (
        <ContentLoader
          speed={2}
          viewBox="0 0 550 480"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="40" rx="5" ry="5" width="80%" height="25" />
          <rect x="0" y="80" rx="5" ry="5" width="60%" height="25" />
          <rect x="0" y="120" rx="5" ry="5" width="40%" height="25" />
          <rect x="0" y="160" rx="5" ry="5" width="20%" height="25" />
          <rect x="0" y="200" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="220" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="260" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="300" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="340" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="360" rx="5" ry="5" width="100%" height="120" />
        </ContentLoader>
      )}
      {data && (
        <>
          {' '}
          <h1 className="font-semibold text-xl mb-1">{data.name}</h1>
          <div className="flex items-center ">
            <Rating
              initialRating={4.5}
              emptySymbol={<AiOutlineStar className="text-red-700" />}
              fullSymbol={<AiFillStar className="text-red-700" />}
              className="mr-2 pt-1 mb-1"
            />
            <h1 className="text-sm">36 Ratings</h1>
          </div>
          <h1 className=" font-semibold mb-1 text-green-700">In Stock</h1>
          <h1 className="text-sm   mb-1 text-gray-700">
            Model Number : NK2O-4952
          </h1>
          <hr className="my-2" />
          <div className=" mb-1 text-sm  font-bold">
            <h1 className=" ">
              Price Before :{' '}
              <span className=" text-base italic  line-through text-gray-700">
                {data.priceBefore} KD
              </span>{' '}
            </h1>
            <div className="flex">
              <h1 className=" mr-5   ">
                Price Now :{' '}
                <span className=" text-xl  text-red-700">{data.price} KD</span>{' '}
                <span className=" font-normal  text-gray-700">
                  (VAT Inclusive)
                </span>{' '}
              </h1>
              <button
                className={`py-0 px-2 text-sm bg-green-200 rounded font-semibold`}
              >
                Free Delivery To {deliveryCountry}
              </button>
            </div>
            <h1 className="   ">
              You Save : <span className=" text-xl  text-red-700">18%</span>{' '}
            </h1>
          </div>
          <hr className="my-2" />
          <img src={miniBanner} alt="offer" className="mt-2" />
        </>
      )}
      {/* <ul
        className={`${
          isDesktop ? 'text-sm' : 'text-sm'
        } bg-gray-200  py-2 my-2 list-disc pl-4`}
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
      </ul> */}
    </div>
  );
}
