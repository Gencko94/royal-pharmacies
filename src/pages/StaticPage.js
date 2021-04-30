import React from 'react';
import { useQuery } from 'react-query';
import { Redirect, useParams } from 'react-router-dom';
import { getStaticPage } from '../Queries/Queries';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
export default function StaticPage() {
  const { page } = useParams();
  const { data, isLoading, error } = useQuery(
    ['static-page', page],
    getStaticPage
  );

  const { locale } = useIntl();
  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-2 flex items-center justify-center">
        <Helmet>
          <title>Royal Pharmacies</title>
        </Helmet>
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={isLoading}
        />
      </div>
    );
  }
  if (error) {
    if (error.response.data.redirect)
      return <Redirect to={`/${locale}/page/404`} />;
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-2 overflow-hidden">
        <Helmet>
          <title>{`${data[locale].title}`}</title>
        </Helmet>
        <div className="p-10">
          <h1 className="text-3xl text-center">{data[locale].title}</h1>
        </div>
        {data[locale].description && (
          <div className="my-1">
            <div
              className={`inner_html ${locale}`}
              dangerouslySetInnerHTML={{
                __html: data[locale].description,
              }}
            ></div>
          </div>
        )}
      </div>
    </Layout>
  );
}
