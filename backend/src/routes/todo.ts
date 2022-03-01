import express, { Request, Response } from 'express';
import MemoryTodoManager from '../classes/MemoryTodoManager';

export const router = express.Router();

const todoManager = new MemoryTodoManager();

router.get('/list', (req: Request, res: Response) => {
  const todoList = todoManager.find();
  res.send({ todoList });
});

router.post('/addTask', (req: Request, res: Response) => {
  const task = req.body.task;
  if (!task) {
    throw new Error('task is required.');
  }

  const todo = todoManager.save(task);
  res.send({ result: true, savedTodo: todo });
});

router.post('/removeTask', (req: Request, res: Response) => {
  const result = todoManager.delete(req.body.id);
  res.send({ result });
});

router.post('/updateTask', (req: Request, res: Response) => {
  const todo = todoManager.update(req.body.id, req.body.task);
  res.send({ result: true, updatedTodo: todo });
});