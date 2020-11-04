import React from 'react';
import { MdClose } from 'react-icons/md';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
import { gsap, Power2 } from 'gsap';

export default function SideCartMenuMobile({
  cartItems,
  handleRemoveFromCart,
  setSideMenuOpen,
  cartTotal,
  cartEmpty,
}) {
  let animation = React.useMemo(
    () =>
      gsap.timeline({
        defaults: { ease: Power2.easeOut },
        paused: true,
      }),
    []
  );
  const handleCloseMenu = () => {
    animation.reverse();
    setTimeout(() => {
      setSideMenuOpen(false);
    }, 600);
  };
  const { formatMessage, locale } = useIntl();
  React.useEffect(() => {
    animation
      .fromTo(
        '.after__addToCart-related',
        { x: locale === 'ar' ? '100%' : '-100%' },
        { x: '0%', stagger: '0.2', duration: 0.6 },
        '+=0.3'
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
  }, [animation, locale]);
  return (
    <>
      <div
        className={`side-add-to-cart__container-mobile ${
          locale === 'ar' ? 'right-0' : 'left-0'
        } `}
      >
        <div className=" bg-body-light p-2 h-full flex flex-col ">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              {formatMessage({ id: 'shopping-cart' })}
            </h1>
            <button onClick={handleCloseMenu}>
              <MdClose className="w-5 h-5 " />
            </button>
          </div>
          <hr className="my-2" />
          {cartEmpty && (
            <div className="flex flex-col justify-center items-center">
              <img src={cartEmptyimg} alt="Empty cart" />
              <h1 className="font-bold mb-2">
                {formatMessage({ id: 'cart-empty' })}
              </h1>
              <Link
                to={`/${locale}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {formatMessage({ id: 'check-today-deals' })}
              </Link>
            </div>
          )}
          {!cartEmpty && (
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ maxHeight: 'calc(-110px + 100vh)' }}
            >
              <TransitionGroup>
                {cartItems.map((item, i) => {
                  return (
                    <CSSTransition
                      key={i}
                      timeout={400}
                      classNames="side-menu-cart-item__fade"
                    >
                      <div className=" after__addToCart-related mb-2">
                        <div className="">
                          <Link
                            title={item.name}
                            className="hover:underline"
                            to={`/${locale}/${item.category.replace(
                              /\s|%|,/g,
                              '-'
                            )}/${item.name.replace(/\s|%|,|-/g, '-')}/${
                              item.id
                            }`}
                          >
                            <img
                              src={item.photos.small}
                              alt={item.name}
                              className="max-w-full h-auto"
                            />
                          </Link>
                        </div>
                        <div className="">
                          <Link
                            title={item.name}
                            className="hover:underline"
                            to={`/${locale}/${item.category.replace(
                              /\s|%|,/g,
                              '-'
                            )}/${item.name.replace(/\s|%|,|-/g, '-')}/${
                              item.id
                            }`}
                          >
                            <MultiClamp
                              className="font-semibold text-sm "
                              clamp={4}
                              ellipsis="..."
                            >
                              {item.name}
                            </MultiClamp>
                          </Link>

                          <h1 className="text-xs rounded p-1 font-bold  bg-gray-200 inline">
                            {item.price} KD
                          </h1>
                          <div>
                            <button
                              className="bg-main-color text-main-text text-xs rounded p-1 my-1"
                              onClick={() => {
                                handleRemoveFromCart(item.id);
                              }}
                            >
                              {formatMessage({ id: 'remove-from-cart' })}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </div>
          )}
          <hr className="my-1" />
          {!cartEmpty && (
            <div>
              <div className="flex justify-between semibold items-center  my-2">
                <h1 className="">{formatMessage({ id: 'subtotal' })}</h1>
                <h1 className=" font-semibold">{cartTotal} KD</h1>
              </div>
              <hr className="my-1" />
              <div className=" flex items-center my-2 text-center text-second-nav-text-light ">
                <Link
                  to={`/${locale}/checkout/guestcheckout`}
                  className={`flex-1 py-1  px-2  bg-blue-500 w-full  rounded `}
                >
                  {formatMessage({ id: 'checkout' })}
                </Link>
                <Link
                  to={`/${locale}/cart`}
                  className={`flex-1 py-1 px-2 bg-green-500 mx-1    rounded`}
                >
                  {formatMessage({ id: 'go-to-cart' })}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div onClick={handleCloseMenu} className="side__addCart-bg"></div>
    </>
  );
}
