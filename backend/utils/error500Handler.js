module.exports = (res, err) => {
  console.log(err);
  return res.status(500).json({
    message: 'Something went wrong',
    error: {
      errorName: err.name,
      errorMsg: err.message,
    },
  });
};
