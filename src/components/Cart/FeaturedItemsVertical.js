import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';
import { getBestSellers } from '../../Queries/Queries';

export default function FeaturedItemsVertical() {
  const { formatMessage } = useIntl();
  const { data, isLoading } = useQuery('featuredItemsVertical', async () => {
    return await getBestSellers();
  });
  const { locale } = useIntl();

  if (isLoading)
    return (
      <div className="border rounded p-2 bg-gray-100">
        <ContentLoader
          speed={3}
          viewBox="0 0 400 680"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          rtl={locale === 'ar'}
          style={{ alignSelf: 'flex-start' }}
        >
          <rect x="0" y="0" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="0" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="40" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="80" rx="5" ry="5" width="100%" height="38" />

          <rect x="0" y="140" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="140" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="180" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="220" rx="5" ry="5" width="100%" height="38" />

          <rect x="0" y="280" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="280" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="320" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="360" rx="5" ry="5" width="100%" height="38" />
          <rect x="0" y="420" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="420" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="460" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="500" rx="5" ry="5" width="100%" height="38" />

          <rect x="0" y="560" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="560" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="600" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="640" rx="5" ry="5" width="100%" height="38" />
        </ContentLoader>
      </div>
    );
  return (
    <div className="border rounded p-2 bg-gray-100 border-b">
      <div className="flex items-center justify-between">
        <h1 className="">{formatMessage({ id: 'featured-items' })}</h1>
        <Link
          className="p-1 text-xs rounded bg-main-color text-main-text"
          to={`/${locale}/vieweditems`}
        >
          {formatMessage({ id: 'seeAll' })}
        </Link>
      </div>
      <div className="pt-2">
        {data.slice(0, 5).map(item => {
          return (
            <div key={item.id} className="recent-items__container mb-1">
              <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
                <LazyImage
                  src={item.image?.link}
                  alt={item.translation[locale].title}
                  pb="calc(100% * 286/210)"
                  origin="small"
                />
              </Link>
              <div className="text-sm">
                <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
                  <h1 className="text-clamp-2">
                    {item.translation[locale].title}
                  </h1>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
