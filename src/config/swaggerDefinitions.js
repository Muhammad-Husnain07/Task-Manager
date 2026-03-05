const swaggerJSDoc = require('swagger-jsdoc');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticate user and return JWT tokens
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User registration
 *     description: Register new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *             role:
 *               type: string
 *               enum: [admin, manager, user]
 *     responses:
 *       201:
 *         description: User created successfully
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh access token
 *     description: Get new access token using refresh token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - refreshToken
 *           properties:
 *             refreshToken:
 *               type: string
 *     responses:
 *       200:
 *         description: Access token refreshed
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid refresh token
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User logout
 *     description: Invalidate refresh token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *           properties:
 *             userId:
 *               type: integer
 *     responses:
 *       200:
 *         description: Logout successful
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Get paginated list of all users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         type: integer
 *         default: 10
 *       - name: search
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 *             pagination:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Get user details by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user
 *     description: Update user details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             role:
 *               type: string
 *               enum: [admin, manager, user]
 *             isActive:
 *               type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}/permissions:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user permissions
 *     description: Get all permissions for a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               resource:
 *                 type: string
 *               action:
 *                 type: string
 *               allowed:
 *                 type: boolean
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}/permissions:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user permission
 *     description: Update specific permission for a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - resource
 *             - action
 *             - allowed
 *           properties:
 *             resource:
 *               type: string
 *             action:
 *               type: string
 *             allowed:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks
 *     description: Get paginated list of all tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         type: integer
 *         default: 10
 *       - name: status
 *         in: query
 *         type: string
 *         enum: [pending, in_progress, completed, cancelled]
 *       - name: priority
 *         in: query
 *         type: string
 *         enum: [low, medium, high, urgent]
 *       - name: ownerId
 *         in: query
 *         type: integer
 *       - name: search
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Task'
 *             pagination:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/mine:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get user's tasks
 *     description: Get paginated list of tasks owned by current user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         type: integer
 *         default: 10
 *       - name: status
 *         in: query
 *         type: string
 *         enum: [pending, in_progress, completed, cancelled]
 *       - name: priority
 *         in: query
 *         type: string
 *         enum: [low, medium, high, urgent]
 *       - name: search
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Task'
 *             pagination:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get task by ID
 *     description: Get task details by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create new task
 *     description: Create a new task
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               type: string
 *               enum: [pending, in_progress, completed, cancelled]
 *             priority:
 *               type: string
 *               enum: [low, medium, high, urgent]
 *             dueDate:
 *               type: string
 *               format: date
 *     responses:
 *       201:
 *         description: Task created successfully
 *         schema:
 *           $ref: '#/definitions/Task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Update task
 *     description: Update task details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               type: string
 *               enum: [pending, in_progress, completed, cancelled]
 *             priority:
 *               type: string
 *               enum: [low, medium, high, urgent]
 *             dueDate:
 *               type: string
 *               format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         schema:
 *           $ref: '#/definitions/Task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete task
 *     description: Delete a task
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       role:
 *         type: string
 *       isActive:
 *         type: boolean
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 *   Task:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: string
 *       priority:
 *         type: string
 *       dueDate:
 *         type: string
 *         format: date
 *       ownerId:
 *         type: integer
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 */

module.exports = {
  swaggerJSDoc
};