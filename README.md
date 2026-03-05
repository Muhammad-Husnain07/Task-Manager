# Task Manager API

A production-ready RESTful Task Manager API with JWT authentication, RBAC, and ABAC authorization.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **Authorization**: Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)
- **Database**: PostgreSQL with Knex.js migrations
- **API Documentation**: Swagger UI documentation
- **Security**: Helmet, CORS, rate limiting, input validation
- **Logging**: Winston-based logging with file and console output
- **Email Service**: Nodemailer for email notifications
- **File Upload**: Multer for file handling
- **Testing**: Jest test framework with Supertest
- **Linting**: ESLint for code quality

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi, express-validator
- **Documentation**: Swagger UI
- **Testing**: Jest, Supertest
- **Logging**: Winston
- **Security**: Helmet, CORS, express-rate-limit

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database:
   ```bash
   npm run migrate
   npm run seed
   ```

5. Start the application:
   ```bash
   npm run dev
   ```

6. Access the API:
   - API endpoint: http://localhost:3000
   - API documentation: http://localhost:3000/api-docs

## Environment Variables

Create a `.env` file with the following configuration:

```env
PORT=3000
NODE_ENV=development

# Database
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=task_manager

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Logging
LOG_LEVEL=info
LOG_FILE_PATH=logs/error.log
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout and invalidate token

### Users (Admin/Manger only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Database Schema

The API uses the following database schema:

- **users**: User accounts with roles
- **tasks**: Task management
- **roles**: User roles (admin, manager, user)
- **permissions**: Access permissions
- **user_roles**: Many-to-many relationship between users and roles
- **role_permissions**: Many-to-many relationship between roles and permissions

## Authentication & Authorization

### Roles
- **admin**: Full access to all features
- **manager**: Access to user management and task management
- **user**: Access to own tasks only

### Permissions
- **read:users**: Read user data
- **write:users**: Create/update user data
- **delete:users**: Delete user data
- **read:tasks**: Read task data
- **write:tasks**: Create/update task data
- **delete:tasks**: Delete task data

### ABAC Rules
- Users can only access their own tasks unless they have manager/admin role
- Managers can access all user tasks
- Admins have unrestricted access

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Linting

Check code quality:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint -- --fix
```

## Migrations

Create new migration:
```bash
npx knex migrate:make migration_name
```

Run migrations:
```bash
npm run migrate
```

Rollback migrations:
```bash
npm run rollback
```

## API Documentation

Access the Swagger UI documentation at:
- Development: http://localhost:3000/api-docs
- Production: https://your-domain.com/api-docs

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: Joi and express-validator for data validation
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers for HTTP protection
- **SQL Injection Prevention**: Knex.js parameterized queries
- **XSS Protection**: Helmet XSS filter

## Logging

The application uses Winston for logging:
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`
- Console output: Development environment only

## Email Service

The API includes email functionality for:
- User registration notifications
- Password reset emails
- Task assignment notifications

## File Upload

The API supports file uploads for:
- Task attachments
- User profile pictures

## Error Handling

The API provides structured error responses:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Production Deployment

### Environment Configuration

For production, set:
```env
NODE_ENV=production
LOG_LEVEL=warn
```

### Security Best Practices

1. Use HTTPS in production
2. Set strong JWT secrets
3. Use environment variables for sensitive data
4. Implement proper rate limiting
5. Keep dependencies updated

### Performance Optimization

1. Use connection pooling for database
2. Enable compression middleware
3. Implement caching strategies
4. Use a reverse proxy (nginx)
5. Monitor application performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run linting and tests
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the test cases

## Changelog

### v1.0.0
- Initial release with full CRUD operations
- JWT authentication with refresh tokens
- RBAC and ABAC authorization
- PostgreSQL database with migrations
- Swagger API documentation
- Email notifications
- File upload support
- Comprehensive testing and logging