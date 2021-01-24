import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Avatar from './Avatar';
export default function SideTabs() {
  const { formatMessage } = useIntl();

  const options = [
    { url: '', name: 'my-profile' },
    { url: '/addresses', name: 'my-addresses' },
    { url: '/orders', name: 'my-orders' },
  ];

  const { url } = useRouteMatch();
  return (
    <motion.div initial={false} layout className=" flex flex-col self-start ">
      <Avatar />

      <div
        className={`flex flex-col rounded-lg overflow-hidden shadow-itemsSlider-shallow `}
      >
        {options.map(option => (
          <div key={option.name}>
            <NavLink
              exact
              className="w-full text-lg font-semibold px-6 py-4 inline-block text-center "
              activeClassName={`font-bold bg-main-color text-main-text transition duration-100 `}
              to={`${url}${option.url}`}
            >
              {formatMessage({ id: option.name })}
            </NavLink>

            <hr />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
