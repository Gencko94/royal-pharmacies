import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function LeftSideCategories({
  categoryInfo,
  productsLoading,
  categoryInfoLoading,
  productsLength,
}) {
  const { formatMessage, locale } = useIntl();
  if (categoryInfoLoading || productsLoading) {
    return (
      <ContentLoader
        speed={2}
        viewBox="0 0 300 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"

        // rtl={locale === 'ar'}
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
        <rect x="0" y="40" rx="5" ry="5" width="100%" height="15" />
        <rect x="0" y="65" rx="5" ry="5" width="100%" height="15" />
        <rect x="0" y="90" rx="5" ry="5" width="100%" height="15" />
        <rect x="0" y="115" rx="5" ry="5" width="100%" height="15" />
      </ContentLoader>
    );
  }
  if (!categoryInfoLoading && !productsLoading && productsLength === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h1 className="text-xl font-semibold">
        {formatMessage({ id: 'categories' })}
      </h1>
      <hr className="my-2" />

      <div className="my-2">
        <div className="flex justify-between">
          <h1 className="font-semibold text-sm">
            {categoryInfo.title[locale].name}
          </h1>
        </div>
        {categoryInfo?.children.length !== 0 &&
          categoryInfo?.children.map((subCategory, i) => (
            <Link
              to={`/${locale}/${subCategory.slug}`}
              key={i}
              className="text-sm block hover:underline hover:text-blue-700"
            >
              {subCategory.translation[locale].name}
            </Link>
          ))}
      </div>
    </div>
  );
}
