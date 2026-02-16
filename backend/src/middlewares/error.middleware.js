exports.errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose Bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Handle Duplicate Key Error (unique email)
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Handle Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
