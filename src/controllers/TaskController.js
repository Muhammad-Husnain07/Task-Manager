const express = require('express');
const Joi = require('joi');
const Task = require('../models/Task.js');
const Permission = require('../models/Permission.js');

const router = express.Router();

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string(),
  status: Joi.string().valid('pending', 'in_progress', 'completed', 'cancelled').default('pending'),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium'),
  dueDate: Joi.date(),
  ownerId: Joi.number().integer()
});

router.get('/', async (req, res) => {
  try {
    const { page, limit, status, priority, ownerId, search } = req.query;
    const result = await Task.findAll({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      status,
      priority,
      ownerId: ownerId ? parseInt(ownerId) : undefined,
      search
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.get('/mine', async (req, res) => {
  try {
    const { page, limit, status, priority, search } = req.query;
    const result = await Task.findByOwner(req.user.id, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      status,
      priority,
      search
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const task = await Task.create({
      ...value,
      ownerId: req.user.id
    });

    await Permission.createDefaultPermissions(req.user.id, req.user.role);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const task = await Task.update(req.params.id, value);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Task.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;