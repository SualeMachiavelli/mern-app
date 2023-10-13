const sendDevError = (err, res) => {
  if (err)
    return res.status(err.statusCode).json({
      err,
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  }
  next();
};
