exports.createPromise = (err, data) => {
  return new Promise((resolve, reject) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }      
  });
};
