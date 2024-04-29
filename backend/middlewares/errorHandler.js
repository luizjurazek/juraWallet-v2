module.exports = errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode
  const message = error.message


  return res.status(statusCode).json({
    error: true,
    message: message
  })
}