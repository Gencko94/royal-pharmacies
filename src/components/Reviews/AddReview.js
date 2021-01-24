import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import SuccessSnackbar from '../SuccessSnackbar';
import ReviewPage from './ReviewPage';

export default function AddReview({
  handleAddReviewClose,
  data,
  selectedOrder,
}) {
  const { formatMessage, locale } = useIntl();
  const [reviewPageOpen, setReviewPageOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  const containerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
      },
    },
  };
  const handleCloseReviewPage = status => {
    setReviewPageOpen(false);
    if (status === 'success') {
      setTimeout(() => {
        setSnackbarOpen(true);
        setSuccessMessage(formatMessage({ id: 'review-added' }));
      }, 300);
    }
  };
  const handleOpenReviewPage = product => {
    setReviewPageOpen(true);
    setSelectedProduct(product);
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`fixed  top-0 left-0 right-0 bottom-0 
      overflow-y-auto overflow-x-hidden
       bg-body-light z-30`}
      style={{ height: 'calc(100vh - 62px)' }}
    >
      {snackbarOpen && (
        <SuccessSnackbar
          message={successMessage}
          closeFunction={closeSnackbar}
        />
      )}
      {!reviewPageOpen && (
        <>
          <div className=" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1">
            <button
              className="text-white text-center"
              onClick={handleAddReviewClose}
            >
              {locale === 'en' ? (
                <AiOutlineArrowLeft className="w-6 h-6 " />
              ) : (
                <AiOutlineArrowRight className="w-6 h-6 " />
              )}
            </button>
            <h1 className="font-semibold text-lg mx-4">
              {formatMessage({ id: 'add-reviews' })}
            </h1>
          </div>
          <div className="font-bold text-lg p-2">
            <h1>{formatMessage({ id: 'select-product-to-review' })}</h1>
          </div>
          <div className="grid grid-cols-1 gap-2 p-2">
            {data[selectedOrder].items.map(product => {
              return (
                <div
                  key={product.id}
                  onClick={() => handleOpenReviewPage(product.product)}
                  className="p-3 border cursor-pointer flex items-center hover:shadow hover:bg-gray-100  transition duration-150  rounded-lg"
                >
                  <img
                    src={`${process.env.REACT_APP_IMAGES_URL}/small/${product.product.image?.link}`}
                    alt={product.product.translation[locale].title}
                    style={{ width: '50px', height: '50px' }}
                  />
                  <h1 className="mx-4">
                    {product.product.translation[locale].title}
                  </h1>
                </div>
              );
            })}
          </div>
        </>
      )}
      <AnimatePresence>
        {reviewPageOpen && (
          <ReviewPage
            product={selectedProduct}
            handleCloseReviewPage={handleCloseReviewPage}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
