import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function CategoryButton({ item, handleDropDownOpen }) {
  const { locale } = useIntl();
  return (
    <Link
      to={`/${locale}/${item.category.slug}`}
      id={`navButton${item.id}`}
      onMouseEnter={() => {
        handleDropDownOpen(item.id);
      }}
      className={`p-2  font-semibold cursor-pointer  hover:bg-second-nav-text-light`}
    >
      {item.category.translation[locale].name}
    </Link>
  );
}
