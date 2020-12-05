const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
  const value = err.keyValue.name
  const message = `Duplicate field value: ${value}. Please use another value!`

  return new AppError(message, 400)
}

const handleJWTError = () => new AppError('Invalid token, please login again', 401)

const handleJWTExpiredError = err => new AppError('Your token has expired! Please login again', 401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message
  })
}

const sendErrorProd = (err, res) => {
  if(err.isOperational) {
    console.log('yaaaaaaaa')
    res.status(err.statusCode).json({
      status: err.status,
      message: err.oprMessage
    })
  } else {
    console.log('ERROR!!!!!', err)
    const errors = Object.keys(err.errors).map(error => `${error}: ${err.errors[error].message}`)

    res.status(500).json({
      status: 'error',
      message: errors
    })
  }
}

module.exports = (err, req, res, next) => {
  //console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'

  if(process.env.NODE_ENV === 'development') {

    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = {...err}

    if(error.name === 'CastError') error = handleCastErrorDB(error)

    if(error.code === 11000) error = handleDuplicateFieldsDB(error)

    if(error.name === 'JsonWebTokenError') error = handleJWTError() 

    if(error.name === 'TokenExpiredError') error = handleJWTExpiredError(error)

    sendErrorProd(error, res)
  }
  
}