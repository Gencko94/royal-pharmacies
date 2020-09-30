import React from 'react';

export default function MobileTabs({ selectedIndex, setSelectedIndex }) {
  const options = [
    'My Profile',
    'My Addresses',
    'My Orders',
    'My Payment Details',
    'Order History',
  ];
  return (
    <div className="overflow-hidden">
      <ul
        className=" mobile-tabs overflow-x-scroll  whitespace-no-wrap bg-red-100 p-2"
        // style={{ marginBottom: '-20px' }}
      >
        {options.map((option, i) => {
          return (
            <li className="inline-block  ">
              <button
                onClick={() => setSelectedIndex(i)}
                className={`p-3 ${
                  selectedIndex === i ? 'bg-red-500 text-white' : 'bg-red-100'
                } hover:bg-red-300 transition duration-150 font-semibold rounded`}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
