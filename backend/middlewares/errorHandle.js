//Error handling middlewares :

const notFound = (req, res, next) => {
  let error = new Error();
  error.message = "404 Not found";
  error.status = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  if (error.name == "ValidationError") {
    //handle mongoose validation errors
    error.status = 400;
  }
  const status = error.status || 500;
  res.status(status).json({
    error: error.message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
