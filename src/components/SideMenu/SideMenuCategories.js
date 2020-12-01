import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useIntl } from 'react-intl';

export default function SideMenuCategories({
  categories,
  subCategory,
  secondSubPage,
  handleClickBackFirst,
  handleClickBackSecond,
  handleClickNextFirst,
  handleClickNextSecond,
}) {
  const { formatMessage, locale } = useIntl();
  return (
    <>
      <div className="sidebar-page">
        <button onClick={handleClickBackFirst} className="py-2 px-2 mb-2   ">
          {formatMessage({ id: 'go-back' })}
        </button>
        <hr />
        {categories.map((category, i) => {
          return (
            <button
              onClick={() => handleClickNextFirst(i)}
              key={category.id}
              className="py-2 px-2 mb-2 flex items-center  justify-between"
            >
              <div className=" flex items-center">
                {/* <CgProfile className="mr-2 w-25p h-25p" /> */}
                <h1>{category.translation[locale].name}</h1>
              </div>
              {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
            </button>
          );
        })}
      </div>
      <div className="sidebar-page">
        <button
          onClick={() => handleClickBackSecond(subCategory)}
          className="py-2 px-2 mb-2    "
        >
          {formatMessage({ id: 'go-back' })}
        </button>
        <hr />
        {categories[subCategory].children.map((subCategory, i) => {
          return (
            <button
              onClick={() => handleClickNextSecond(i)}
              key={i}
              className="py-2 px-2 mb-2 flex items-center  justify-between"
            >
              <div className=" flex items-center">
                {/* <CgProfile className="mr-2 w-25p h-25p" /> */}
                <h1>{subCategory.translation[locale].name}</h1>
              </div>
              {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
            </button>
          );
        })}
      </div>
    </>
  );
}
//  <div className="sidebar-page">
//         <button
//           onClick={() => handleClickBackSecond(secondSubPage)}
//           className="py-2 px-2 mb-2    "
//         >
//           {formatMessage({ id: 'go-back' })}
//         </button>
//         <hr />
//         {sidebarCategories[subPage].sub[secondSubPage].sub.map(
//           (category, i) => {
//             return (
//               <button
//                 key={i}
//                 className="py-2 px-2 mb-2 flex items-center  justify-between"
//               >
//                 <div className=" flex items-center">
//                   <CgProfile className="mr-2 w-25p h-25p" />
//                   <h1>{category}</h1>
//                 </div>
//               </button>
//             );
//           }
//         )}
//       </div>
