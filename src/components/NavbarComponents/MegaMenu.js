import React from 'react';

export default function MegaMenu({ data, isLightTheme, menuRef }) {
  return (
    <div
      id="mega-menu"
      ref={menuRef}
      className="absolute z-10 hidden top-100 left-0 min-w-full  cursor-default"
    >
      <div
        className={`mx-auto w-full p-2  ${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-second-nav-dark text-nav-cat-text-dark'
        }  grid grid-cols-${data.length} text-center  `}
      >
        {data.map((group, i) => (
          <div key={i} className="">
            {group.map((item, j) => (
              <div key={j + i} className="mb-2">
                <h1 className="text-base text-center">{item.title}</h1>
                {item.sub.map((sub, k) => (
                  <h1 key={i + j + k} className=" text-sm  ">
                    {sub}
                  </h1>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
