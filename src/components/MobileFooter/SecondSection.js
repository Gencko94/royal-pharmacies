import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function SecondSection({ categories }) {
  const { locale } = useIntl();

  return (
    <div className="px-4 py-2 footer-site-map__mobile  bg-gray-900 text-main-text">
      {categories &&
        categories.slice(0, 5).map(category => {
          return (
            category.type === 'category' && (
              <div key={category.id} className="grid mt-2  gap-1">
                <Link
                  to={`/${locale}/${category.category?.slug}`}
                  className="text-sm text-center font-semibold inline-block"
                >
                  {category.translation[locale].name}
                </Link>
                {category.children.map(child => {
                  return (
                    child.type === 'category' && (
                      <Link
                        key={child.id}
                        to={`/${locale}/${child.category?.slug}`}
                        className="text-xs text-center font-semibold inline-block"
                      >
                        {child.translation[locale].name}
                      </Link>
                    )
                  );
                })}
              </div>
            )
          );
        })}
    </div>
  );
}
