const db = require('../config/db');

class Task {
  static async create(taskData) {
    const [id] = await db('tasks').insert(taskData).returning('id');
    return this.findById(id);
  }

  static async findById(id) {
    return db('tasks').where({ id }).first();
  }

  static async findByOwner(ownerId, query = {}) {
    const { page = 1, limit = 10, status, priority, search } = query;
    const offset = (page - 1) * limit;

    let queryBuilder = db('tasks').select()
      .where({ ownerId });

    if (status) {
      queryBuilder = queryBuilder.where({ status });
    }

    if (priority) {
      queryBuilder = queryBuilder.where({ priority });
    }

    if (search) {
      queryBuilder = queryBuilder
        .where('title', 'ilike', `%${search}%`)
        .orWhere('description', 'ilike', `%${search}%`);
    }

    const [tasks, total] = await Promise.all([
      queryBuilder
        .limit(limit)
        .offset(offset)
        .orderBy('createdAt', 'desc'),
      db('tasks')
        .where({ ownerId })
        .where(status ? { status } : true)
        .where(priority ? { priority } : true)
        .where(search ? 
          (builder) => builder
            .where('title', 'ilike', `%${search}%`)
            .orWhere('description', 'ilike', `%${search}%`) :
          true
        )
        .count('id', { as: 'total' })
        .first()
    ]);

    return {
      data: tasks,
      pagination: {
        page,
        limit,
        total: parseInt(total.total),
        pages: Math.ceil(total.total / limit)
      }
    };
  }

  static async findAll(query = {}) {
    const { page = 1, limit = 10, status, priority, ownerId, search } = query;
    const offset = (page - 1) * limit;

    let queryBuilder = db('tasks').select()
      .orderBy('createdAt', 'desc');

    if (status) {
      queryBuilder = queryBuilder.where({ status });
    }

    if (priority) {
      queryBuilder = queryBuilder.where({ priority });
    }

    if (ownerId) {
      queryBuilder = queryBuilder.where({ ownerId });
    }

    if (search) {
      queryBuilder = queryBuilder
        .where('title', 'ilike', `%${search}%`)
        .orWhere('description', 'ilike', `%${search}%`);
    }

    const [tasks, total] = await Promise.all([
      queryBuilder
        .limit(limit)
        .offset(offset),
      db('tasks')
        .where(status ? { status } : true)
        .where(priority ? { priority } : true)
        .where(ownerId ? { ownerId } : true)
        .where(search ? 
          (builder) => builder
            .where('title', 'ilike', `%${search}%`)
            .orWhere('description', 'ilike', `%${search}%`) :
          true
        )
        .count('id', { as: 'total' })
        .first()
    ]);

    return {
      data: tasks,
      pagination: {
        page,
        limit,
        total: parseInt(total.total),
        pages: Math.ceil(total.total / limit)
      }
    };
  }

  static async update(id, updateData) {
    await db('tasks').where({ id }).update(updateData);
    return this.findById(id);
  }

  static async delete(id) {
    await db('tasks').where({ id }).del();
    return { success: true };
  }

  static async getPermissions(taskId, userId) {
    const permission = await db('task_permissions')
      .where({ taskId, userId })
      .first();
    return permission;
  }

  static async updatePermission(taskId, userId, action, allowed) {
    await db('task_permissions')
      .where({ taskId, userId, action })
      .update({ allowed });
    return { success: true };
  }
}

module.exports = Task;