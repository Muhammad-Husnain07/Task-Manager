const rateLimit = require('express-rate-limit');
const createError = require('http-errors');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP',
    retryAfter: (parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000) / 60000
  }
});

const errorHandler = (err, req, res, next) => {
  if (err) {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    console.error('Error:', err);

    res.status(statusCode).json({
      error: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
};

const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Not Found'));
};

module.exports = {
  limiter,
  errorHandler,
  notFoundHandler
};