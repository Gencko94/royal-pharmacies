import React from 'react';

export default function MobileTabs({ selectedIndex, setSelectedIndex }) {
  const options = [
    'My Profile',
    'My Orders',
    'My Payment Details',
    'Language',
    'Order History',
    'Addresses',
  ];
  return (
    <div className="overflow-hidden">
      <ul
        className="overflow-x-scroll  whitespace-no-wrap bg-red-100"
        style={{ marginBottom: '-20px', paddingBottom: '20px' }}
      >
        {options.map((option, i) => {
          return (
            <li className="inline-block  ">
              <button
                onClick={() => setSelectedIndex(i)}
                className={`p-3 ${
                  selectedIndex === i ? 'bg-red-300' : 'bg-red-100'
                } hover:bg-red-300 transition duration-150 font-semibold `}
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
