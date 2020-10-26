import React from 'react';

export default function AddressMobile({ handleStepForward }) {
  return (
    <div className="h-full">
      <div className=" border mb-2 h-full">
        <div
          className="flex justify-center items-center "
          style={{ height: '430px' }}
        >
          <h1 className="text-lg">Google Maps here</h1>
        </div>
        <div className="flex justify-end items-center p-2">
          <button
            className="px-3 py-1 bg-btn-primary-light text-btn-secondary-light rounded font-semibold"
            onClick={handleStepForward}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
