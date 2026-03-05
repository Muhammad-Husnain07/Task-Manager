const Joi = require('joi');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('password', 255).notNullable();
      table.enum('role', ['admin', 'manager', 'user']).default('user');
      table.boolean('isActive').default(true);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('description');
      table.enum('status', ['pending', 'in_progress', 'completed', 'cancelled']).default('pending');
      table.enum('priority', ['low', 'medium', 'high', 'urgent']).default('medium');
      table.date('dueDate');
      table.integer('ownerId').unsigned().notNullable();
      table.foreign('ownerId').references('users.id').onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('refresh_tokens', (table) => {
      table.increments('id').primary();
      table.string('token', 255).notNullable().unique();
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id').onDelete('CASCADE');
      table.timestamp('expiresAt').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('user_permissions', (table) => {
      table.increments('id').primary();
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id').onDelete('CASCADE');
      table.string('resource', 50).notNullable();
      table.enum('action', ['create', 'read', 'update', 'delete']).notNullable();
      table.boolean('allowed').default(true);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('task_permissions', (table) => {
      table.increments('id').primary();
      table.integer('taskId').unsigned().notNullable();
      table.foreign('taskId').references('tasks.id').onDelete('CASCADE');
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id').onDelete('CASCADE');
      table.enum('action', ['read', 'update', 'delete']).notNullable();
      table.boolean('allowed').default(true);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('logs', (table) => {
      table.increments('id').primary();
      table.string('level', 10).notNullable();
      table.string('message', 500).notNullable();
      table.text('meta');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  },

  down: async (knex) => {
    await knex.schema.dropTableIfExists('task_permissions');
    await knex.schema.dropTableIfExists('user_permissions');
    await knex.schema.dropTableIfExists('logs');
    await knex.schema.dropTableIfExists('refresh_tokens');
    await knex.schema.dropTableIfExists('tasks');
    await knex.schema.dropTableIfExists('users');
  }
};