import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import miniBanner from '../../assets/banners/miniBanner.gif';
export default function MiddleSection({ data, deliveryCountry }) {
  const { formatMessage } = useIntl();
  return (
    <div className="flex flex-col w-full self-start ">
      <h1 className="font-semibold text-xl">{data.name}</h1>
      <div className="flex items-center ">
        <Rating
          initialRating={4.5}
          emptySymbol={<AiOutlineStar className="text-red-700" />}
          fullSymbol={<AiFillStar className="text-red-700" />}
          className=" pt-1"
        />
        <h1 className="text-sm mx-2">36 {formatMessage({ id: 'ratings' })}</h1>
      </div>
      <h1 className=" font-semibold mb-1 text-green-700">
        {formatMessage({ id: 'in-stock' })}
      </h1>
      <h1 className="text-sm   mb-1 text-gray-700">
        {formatMessage({ id: 'model-number' })} : NK2O-4952
      </h1>
      <hr className="my-2" />
      <div className="flex items-start py-1">
        <div className=" flex-1 text-sm  font-bold">
          <div className=" flex items-center ">
            <h1>{formatMessage({ id: 'price-before' })} :</h1>
            <h1 className=" mx-2 text-base italic  line-through text-gray-700">
              {data.priceBefore} KD
            </h1>{' '}
          </div>
          <div className="">
            <div className="flex items-center flex-1">
              <h1 className="    ">{formatMessage({ id: 'price-now' })} : </h1>
              <h1 className=" text-xl mx-2  text-red-700">
                {data.price} KD
              </h1>{' '}
              <h1 className=" font-normal  text-gray-700">
                ({formatMessage({ id: 'vat-inclusive' })})
              </h1>
            </div>
            <div className="flex items-center   ">
              <h1>{formatMessage({ id: 'you-save' })} :</h1>
              <h1 className="text-base text-red-700 mx-2">18%</h1>
            </div>
          </div>
        </div>
        <div className="p-1 text-xs text-main-text bg-green-800 rounded-sm">
          <h1>{formatMessage({ id: 'free-delivery-to' })} Kuwait</h1>
        </div>
      </div>
      <hr className="my-2" />
      <img src={miniBanner} alt="offer" className="mt-2" />

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
