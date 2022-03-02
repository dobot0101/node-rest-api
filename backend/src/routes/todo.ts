import * as express from 'express';
import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import DBTodoManager from '../classes/DBTodoManager';
// import MemoryTodoManager from '../classes/MemoryTodoManager';

const router = express.Router();

// const todoManager = new MemoryTodoManager();
const todoManager = new DBTodoManager();

/**
 * todo 목록 조회
 */
router.get('/list', (req: Request, res: Response) => {
  const todoList = todoManager.find();
  res.send({ todoList });
});

/**
 * todo 추가
 */
router.post('/addTask', (req: Request, res: Response) => {
  try {
    const task = req.body.task;
    if (!task) {
      throw new Error('task is required.');
    }

    const todo = todoManager.save(task);
    res.send({ result: true, savedTodo: todo });
  } catch (error) {
    if (error instanceof Error) {
      res.send({ result: false, message: error.message });
    }
  }
});

/**
 * todo 삭제
 */
router.post('/removeTask', (req: Request, res: Response) => {
  const result = todoManager.delete(req.body.id);
  res.send({ result });
});

/**
 * todo 업데이트
 */
router.post('/updateTask', (req: Request, res: Response) => {
  try {
    const todo = todoManager.update(req.body.id, req.body.task);
    res.send({ result: true, updatedTodo: todo });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ result: false, message: error.message });
    }
  }
});

export { router as todoRouter };
