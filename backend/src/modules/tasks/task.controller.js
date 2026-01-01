import {
  createTaskValidator,
  updateTaskValidator,
} from "./task.validator.js";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "./task.service.js";

export const create = async (req, res, next) => {
  try {
    const { error, value } = createTaskValidator.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const task = await createTask(value, req.user.id);

    res.status(201).json({
      success: true,
      message: "Task created",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const tasks = await getTasks(req.user);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const view = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id, req.user);

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const { error, value } = updateTaskValidator.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const task = await updateTask(req.params.id, value, req.user);

    res.json({
      success: true,
      message: "Task updated",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteTask(req.params.id, req.user);

    res.json({
      success: true,
      message: "Task deleted",
    });
  } catch (err) {
    next(err);
  }
};
