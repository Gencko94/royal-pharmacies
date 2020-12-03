import React from 'react';
import { useIntl } from 'react-intl';

export default function CategoryChildren({
  categoryInfo,
  categoryInfoLoading,
}) {
  const { locale } = useIntl();
  if (categoryInfoLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="category-children__grid ">
      {categoryInfo.children.map(child => {
        return (
          <div className="p-2 bg-cadet-blue rounded text-main-text text-center font-semibold ">
            {child.translation[locale].name}
          </div>
        );
      })}
    </div>
  );
}
