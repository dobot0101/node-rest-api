import * as express from 'express';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import DBTodoManager from '../classes/DBTodoManager';
import { Todo } from '../entity/Todo';

const connection = getConnection();
const router = express.Router();
const todoRepository = connection.getRepository(Todo);
const todoManager = new DBTodoManager(todoRepository);

router.get('/list', (req: Request, res: Response) => {
  try {
    const todoList = todoManager.find();
    res.send({ todoList });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

router.post('/addTask', async (req: Request, res: Response) => {
  try {
    const task = req.body.task;
    if (!task) {
      throw new Error('input task.');
    }

    const todo = await todoManager.save(task);
    res.send({ result: true, savedTodo: todo });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: 'internal error' });
      console.log(error.message);
    }
  }
});

router.post('/removeTask', async (req: Request, res: Response) => {
  try {
    const result = todoManager.delete(req.body.id);
    res.send({ result });
  } catch (error) {
    res.status(500).send({ error: `internal error` });
    if (error instanceof Error) console.log(error.message);
  }
});

router.post('/updateTask', async (req: Request, res: Response) => {
  try {
    const todo = await todoManager.update(req.body.id, req.body.task);
    res.send({ result: true, updatedTodo: todo });
  } catch (error) {
    res.status(500).json({ error: `internal error` });
    if (error instanceof Error) console.log(error.message);
  }
});

export { router as todoRouter };
