import React from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { useIntl } from 'react-intl';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import LazyImage from '../../helpers/LazyImage';

export default function ImageZoomMobile({ data }) {
  const { locale } = useIntl();
  const { formatMessage } = useIntl();
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
    <div className="mb-2 relative">
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
                style={{
                  maxHeight: '350px',
                  height: '350px',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  width: '100%',
                }}
              />
              {!doubleClicked && (
                <div
                  className="absolute right-0 left-0 text-sm mx-auto bottom-10 text-center p-2 shadow rounded font-semibold"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    width: '80%',
                  }}
                >
                  {formatMessage({ id: 'double-click-zoom' })}
                </div>
              )}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      <div className="flex items-center mt-2">
        {[data.image, ...data.gallery].map(item => {
          return (
            <div
              className="relative rounded overflow-hidden shadow-xs border cursor-pointer mb-2 mx-2"
              onClick={() =>
                setImage(
                  `${process.env.REACT_APP_IMAGES_URL}/original/${item?.link}`
                )
              }
              style={{ width: '50px' }}
            >
              <LazyImage
                src={item?.link}
                origin="small"
                pb="100%"
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
