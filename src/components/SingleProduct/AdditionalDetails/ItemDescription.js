import React from 'react';
import { useIntl } from 'react-intl';

export default function ItemDescription({ data }) {
  const { locale, formatMessage } = useIntl();
  return (
    <div className="overflow-hidden">
      {data.full_translation[locale].description && (
        <div className="my-1">
          <h1 className="text-center text-xl font-semibold my-1 mb-1 p-1 border-b">
            {formatMessage({ id: 'additional-details__item-description' })}
          </h1>
          <div
            className="inner_html"
            dangerouslySetInnerHTML={{
              __html: data.full_translation[locale].description,
            }}
          ></div>
        </div>
      )}
      {data.full_translation[locale].features && (
        <div className="my-1">
          <h1 className="text-center text-xl font-semibold my-1 mb-1 p-1 border-b">
            {formatMessage({ id: 'additional-details__item-features' })}
          </h1>
          <div
            className="inner_html"
            dangerouslySetInnerHTML={{
              __html: data.full_translation[locale].features,
            }}
          ></div>
        </div>
      )}
      {data.full_translation[locale].materials && (
        <div className="my-1">
          <h1 className="text-center text-xl font-semibold my-1 mb-1 p-1 border-b">
            {formatMessage({ id: 'additional-details__item-materials' })}
          </h1>
          <div
            className="inner_html"
            dangerouslySetInnerHTML={{
              __html: data.full_translation[locale].materials,
            }}
          ></div>
        </div>
      )}

      {!data.full_translation[locale].materials &&
        !data.full_translation[locale].description &&
        !data.full_translation[locale].features && (
          <div className="flex p-6 items-center text-center justify-center text-base flex-col">
            <h1 className="text-xl mb-2 ">
              {formatMessage({ id: 'no-item-details-available' })}
            </h1>
          </div>
        )}
    </div>
  );
}
