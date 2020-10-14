import React from 'react'
import { DataProvider } from '../../contexts/DataContext'

export default function CartItem({item,}) {
    const {EditItemFromCart,removeItemFromCart} = React.useContext(DataProvider)
    return (
        <>
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
              In Stock
            </h1>
            <div className=" mr-2 flex items-center mb-1">
              <h1 className=" mr-2 font-semibold">Quantity : </h1>
              <select
                value={item.quantity}
                onChange={e => EditItemFromCart(e.target.value, item)}
                className="pr-8 py-0 form-select border-gray-400 border rounded"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="flex text-sm  items-center ">
              <button
                onClick={() => removeItemFromCart(item)}
                className="p-1 text-red-700 font-semibold hover:underline"
              >
                Remove from cart
              </button>
              <button
                onClick={() => removeItemFromCart(item)}
                className="p-1 text-blue-700 font-semibold hover:underline"
              >
                Add to wishlist
              </button>
            </div>
          </div>
          <div className="text-center font-bold">
            {item.price * item.quantity} KD
          </div>
        </div>
        <hr />
      </>
    )
}
