require('dotenv').config();

const express = require('express');
const { logger } = require('./utils/logger');
const securityMiddleware = require('./middleware/security.js');
const { limiter, errorHandler, notFoundHandler } = require('./middleware/index.js');
const AuthController = require('./controllers/AuthController.js');
const UserController = require('./controllers/UserController.js');
const TaskController = require('./controllers/TaskController.js');
const AuthMiddleware = require('./middleware/AuthMiddleware.js');
const swaggerMiddleware = require('./config/swagger.js');

const app = express();

app.use(express.json());
app.use(securityMiddleware());
app.use(limiter);

app.use('/api-docs', swaggerMiddleware);

app.use('/api/auth', AuthController);
app.use('/api/users', AuthMiddleware.authenticate, AuthMiddleware.requireAnyRole(['admin', 'manager']), UserController);
app.use('/api/tasks', AuthMiddleware.authenticate, TaskController);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    logger.info('Starting Task Manager API...');
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;