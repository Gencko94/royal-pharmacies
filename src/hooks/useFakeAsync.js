export const fakeAsync = (value, timeout, success) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(value);
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });
};
