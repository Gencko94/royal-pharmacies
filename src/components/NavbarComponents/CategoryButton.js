import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function CategoryButton({ item, handleDropDownOpen }) {
  const { locale } = useIntl();
  return (
    <Link
      to={`/${locale}/categories/${item.slug}`}
      id={`navButton${item.category}`}
      onMouseEnter={() => {
        handleDropDownOpen(item.id);
      }}
      className={`p-3  font-semibold cursor-pointer  hover:bg-second-nav-text-light
      `}
    >
      {item.translation[locale].name}
    </Link>
  );
}
