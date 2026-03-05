const db = require('../config/db');

class Permission {
  static async checkUserPermission(userId, resource, action) {
    const permission = await db('user_permissions')
      .where({ userId, resource, action })
      .first();
    return permission ? permission.allowed : false;
  }

  static async checkTaskPermission(taskId, userId, action) {
    const permission = await db('task_permissions')
      .where({ taskId, userId, action })
      .first();
    return permission ? permission.allowed : false;
  }

  static async grantTaskPermission(taskId, userId, action, allowed = true) {
    const existing = await db('task_permissions')
      .where({ taskId, userId, action })
      .first();

    if (existing) {
      await db('task_permissions')
        .where({ taskId, userId, action })
        .update({ allowed });
    } else {
      await db('task_permissions').insert({
        taskId,
        userId,
        action,
        allowed
      });
    }

    return { success: true };
  }

  static async revokeTaskPermission(taskId, userId, action) {
    await db('task_permissions')
      .where({ taskId, userId, action })
      .del();
    return { success: true };
  }

  static async getRolePermissions(role) {
    const permissions = await db('user_permissions')
      .whereIn('userId', (builder) => {
        builder.select('id').from('users').where({ role });
      })
      .select();
    return permissions;
  }

  static async updateRolePermissions(role, resource, action, allowed) {
    const userIds = await db('users')
      .where({ role })
      .pluck('id');

    for (const userId of userIds) {
      await this.updateUserPermission(userId, resource, action, allowed);
    }

    return { success: true };
  }

  static async updateUserPermission(userId, resource, action, allowed) {
    await db('user_permissions')
      .where({ userId, resource, action })
      .update({ allowed });
    return { success: true };
  }

  static async createDefaultPermissions(userId, role) {
    const defaultPermissions = {
      admin: [
        { resource: 'users', action: 'create', allowed: true },
        { resource: 'users', action: 'read', allowed: true },
        { resource: 'users', action: 'update', allowed: true },
        { resource: 'users', action: 'delete', allowed: true },
        { resource: 'tasks', action: 'create', allowed: true },
        { resource: 'tasks', action: 'read', allowed: true },
        { resource: 'tasks', action: 'update', allowed: true },
        { resource: 'tasks', action: 'delete', allowed: true }
      ],
      manager: [
        { resource: 'users', action: 'read', allowed: true },
        { resource: 'tasks', action: 'create', allowed: true },
        { resource: 'tasks', action: 'read', allowed: true },
        { resource: 'tasks', action: 'update', allowed: true },
        { resource: 'tasks', action: 'delete', allowed: true }
      ],
      user: [
        { resource: 'tasks', action: 'create', allowed: true },
        { resource: 'tasks', action: 'read', allowed: true },
        { resource: 'tasks', action: 'update', allowed: true },
        { resource: 'tasks', action: 'delete', allowed: true }
      ]
    };

    const permissions = defaultPermissions[role] || defaultPermissions.user;

    for (const perm of permissions) {
      await db('user_permissions').insert({
        userId,
        ...perm
      });
    }

    return { success: true };
  }
}

module.exports = Permission;