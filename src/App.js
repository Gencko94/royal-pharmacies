import React, { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import CategoryMobile from './pages/CategoryMobile';
import GuestCheckOut from './pages/GuestCheckOut';
import GuestCheckOutMobile from './pages/GuestCheckOutMobile';
import Register from './pages/Register';
import Login from './pages/Login';
import ScrollToTopOnMount from './helpers/ScrollToTopOnMount';
import { LocalizedSwitch, LocalizedRouter, appStrings } from './modules/i18n/';
import { appLanguages } from './modules/const';
import Loading from './helpers/Loading';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import RegisterMobile from './pages/RegisterMobile';
import LoginMobile from './pages/LoginMobile';
import PasswordReset from './pages/PasswordReset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import AuthContext from './contexts/AuthContext';
import DataContextProvider from './contexts/DataContext';
import CartAndWishlistContext from './contexts/CartAndWishlistContext';
import SearchContext from './contexts/SearchContext';
const Home = React.lazy(() => import('./pages/Home'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));
const MyAccountMobile = React.lazy(() => import('./pages/MyAccountMobile'));
const SingleProduct = React.lazy(() => import('./pages/SingleProduct'));
const SingleProductMobile = React.lazy(() =>
  import('./pages/SingleProductMobile')
);
const Cart = React.lazy(() => import('./pages/Cart'));
const CartMobile = React.lazy(() => import('./pages/CartMobile'));

const Category = React.lazy(() => import('./pages/Category'));
const ViewedItems = React.lazy(() => import('./pages/ViewedItems'));
const ViewedItemsMobile = React.lazy(() => import('./pages/ViewedItemsMobile'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));
const WishlistMobile = React.lazy(() => import('./pages/WishlistMobile'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const CheckoutMobile = React.lazy(() => import('./pages/CheckoutMobile'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const NotFoundMobile = React.lazy(() => import('./pages/NotFoundMobile'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const SearchResultsMobile = React.lazy(() =>
  import('./pages/SearchResultsMobile')
);
const SingleBrand = React.lazy(() => import('./pages/SingleBrand'));
const SingleBrandMobile = React.lazy(() => import('./pages/SingleBrandMobile'));
const StaticPage = React.lazy(() => import('./pages/StaticPage'));
const TrackOrder = React.lazy(() => import('./pages/TrackOrder'));
const TrackOrderMobile = React.lazy(() => import('./pages/TrackOrderMobile'));
const OrderSuccess = React.lazy(() => import('./pages/OrderSuccess'));
const OrderFailed = React.lazy(() => import('./pages/OrderFailed'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <LocalizedRouter
      RouterComponent={Router}
      languages={appLanguages}
      appStrings={appStrings}
    >
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <AuthContext>
            <DataContextProvider>
              <CartAndWishlistContext>
                <SearchContext>
                  <ScrollToTopOnMount />

                  <LocalizedSwitch>
                    <Route
                      path="/app/register"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <Register {...props} />;
                        } else {
                          return <RegisterMobile {...props} />;
                        }
                      }}
                    />
                    <Route
                      path="/site/:page"
                      render={props => {
                        return <StaticPage {...props} />;
                      }}
                    />
                    <Route
                      path="/app/login"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <Login {...props} />;
                        } else {
                          return <LoginMobile {...props} />;
                        }
                      }}
                    />

                    <Route
                      exact
                      path="/reset-password/:token"
                      component={ResetPassword}
                    />
                    <Route
                      exact
                      path="/app/password-reset"
                      component={PasswordReset}
                    />
                    <Route exact path="/" component={Home} />
                    <Route
                      exact
                      path="/order-mobile-failed"
                      render={() => {
                        return <div />;
                      }}
                    />
                    <Route
                      exact
                      path="/order-mobile-success"
                      render={() => {
                        return <div />;
                      }}
                    />
                    <Route
                      exact
                      path="/order-failed"
                      render={() => {
                        return <Redirect to="/order/failure" />;
                      }}
                    />
                    <Route
                      exact
                      path="/order-success"
                      render={() => {
                        return <Redirect to="/order/success" />;
                      }}
                    />
                    {/* <Route exact path="/order-success" component={OrderSuccess} /> */}
                    <Route
                      exact
                      path="/order/success"
                      component={OrderSuccess}
                    />
                    <Route
                      exact
                      path="/order/failure"
                      component={OrderFailed}
                    />

                    <ProtectedRoute
                      path="/user/account"
                      Component={isTabletOrAbove ? MyAccount : MyAccountMobile}
                    />

                    <ProtectedRoute
                      path="/wishlist"
                      Component={isTabletOrAbove ? Wishlist : WishlistMobile}
                    />

                    <Route
                      path="/cart"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <Cart {...props} />;
                        } else {
                          return <CartMobile {...props} />;
                        }
                      }}
                    />

                    <Route
                      exact
                      path="/vieweditems"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <ViewedItems {...props} />;
                        } else {
                          return <ViewedItemsMobile {...props} />;
                        }
                      }}
                    />
                    <Route
                      exact
                      path="/brands/:slug"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <SingleBrand {...props} />;
                        } else {
                          return <SingleBrandMobile {...props} />;
                        }
                      }}
                    />

                    <Route
                      exact
                      path="/category/:category/:id"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <Category {...props} />;
                        } else {
                          return <CategoryMobile {...props} />;
                        }
                      }}
                    />

                    <Route
                      exact
                      path="/search/q=:query"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <SearchResults {...props} />;
                        } else {
                          return <SearchResultsMobile {...props} />;
                        }
                      }}
                    />

                    <Route
                      exact
                      path="/checkout/guest-checkout"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <GuestCheckOut {...props} />;
                        } else {
                          return <GuestCheckOutMobile {...props} />;
                        }
                      }}
                    />

                    <ProtectedRoute
                      path="/checkout/user-checkout"
                      Component={isTabletOrAbove ? Checkout : CheckoutMobile}
                    />
                    <Route
                      exact
                      path="/products/:slug/:id/:addons?"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <SingleProduct {...props} />;
                        } else {
                          return <SingleProductMobile {...props} />;
                        }
                      }}
                    />
                    <Route
                      exact
                      path="/order/track"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <TrackOrder {...props} />;
                        } else {
                          return <TrackOrderMobile {...props} />;
                        }
                      }}
                    />
                    <Route
                      exact
                      path="/page/404"
                      render={props => {
                        if (isTabletOrAbove) {
                          return <NotFound {...props} />;
                        } else {
                          return <NotFoundMobile {...props} />;
                        }
                      }}
                    />
                    <Route
                      render={props => {
                        if (isTabletOrAbove) {
                          return <NotFound {...props} />;
                        } else {
                          return <NotFoundMobile {...props} />;
                        }
                      }}
                    />
                  </LocalizedSwitch>
                  <ReactQueryDevtools initialIsOpen={false} />
                </SearchContext>
              </CartAndWishlistContext>
            </DataContextProvider>
          </AuthContext>
        </QueryClientProvider>
      </Suspense>
    </LocalizedRouter>
  );
}

export default App;
