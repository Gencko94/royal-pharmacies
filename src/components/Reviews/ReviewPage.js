import { motion } from 'framer-motion';
import React from 'react';
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import { AuthProvider } from '../../contexts/AuthContext';
import ErrorSnackbar from '../ErrorSnackbar';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function ReviewPage({ product, handleCloseReviewPage }) {
  const { formatMessage, locale } = useIntl();
  const [feedback, setFeedback] = React.useState('');
  const [rating, setRating] = React.useState(2.5);
  const { addReviewMutation } = React.useContext(AuthProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const closeError = () => {
    setErrorOpen(false);
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
  const handleAddReview = async () => {
    setLoading(true);
    try {
      await addReviewMutation({ id: product.id, review: feedback, rating });
      handleCloseReviewPage('success');
    } catch (error) {
      setErrorOpen(true);
      setErrorMessage(formatMessage({ id: 'something-went-wrong-snackbar' }));
      setLoading(false);
    }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="fixed  top-0 left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden bg-body-light z-40"
      style={{ height: 'calc(100vh - 62px)' }}
    >
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1">
        <button
          className="text-white text-center"
          onClick={handleCloseReviewPage}
        >
          {locale === 'en' ? (
            <AiOutlineArrowLeft className="w-6 h-6 " />
          ) : (
            <AiOutlineArrowRight className="w-6 h-6 " />
          )}
        </button>
        <h1 className="font-semibold text-lg mx-4">
          {formatMessage({ id: 'add-review' })}{' '}
          {product.translation[locale].title}
        </h1>
      </div>
      <div className="p-2">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">
            {formatMessage({ id: 'what-is-your-rating' })}
          </h1>
          <Rating
            emptySymbol={<AiOutlineStar className="text-main-color w-8 h-8" />}
            fullSymbol={<AiFillStar className="text-main-color w-8 h-8" />}
            className="pt-1 mx-2"
            initialRating={rating}
            onChange={value => setRating(value)}
            fractions={2}
          />
        </div>
        <h1 className="font-semibold text-lg my-2">
          {formatMessage({ id: 'add-feedback' })} :
        </h1>
        <textarea
          rows="6"
          id="location"
          className=" mt-1 w-full rounded border  p-1  "
          type="textarea"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddReview}
            className={`p-2 uppercase font-semibold rounded ${
              !feedback
                ? 'bg-gray-600 text-gray-400'
                : 'bg-main-color text-main-text'
            } flex items-center justify-center `}
            style={{ width: '80px' }}
            disabled={!feedback}
          >
            {isLoading && (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={25}
                width={25}
                visible={true}
              />
            )}
            {!isLoading && formatMessage({ id: 'submit' })}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
