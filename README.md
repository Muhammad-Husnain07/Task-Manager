# Task Manager API

A comprehensive RESTful API for task management built with Node.js and Express.

## Features

- **User Authentication**: JWT-based auth with role management (admin, manager, user)
- **Task Management**: Create, read, update, delete tasks
- **User Management**: Admin and manager roles can manage users
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**: Rate limiting, security headers, input validation
- **Database**: SQL database with Knex ORM
- **Logging**: Application logging with Winston-style logger

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite/PostgreSQL with Knex
- **Authentication**: JWT
- **API Docs**: Swagger (OpenAPI 3.0)
- **Validation**: Custom middleware

## Project Structure

```
task-manager/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.js         # Database configuration
│   │   ├── swagger.js    # Swagger setup
│   │   └── swaggerDefinitions.js
│   ├── controllers/      # Route controllers
│   │   ├── AuthController.js
│   │   ├── TaskController.js
│   │   └── UserController.js
│   ├── database/
│   │   ├── migrations/   # Database migrations
│   │   └── seeds/        # Seed data
│   ├── middleware/       # Express middleware
│   │   ├── AuthMiddleware.js
│   │   ├── index.js
│   │   ├── security.js
│   │   └── validate.js
│   ├── models/           # Database models
│   │   ├── Permission.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── services/         # Business logic
│   │   └── AuthService.js
│   ├── utils/            # Utilities
│   │   └── logger.js
│   └── app.js            # Express app entry
├── knexfile.js           # Knex configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=./dev.sqlite3
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

### API Documentation

Once running, visit: `http://localhost:3000/api-docs`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Tasks (Protected)
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users (Admin/Manager only)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Database

```bash
# Run migrations
npx knex migrate:latest

# Run seeds
npx knex seed:run
```

## License

MIT