import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
export default function NavIcons({ color = 'nav-secondary' }) {
  const { cartItems, isLightTheme } = React.useContext(DataProvider);
  const history = useHistory();
  return (
    <div
      className={`flex items-center justify-between  text-${color}`}
      style={{ flexBasis: '15%' }}
    >
      <button
        onClick={() => history.push('/cart')}
        className="flex p-1  items-center font-semibold   relative"
      >
        <h1 className="mr-2 text-sm ">Cart</h1>
        <HiOutlineShoppingBag className="w-30p h-30p " />
        <span
          className={`h-4 w-4  font-bold rounded-full absolute top-0 right-0 text-xs grid place-items-center ${
            isLightTheme
              ? 'bg-second-nav-text-light text-second-nav-light'
              : 'bg-second-nav-dark text-second-nav-text-dark'
          }`}
        >
          {cartItems.length}
        </span>
      </button>

      <button className="p-1 flex items-center font-semibold  ">
        <h1 className="mr-2 text-sm ">Wishlist</h1>
        <AiOutlineHeart className="w-30p h-30p" />
      </button>
    </div>
  );
}
