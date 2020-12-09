import React from 'react';
import ContentLoader from 'react-content-loader';

export default function AvatarLoader() {
  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 250 98"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <ellipse x="48" y="48" rx="50" ry="50" width="30" height="46" />
      <rect x="80" y="25" rx="5" ry="5" width="140" height="25" />
      <rect x="80" y="55" rx="5" ry="5" width="140" height="25" />
      <rect x="80" y="85" rx="5" ry="5" width="140" height="25" />
    </ContentLoader>
  );
}
