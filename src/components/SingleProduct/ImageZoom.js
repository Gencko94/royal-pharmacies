import React from 'react';

import { useIntl } from 'react-intl';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { GrPowerReset } from 'react-icons/gr';

export default function ImageZoom({ data }) {
  const { formatMessage } = useIntl();
  const { locale } = useIntl();
  const [doubleClicked, setDoubleClicked] = React.useState(false);
  const [image, setImage] = React.useState(() => {
    return `${process.env.REACT_APP_IMAGES_URL}/original/${data?.image.link}`;
  });
  const [showReset, setShowReset] = React.useState(false);
  React.useEffect(() => {
    setImage(
      `${process.env.REACT_APP_IMAGES_URL}/original/${data?.image.link}`
    );
    return () => {
      setImage(
        `${process.env.REACT_APP_IMAGES_URL}/original/${data?.image.link}`
      );
    };
  }, [data]);
  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <div className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}>
        <TransformWrapper
          onPinching={() => {
            setShowReset(true);
            setDoubleClicked(true);
          }}
          onPanning={() => {
            setDoubleClicked(true);
            setShowReset(true);
          }}
        >
          {({ resetTransform }) => (
            <>
              {showReset && (
                <button
                  onClick={() => resetTransform()}
                  className={`absolute flex items-center ${
                    locale === 'ar' ? 'left-0' : 'right-0'
                  } text-center z-50 mx-auto top-0 p-1 shadow rounded font-semibold`}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                  }}
                >
                  <GrPowerReset size={15} />
                  <span className="mx-2 text-xs">
                    {formatMessage({ id: 'zoom-reset' })}
                  </span>
                </button>
              )}
              <TransformComponent>
                <img
                  src={image}
                  alt={data.full_translation[locale].title}
                  style={{ maxHeight: '400px', width: 'auto' }}
                />
              </TransformComponent>
              {!doubleClicked && (
                <div
                  className="absolute right-0 left-0 text-sm mx-auto bottom-10 text-center p-2 shadow rounded font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                >
                  {formatMessage({ id: 'double-click-zoom' })}
                </div>
              )}
            </>
          )}
        </TransformWrapper>
      </div>
      <div
        className={`absolute top-0  ${locale === 'ar' ? 'right-0' : 'left-0'}`}
      >
        {[data.image, ...data.gallery].map(item => {
          return (
            <div
              key={item?.link}
              className="relative rounded overflow-hidden shadow-xs border cursor-pointer mb-2"
              onClick={() =>
                setImage(
                  `${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}`
                )
              }
              style={{ width: '60px', height: '60px' }}
            >
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/small/${item?.link}`}
                style={{ objectFit: 'contain' }}
                alt={data.full_translation[locale].title}
              />
              {image ===
                `${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}` && (
                <div className="absolute top-0 right-0 left-0 bottom-0 opacity-50 z-3 bg-white" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
