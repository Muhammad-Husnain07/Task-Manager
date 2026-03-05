const express = require('express');
const Joi = require('joi');
const User = require('../models/User.js');
const Permission = require('../models/Permission.js'');

const router = express.Router();

const userSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  role: Joi.string().valid('admin', 'manager', 'user'),
  isActive: Joi.boolean()
});

router.get('/', async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const result = await User.findAll({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.update(req.params.id, value);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await User.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.get('/:id/permissions', async (req, res) => {
  try {
    const permissions = await Permission.getPermissions(req.params.id);
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
});

router.put('/:id/permissions', async (req, res) => {
  try {
    const { resource, action, allowed } = req.body;
    const result = await Permission.updateUserPermission(
      req.params.id,
      resource,
      action,
      allowed
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update permissions' });
  }
});

module.exports = router;