import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function AllCategoriesButton({
  item,
  handleMenuClose,
  handleMegaMenuOpen,
  selectedCategory,
  isHovering,
}) {
  const { locale } = useIntl();
  React.useEffect(() => {
    if (isHovering) {
      handleMegaMenuOpen(item.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering]);
  return (
    <Link
      to={`/${locale}/category/${item.slug}/${item.id}`}
      onClick={() => handleMenuClose()}
      onMouseEnter={() => handleMegaMenuOpen(item.id)}
      className={`px-4 py-2  block ${
        selectedCategory.id === item.id && 'bg-white'
      }`}
      style={{ fontWeight: 800 }}
    >
      {item.translation[locale].name}
    </Link>
  );
}
