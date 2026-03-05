const Joi = require('joi');

module.exports = {
  up: async (knex) => {
    await knex('users').insert([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', parseInt(process.env.BCRYPT_ROUNDS || 12)),
        role: 'admin',
        isActive: true
      },
      {
        name: 'Manager User',
        email: 'manager@example.com',
        password: await bcrypt.hash('manager123', parseInt(process.env.BCRYPT_ROUNDS || 12)),
        role: 'manager',
        isActive: true
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: await bcrypt.hash('user123', parseInt(process.env.BCRYPT_ROUNDS || 12)),
        role: 'user',
        isActive: true
      }
    ]);

    await knex('tasks').insert([
      {
        title: 'Setup Development Environment',
        description: 'Configure Node.js, PostgreSQL, and project structure',
        status: 'completed',
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ownerId: 1
      },
      {
        title: 'Design Database Schema',
        description: 'Create tables for users, tasks, and permissions',
        status: 'in_progress',
        priority: 'medium',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        ownerId: 1
      },
      {
        title: 'Implement Authentication',
        description: 'Create JWT authentication system',
        status: 'pending',
        priority: 'high',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        ownerId: 2
      }
    ]);

    await knex('user_permissions').insert([
      { userId: 1, resource: 'users', action: 'create', allowed: true },
      { userId: 1, resource: 'users', action: 'read', allowed: true },
      { userId: 1, resource: 'users', action: 'update', allowed: true },
      { userId: 1, resource: 'users', action: 'delete', allowed: true },
      { userId: 1, resource: 'tasks', action: 'create', allowed: true },
      { userId: 1, resource: 'tasks', action: 'read', allowed: true },
      { userId: 1, resource: 'tasks', action: 'update', allowed: true },
      { userId: 1, resource: 'tasks', action: 'delete', allowed: true },
      { userId: 2, resource: 'tasks', action: 'create', allowed: true },
      { userId: 2, resource: 'tasks', action: 'read', allowed: true },
      { userId: 2, resource: 'tasks', action: 'update', allowed: true },
      { userId: 2, resource: 'tasks', action: 'delete', allowed: true },
      { userId: 3, resource: 'tasks', action: 'create', allowed: true },
      { userId: 3, resource: 'tasks', action: 'read', allowed: true },
      { userId: 3, resource: 'tasks', action: 'update', allowed: true },
      { userId: 3, resource: 'tasks', action: 'delete', allowed: true }
    ]);

    await knex('task_permissions').insert([
      { taskId: 1, userId: 1, action: 'read', allowed: true },
      { taskId: 1, userId: 1, action: 'update', allowed: true },
      { taskId: 1, userId: 1, action: 'delete', allowed: true },
      { taskId: 2, userId: 1, action: 'read', allowed: true },
      { taskId: 2, userId: 1, action: 'update', allowed: true },
      { taskId: 2, userId: 1, action: 'delete', allowed: true },
      { taskId: 3, userId: 2, action: 'read', allowed: true },
      { taskId: 3, userId: 2, action: 'update', allowed: true },
      { taskId: 3, userId: 2, action: 'delete', allowed: true }
    ]);

    await knex('logs').insert([
      {
        level: 'info',
        message: 'Application started successfully',
        meta: JSON.stringify({
          version: '1.0.0',
          environment: 'development'
        })
      }
    ]);
  },

  down: async (knex) => {
    await knex('task_permissions').del();
    await knex('user_permissions').del();
    await knex('logs').del();
    await knex('tasks').del();
    await knex('users').del();
  }
};