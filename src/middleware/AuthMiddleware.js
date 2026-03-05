const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Permission = require('../models/Permission');
require('dotenv').config();

class AuthMiddleware {
  static async authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access token required' });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'Invalid or inactive user' });
      }

      req.user = user;
      req.token = token;
      
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  static async authorize(req, res, next) {
    try {
      const { resource, action } = req.auth;
      
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const isAllowed = await Permission.checkUserPermission(
        req.user.id, 
        resource, 
        action
      );

      if (!isAllowed) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      return res.status(403).json({ error: 'Authorization failed' });
    }
  }

  static async checkTaskOwnership(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = await db('tasks').where({ id: taskId }).first();
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      if (task.ownerId !== req.user.id) {
        const permission = await Permission.checkTaskPermission(
          taskId, 
          req.user.id, 
          req.method.toLowerCase() === 'get' ? 'read' : 'update'
        );

        if (!permission) {
          return res.status(403).json({ error: 'Access denied' });
        }
      }

      next();
    } catch (error) {
      return res.status(403).json({ error: 'Authorization failed' });
    }
  }

  static async requireRole(requiredRole) {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        if (req.user.role !== requiredRole) {
          return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
      } catch (error) {
        return res.status(403).json({ error: 'Authorization failed' });
      }
    };
  }

  static async requireAnyRole(allowedRoles) {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
      } catch (error) {
        return res.status(403).json({ error: 'Authorization failed' });
      }
    };
  }
}

module.exports = AuthMiddleware;