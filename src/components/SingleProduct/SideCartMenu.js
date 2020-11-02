import React from 'react';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Power2 } from 'gsap';

export default function SideCartMenu({
  cartItems,
  calculateItemsPrice,
  handleRemoveFromCart,
  setSideMenuOpen,
}) {
  let animation = React.useMemo(
    () =>
      gsap.timeline({
        defaults: { duration: 0.5, ease: Power2.easeOut },
        paused: true,
      }),
    []
  );
  const handleCloseMenu = () => {
    animation.reverse();
    setTimeout(() => {
      setSideMenuOpen(false);
    }, 300);
  };
  const { formatMessage } = useIntl();
  React.useEffect(() => {
    animation
      .fromTo(
        '.after__addToCart-related',
        { x: '100%' },
        { x: '0%', stagger: '0.1' }
      )
      .fromTo(
        '.side__addCart-bg',
        {
          visibility: 'hidden',
          opacity: 0,
        },
        { visibility: 'visible', opacity: 0.5 },
        '-=1'
      );
    animation.play();
  }, [animation]);

  return (
    <>
      <div className="side__addCart-container ">
        <div className=" bg-body-light p-2 h-full flex flex-col ">
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: 'calc(-110px + 100vh)' }}
          >
            {cartItems.map((item, i) => {
              return (
                <div key={i} className=" after__addToCart-related mb-2">
                  <div className="">
                    <img
                      src={item.photos.small}
                      alt={item.name}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div className="">
                    <MultiClamp
                      className="font-semibold text-sm "
                      clamp={4}
                      ellipsis="..."
                    >
                      {item.name}
                    </MultiClamp>
                    <div className="flex items-center p-1 bg-blue-600">
                      <h1 className="text-xs">
                        {formatMessage({ id: 'price' })}
                      </h1>
                      <h1 className="text-xs mx-1"> {item.price} KD </h1>
                    </div>
                    <div>
                      <button
                        className="bg-main-color text-main-text text-xs rounded p-1"
                        onClick={() => {
                          handleRemoveFromCart(item.id);
                        }}
                      >
                        {formatMessage({ id: 'remove-from-cart' })}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="flex justify-center items-center">
          <h1 className="bg-blue-200 px-2 py-1 w-1/2 rounded text-center my-2">
            Added to Cart !
          </h1>
        </div> */}
          <hr className="my-1" />
          <div>
            <div className="flex justify-between semibold items-center  my-2">
              <h1 className="">Cart Total</h1>
              <h1 className=" font-semibold">{calculateItemsPrice()} KD</h1>
            </div>
            <hr className="my-1" />
            <div className=" flex items-center my-2 text-center text-second-nav-text-light ">
              <button
                className={`flex-1 py-1  px-2  bg-blue-500 w-full  rounded mr-2`}
              >
                {formatMessage({ id: 'checkout' })}
              </button>
              <Link
                to="/cart"
                className={`flex-1 py-1 px-2 bg-green-500     rounded`}
              >
                {formatMessage({ id: 'go-to-cart' })}
              </Link>
            </div>
          </div>

          {/* <hr className="my-1" />
        <div
          className="overflow-y-auto overflow-x-hidden"
          style={{ maxHeight: 'calc(100vh - 280px' }}
        >
          <h1 className="font-bold">Similar Items</h1>
          {bestSeller.map((item, i) => {
            return (
              <>
                <div key={i} className="after__addToCart-related my-1  ">
                  <img
                    src={item.photos.small}
                    alt={item.name}
                    className="max-w-full h-auto"
                  />
                  <div className="text-sm">
                    <MultiClamp
                      className="font-semibold "
                      clamp={2}
                      ellipsis="..."
                    >
                      {item.name}
                    </MultiClamp>
                    <Rating
                      initialRating={Math.round(Math.random() * 5)}
                      emptySymbol={<AiOutlineStar className="text-red-700" />}
                      fullSymbol={<AiFillStar className="text-red-700" />}
                      className="mr-2 pt-1"
                    />
                    <h1 className="text-green-700">{item.price} KD</h1>
                    <button className="p-1 text-xs bg-blue-700 text-white rounded ">
                      Add to cart
                    </button>
                  </div>
                </div>
                {i !== bestSeller.length - 1 && <hr />}
              </>
            );
          })}
        </div> */}
        </div>
      </div>
      <div onClick={handleCloseMenu} className="side__addCart-bg"></div>
    </>
  );
}
