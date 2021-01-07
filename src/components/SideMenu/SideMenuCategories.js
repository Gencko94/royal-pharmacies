import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Ink from 'react-ink';
import { useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';

export default function SideMenuCategories({
  handleHideCategories,

  toggleSideMenu,
  page,
  setPage,
}) {
  const history = useHistory();
  const [subCategory, setSubCategory] = React.useState(0);
  const [secondSubCategory, setSecondSubCategory] = React.useState(0);
  const [thirdSubCategory, setThirdSubCategory] = React.useState(0);
  const { categories } = React.useContext(DataProvider);
  const { formatMessage, locale } = useIntl();
  const handleClickNextFirst = i => {
    setPage(page + 1);
    setSubCategory(i);
  };
  const handleClickNextSecond = i => {
    setPage(page + 1);
    setSecondSubCategory(i);
  };
  const handleClickBackSecond = i => {
    setPage(page - 1);
    setSecondSubCategory(i);
  };
  const handleClickNextThird = i => {
    setPage(page + 1);
    setThirdSubCategory(i);
  };

  return (
    <>
      {/* 1st Level */}
      <div className="sidebar-page">
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
          const hasChildren = category.children?.length > 0;
          return (
            <button
              onClick={() => {
                if (hasChildren) {
                  handleClickNextFirst(i);
                } else {
                  history.push(`/${locale}/${category.slug}`);
                  toggleSideMenu();
                }
              }}
              key={category.id}
              className="p-3 flex items-center   justify-between"
            >
              <h1>{category.translation[locale].name}</h1>

              {hasChildren ? (
                locale === 'ar' ? (
                  <BsChevronLeft className="w-5 h-5" />
                ) : (
                  <BsChevronRight className="w-5 h-5" />
                )
              ) : null}
            </button>
          );
        })}
      </div>
      {/* 2nd Level */}
      <div className="sidebar-page">
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
        {categories[subCategory].children?.map((subCategory, i) => {
          const hasChildren = subCategory.children?.length > 0;
          return (
            <button
              key={subCategory.id}
              onClick={() => {
                if (hasChildren) {
                  handleClickNextSecond(i);
                } else {
                  history.push(`/${locale}/${subCategory.slug}`);
                  toggleSideMenu();
                }
              }}
              className="p-3 flex items-center   justify-between"
            >
              <h1>{subCategory.translation[locale].name}</h1>

              {hasChildren ? (
                locale === 'ar' ? (
                  <BsChevronLeft className="w-5 h-5" />
                ) : (
                  <BsChevronRight className="w-5 h-5" />
                )
              ) : null}
            </button>
          );
        })}
      </div>
      {/* 3rd Level */}
      <div className="sidebar-page">
        <div className="p-3 font-semibold justify-between flex items-center">
          <button
            className="relative rounded-full p-1"
            onClick={() => handleClickBackSecond(secondSubCategory)}
          >
            <Ink />
            {locale === 'ar' ? (
              <BsChevronRight className="w-5 h-5" />
            ) : (
              <BsChevronLeft className="w-5 h-5" />
            )}
          </button>
          <h1 className="flex-1 text-center">
            {
              categories[subCategory].children?.[secondSubCategory]
                ?.translation[locale].name
            }
          </h1>
        </div>
        <hr />
        {categories[subCategory].children?.[secondSubCategory]?.children?.map(
          (secondsubCategory, i) => {
            const hasChildren = secondsubCategory?.children?.length > 0;

            return (
              <button
                key={secondsubCategory.id}
                onClick={() => {
                  if (hasChildren) {
                    handleClickNextThird(i);
                  } else {
                    toggleSideMenu();
                    history.push(`/${locale}/${secondsubCategory.slug}`);
                  }
                }}
                className="p-3 flex items-center   justify-between"
              >
                <h1>{secondsubCategory.translation[locale].name}</h1>

                {hasChildren ? (
                  locale === 'ar' ? (
                    <BsChevronLeft className="w-5 h-5" />
                  ) : (
                    <BsChevronRight className="w-5 h-5" />
                  )
                ) : null}
              </button>
            );
          }
        )}
      </div>
      {/* 4th Level */}
      <div className="sidebar-page">
        <div className="p-3 font-semibold justify-between flex items-center">
          <button
            className="relative rounded-full p-1"
            onClick={() => handleClickBackSecond(thirdSubCategory)}
          >
            <Ink />
            {locale === 'ar' ? (
              <BsChevronRight className="w-5 h-5" />
            ) : (
              <BsChevronLeft className="w-5 h-5" />
            )}
          </button>
          <h1 className="flex-1 text-center">
            {
              categories[subCategory].children?.[secondSubCategory]?.children?.[
                thirdSubCategory
              ]?.translation[locale].name
            }
          </h1>
        </div>
        <hr />
        {categories[subCategory].children?.[secondSubCategory]?.children?.[
          thirdSubCategory
        ]?.children?.map(subCategory => {
          return (
            <Link
              to={`/${locale}/${subCategory.slug}`}
              key={subCategory.id}
              className="p-3"
              onClick={toggleSideMenu}
            >
              {subCategory.translation[locale].name}
            </Link>
          );
        })}
      </div>
    </>
  );
}
