import React from 'react';
import { useIntl } from 'react-intl';

export default function CartItemMobile({
  item,
  handleRemoveItem,
  EditItemFromCart,
}) {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className=" py-2 cart__item-mobile">
        <img
          className=""
          style={{ maxHeight: '', maxWidth: '' }}
          src={item.photo}
          alt={item.name}
        />
        <div className="text-sm">
          <h1 className="font-semibold ">{item.name}</h1>
          <h1 className=" font-semibold text-green-700">
            {formatMessage({ id: 'in-stock' })}
          </h1>
          <div className="text-red-700 font-bold text-base">
            {item.price * item.quantity} KD
          </div>
          <div className=" flex items-center ">
            <h1 className=" font-semibold">
              {formatMessage({ id: 'quantity' })} :{' '}
            </h1>
            <select
              value={item.quantity}
              onChange={e => EditItemFromCart(e.target.value, item)}
              className="pr-8 mx-2 py-1 form-select border-gray-400 border rounded"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => handleRemoveItem(item.id)}
          className="py-1 px-2 text-sm bg-main-color text-main-text rounded  font-semibold "
        >
          {formatMessage({ id: 'remove-from-cart' })}
        </button>
        <button
          onClick={() => handleRemoveItem(item.id)}
          className="py-1 px-2 text-sm bg-blue-600 text-main-text  rounded font-semibold mx-2  "
        >
          {formatMessage({ id: 'add-to-wishlist' })}
        </button>
      </div>
      <hr />
    </>
  );
}
