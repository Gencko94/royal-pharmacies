import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Ink from 'react-ink';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function SideMenuCategories({
  categories,
  subCategory,
  secondSubPage,
  handleHideCategories,
  handleClickBackSecond,
  handleClickNextFirst,
  handleClickNextSecond,
}) {
  const { formatMessage, locale } = useIntl();
  return (
    <>
      <div
        className="sidebar-page"
        style={{
          maxHeight: 'calc(-160px + 100vh)',
          overflowY: 'auto',
          overFlowx: 'hidden',
        }}
      >
        <div className="p-3 font-semibold justify-between flex items-center">
          <button
            className="relative rounded-full p-1"
            onClick={handleHideCategories}
          >
            <Ink />
            {locale === 'ar' ? (
              <BsChevronRight className="w-5 h-5" />
            ) : (
              <BsChevronLeft className="w-5 h-5" />
            )}
          </button>
          <h1 className="flex-1 text-center">
            {formatMessage({ id: 'all-categories' })}
          </h1>
        </div>
        <hr />
        {categories.map((category, i) => {
          return (
            <button
              onClick={() => handleClickNextFirst(i)}
              key={category.id}
              className="p-3 flex items-center   justify-between"
            >
              <h1>{category.translation[locale].name}</h1>

              {locale === 'ar' ? (
                <BsChevronLeft className="w-5 h-5" />
              ) : (
                <BsChevronRight className="w-5 h-5" />
              )}
            </button>
          );
        })}
      </div>
      <div
        className="sidebar-page"
        style={{
          maxHeight: 'calc(-160px + 100vh)',
          overflowY: 'auto',
          overFlowx: 'hidden',
        }}
      >
        <div className="p-3 font-semibold justify-between flex items-center">
          <button
            className="relative rounded-full p-1"
            onClick={() => handleClickBackSecond(subCategory)}
          >
            <Ink />
            {locale === 'ar' ? (
              <BsChevronRight className="w-5 h-5" />
            ) : (
              <BsChevronLeft className="w-5 h-5" />
            )}
          </button>
          <h1 className="flex-1 text-center">
            {categories[subCategory].translation[locale].name}
          </h1>
        </div>
        <hr />
        {categories[subCategory].children?.map(subCategory => {
          return (
            <Link
              to={`/${locale}/categories/${subCategory.slug}`}
              key={subCategory.id}
              className="p-3"
            >
              {subCategory.translation[locale].name}
            </Link>
          );
        })}
      </div>
    </>
  );
}
