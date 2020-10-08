import React from 'react';

export default function MegaMenu({ data, id }) {
  return (
    <div
      id={`dd${id}`}
      className="absolute z-10 hidden top-100 left-0 min-w-full  cursor-default"
    >
      <div
        className={`mx-auto w-full p-2  bg-nav-secondary  grid grid-cols-${data.length} text-center  `}
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
