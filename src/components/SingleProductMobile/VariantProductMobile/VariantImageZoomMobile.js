import React from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { useIntl } from 'react-intl';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
export default function VariantImageZoomMobile({
  data,
  selectedVariation,
  selectedOption,
}) {
  const { formatMessage, locale } = useIntl();
  const [doubleClicked, setDoubleClicked] = React.useState(false);
  const [showReset, setShowReset] = React.useState(false);
  const [image, setImage] = React.useState(() => {
    if (data.new_variation_addons[selectedVariation]?.options) {
      return `${process.env.REACT_APP_IMAGES_URL}/original/${
        data.new_variation_addons[selectedVariation]?.options[
          selectedOption[selectedVariation]
        ]?.image || data.image?.link
      }`;
    } else {
      return `${process.env.REACT_APP_IMAGES_URL}/original/${
        data.new_variation_addons[selectedVariation]?.image || data.image?.link
      }`;
    }
  });
  React.useEffect(() => {
    setImage(() => {
      if (data.new_variation_addons[selectedVariation]?.options) {
        return `${process.env.REACT_APP_IMAGES_URL}/original/${
          data.new_variation_addons[selectedVariation]?.options[
            selectedOption[selectedVariation]
          ]?.image || data.image?.link
        }`;
      } else {
        return `${process.env.REACT_APP_IMAGES_URL}/original/${
          data.new_variation_addons[selectedVariation]?.image ||
          data.image?.link
        }`;
      }
    });
    return () => {
      setImage(() => {
        if (data.new_variation_addons[selectedVariation]?.options) {
          return `${process.env.REACT_APP_IMAGES_URL}/original/${
            data.new_variation_addons[selectedVariation]?.options[
              selectedOption[selectedVariation]
            ]?.image || data.image?.link
          }`;
        } else {
          return `${process.env.REACT_APP_IMAGES_URL}/original/${
            data.new_variation_addons[selectedVariation]?.image ||
            data.image?.link
          }`;
        }
      });
    };
  }, [selectedVariation, selectedOption]);

  const resolveImage = () => {
    return (
      <img
        onDoubleClick={() => setDoubleClicked(true)}
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
    );
  };
  const resolveThumbnail = () => {
    if (data.new_variation_addons[selectedVariation]?.options) {
      return [
        <div
          key="1"
          style={{ width: '50px' }}
          className="relative  mx-2 rounded overflow-hidden shadow-xs border cursor-pointer mb-2"
          onClick={() =>
            setImage(
              `${process.env.REACT_APP_IMAGES_URL}/original/${
                data.new_variation_addons[selectedVariation]?.options[
                  selectedOption[selectedVariation]
                ]?.image || data.image?.link
              }`
            )
          }
        >
          <img
            style={{ objectFit: 'contain' }}
            src={`${process.env.REACT_APP_IMAGES_URL}/original/${
              data.new_variation_addons[selectedVariation]?.options[
                selectedOption[selectedVariation]
              ]?.image || data.image?.link
            }
           `}
            alt={data.full_translation[locale].title}
          />
          {image ===
            `${process.env.REACT_APP_IMAGES_URL}/original/${
              data.new_variation_addons[selectedVariation]?.options[
                selectedOption[selectedVariation]
              ]?.image || data.image?.link
            }` && (
            <div className="absolute top-0 right-0 left-0 bottom-0 opacity-50 z-3 bg-white" />
          )}
        </div>,
        ...data.gallery.map(image => (
          <div
            key={image?.link + 1}
            style={{ width: '50px' }}
            className="relative mx-2 rounded overflow-hidden shadow-xs border cursor-pointer mb-2"
            onClick={() =>
              setImage(
                `${process.env.REACT_APP_IMAGES_URL}/original/${image.link}`
              )
            }
          >
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${image.link}`}
              style={{ objectFit: 'contain' }}
              alt={data.full_translation[locale].title}
            />
            {image ===
              `${process.env.REACT_APP_IMAGES_URL}/original/${image.link}` && (
              <div className="absolute top-0 right-0 left-0 bottom-0 opacity-50 z-3 bg-white" />
            )}
          </div>
        )),
      ];
    } else {
      return [
        <div
          style={{ width: '50px' }}
          className="relative mx-2 rounded overflow-hidden shadow-xs border cursor-pointer mb-2"
          onClick={() =>
            setImage(
              `${process.env.REACT_APP_IMAGES_URL}/original/${
                data.new_variation_addons[selectedVariation]?.image ||
                data.image?.link
              }`
            )
          }
        >
          <img
            style={{ objectFit: 'contain' }}
            src={`${process.env.REACT_APP_IMAGES_URL}/original/${
              data.new_variation_addons[selectedVariation]?.image ||
              data.image?.link
            }
            `}
            alt={data.full_translation[locale].title}
          />
          {image ===
            `${process.env.REACT_APP_IMAGES_URL}/original/${
              data.new_variation_addons[selectedVariation]?.image ||
              data.image?.link
            }` && (
            <div className="absolute top-0 right-0 left-0 bottom-0 opacity-50 z-3 bg-white" />
          )}
        </div>,
        ...data.gallery.map(image => (
          <div
            style={{ width: '50px' }}
            className="relative mx-2 rounded overflow-hidden shadow-xs border cursor-pointer mb-2"
            onClick={() =>
              setImage(
                `${process.env.REACT_APP_IMAGES_URL}/original/${image.link}`
              )
            }
          >
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${image.link}`}
              style={{ objectFit: 'contain' }}
              alt={data.full_translation[locale].title}
            />
            {image ===
              `${process.env.REACT_APP_IMAGES_URL}/original/${image.link}` && (
              <div className="absolute top-0 right-0 left-0 bottom-0 opacity-50 z-3 bg-white" />
            )}
          </div>
        )),
      ];
    }
  };
  return (
    <div className="mb-2 relative">
      <div className="relative">
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
              <TransformComponent>{resolveImage()}</TransformComponent>
              {!doubleClicked && (
                <div
                  className="absolute text-sm right-0 text-center left-0 mx-auto bottom-10 p-2 shadow rounded font-semibold"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    width: '80%',
                  }}
                >
                  {formatMessage({ id: 'double-click-zoom' })}
                </div>
              )}
            </>
          )}
        </TransformWrapper>
      </div>
      <div className="flex items-center relative">{resolveThumbnail()}</div>
    </div>
  );
}
