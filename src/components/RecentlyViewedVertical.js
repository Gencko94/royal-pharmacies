import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import Rating from 'react-rating';
import { DataProvider } from '../contexts/DataContext';

export default function RecentlyViewedVertical({ visitedItems }) {
  const { allItems } = React.useContext(DataProvider);
  const [data, setData] = React.useState([]);
  const { formatMessage, locale } = useIntl();
  React.useEffect(() => {
    let iDs = visitedItems.map(item => item.id);
    let visited = allItems.filter(item => iDs.includes(item.id));
    setData(visited);
  }, [allItems, visitedItems]);
  return (
    <div className="border rounded p-2 bg-gray-100">
      <h1 className="mb-1">
        {formatMessage({ id: 'your-recently-visited-items' })}
      </h1>
      <hr />
      {data.slice(0, 5).map((item, i) => {
        return (
          <div key={i} className="recent-items__container mb-1 ">
            <a
              title={item.name}
              className="hover:underline"
              href={`/${locale}/${item.category.replace(
                /\s|%|,/g,
                '-'
              )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
            >
              <img src={item.photos.small} alt={item.name} />
            </a>
            <div className="text-sm">
              <a
                title={item.name}
                className="hover:underline"
                href={`/${locale}/${item.category.replace(
                  /\s|%|,/g,
                  '-'
                )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
              >
                <MultiClamp
                  className="text-sm  font-semibold"
                  clamp={2}
                  ellipsis="..."
                >
                  {item.name}
                </MultiClamp>
              </a>
              <Rating
                initialRating={Math.round(Math.random() * 5)}
                emptySymbol={<AiOutlineStar className="text-red-700" />}
                fullSymbol={<AiFillStar className="text-red-700" />}
                className="mr-2 pt-1"
              />
              <h1 className="text-green-700">{item.price} KD</h1>
              {/* <button className="p-1 text-xs bg-blue-700 text-white rounded ">
                Add to cart
              </button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
