const db = require('../config/db');

class User {
  static async create(userData) {
    const [id] = await db('users').insert(userData).returning('id');
    return this.findById(id);
  }

  static async findById(id) {
    return db('users').where({ id }).first();
  }

  static async findByEmail(email) {
    return db('users').where({ email }).first();
  }

  static async findAll(query = {}) {
    const { page = 1, limit = 10, search } = query;
    const offset = (page - 1) * limit;

    let queryBuilder = db('users').select();

    if (search) {
      queryBuilder = queryBuilder
        .where('name', 'ilike', `%${search}%`)
        .orWhere('email', 'ilike', `%${search}%`);
    }

    const [users, total] = await Promise.all([
      queryBuilder
        .limit(limit)
        .offset(offset)
        .orderBy('createdAt', 'desc'),
      db('users')
        .where(search ? 
          (builder) => builder
            .where('name', 'ilike', `%${search}%`)
            .orWhere('email', 'ilike', `%${search}%`) :
          {}
        )
        .count('id', { as: 'total' })
        .first()
    ]);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total: parseInt(total.total),
        pages: Math.ceil(total.total / limit)
      }
    };
  }

  static async update(id, updateData) {
    await db('users').where({ id }).update(updateData);
    return this.findById(id);
  }

  static async delete(id) {
    await db('users').where({ id }).del();
    return { success: true };
  }

  static async getPermissions(userId) {
    const permissions = await db('user_permissions')
      .where({ userId })
      .select();
    return permissions;
  }

  static async updatePermission(userId, resource, action, allowed) {
    await db('user_permissions')
      .where({ userId, resource, action })
      .update({ allowed });
    return { success: true };
  }
}

module.exports = User;