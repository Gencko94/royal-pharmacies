import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function SecondSection({ categories }) {
  const { locale } = useIntl();

  return (
    <div
      className={`px-4 py-2 footer-site-map bg-first-nav-light text-first-nav-text-light `}
    >
      {categories &&
        categories.map(category => {
          return (
            category.type === 'category' && (
              <div key={category.id} className="grid mt-2  gap-1">
                <Link
                  to={`/${locale}/category/${category.category?.slug}/${category.category?.id}`}
                  className="text-lg  text-center font-semibold inline-block"
                >
                  {category.translation[locale].name}
                </Link>
                {category.children?.map(child => {
                  return (
                    child.type === 'category' && (
                      <Link
                        to={`/${locale}/category/${child.category?.slug}/${child.category?.id}`}
                        key={child.id}
                        className="text-sm  text-center inline-block"
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
