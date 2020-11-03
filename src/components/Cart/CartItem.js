import React from 'react';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';

export default function CartItem({ item, handleRemoveItem }) {
  const { EditItemFromCart } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
  return (
    <div className="cart__item py-2">
      <img
        className=""
        style={{ maxHeight: '', maxWidth: '' }}
        src={item.photo}
        alt={item.name}
      />
      <div className="">
        <h1 className="font-semibold ">{item.name}</h1>
        <h1 className=" font-semibold text-sm mb-1 text-green-700">
          {formatMessage({ id: 'in-stock' })}
        </h1>
        <div className="flex items-center mb-2">
          <h1 className=" font-semibold">
            {formatMessage({ id: 'quantity' })}
          </h1>
          <select
            value={item.quantity}
            onChange={e => EditItemFromCart(e.target.value, item)}
            className="pr-8 py-0 mx-2 form-select border-gray-400 border rounded"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className="flex text-sm  items-center mb-2 ">
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="p-1 bg-main-color text-main-text font-semibold rounded"
          >
            {formatMessage({ id: 'remove-from-cart' })}
          </button>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="p-1 bg-blue-700 text-main-text font-semibold rounded mx-2"
          >
            {formatMessage({ id: 'add-to-wishlist' })}
          </button>
        </div>
      </div>
      <div className="text-center font-bold">
        {item.price * item.quantity} KD
      </div>
    </div>
  );
}
