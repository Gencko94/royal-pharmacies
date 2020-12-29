import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getFooterCategories } from '../../Queries/Queries';

export default function SecondSection() {
  const { locale } = useIntl();
  const { data } = useQuery('footerCategories', getFooterCategories);
  return (
    <div
      className={`px-4 py-2 footer-site-map bg-first-nav-light text-first-nav-text-light `}
    >
      {data &&
        data.map(item => {
          return (
            <div key={item.id} className="grid mt-2  gap-1">
              <Link
                to={`/${locale}/${item.slug}`}
                className="text-lg font-semibold inline-block"
              >
                {item.translation[locale].name}
              </Link>
              {item.children.map(sub => {
                return (
                  <Link
                    to={`/${locale}/${sub.slug}`}
                    key={sub.id}
                    className="text-sm inline-block"
                  >
                    {sub.translation[locale].name}
                  </Link>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
