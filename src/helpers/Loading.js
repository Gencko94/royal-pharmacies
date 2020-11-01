import React from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
export default function Loading() {
  // const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // let timeout = setTimeout(() => {
    //   setShow(true);
    // }, 5000);

    // return () => clearTimeout(timeout);
    nprogress.start();
    return () => {
      nprogress.done();
    };
  }, []);
  return null;
}
