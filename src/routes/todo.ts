import * as express from 'express';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import DBTodoManager from '../classes/DBTodoManager';
import { Todo } from '../entity/Todo';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const todoManager = new DBTodoManager(getRepository(Todo));
    const todoList = await todoManager.findAllTask();

    res.send({ todoList });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const task = req.body.task;
    if (!task) {
      throw new Error('input task.');
    }

    const todoManager = new DBTodoManager(getRepository(Todo));
    const todo = await todoManager.addTask(task);
    res.send({ result: true, savedTodo: todo });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: 'internal error' });
      console.log(error.message);
    }
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ message: `input id` });
      console.log(`input id`);
    }

    const todoManager = new DBTodoManager(getRepository(Todo));
    const result = await todoManager.removeTask(id);
    res.send({ result });
  } catch (error) {
    // res.status(500).send({ error: `internal error` });
    if (error instanceof Error) console.log(error.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const todoManager = new DBTodoManager(getRepository(Todo));
    const todo = await todoManager.updateTask(req.params.id, req.body.task);
    res.send({ result: true, updatedTodo: todo });
  } catch (error) {
    res.status(500).json({ error: `internal error` });
    if (error instanceof Error) console.log(error.message);
  }
});

export { router as todoRouter };
