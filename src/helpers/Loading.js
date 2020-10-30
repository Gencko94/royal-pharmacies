import React from 'react';

export default function Loading() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
  return <>{show && 'loading...........'}</>;
}
