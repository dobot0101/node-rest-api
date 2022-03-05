import * as express from 'express';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import UserManager from '../classes/UserManager';
import { User } from '../entity/User';

const connection = getConnection();
const router = express.Router();
const userRepo = connection.getRepository(User);
const userManager = new UserManager(userRepo);

router.get('/', (req: Request, res: Response) => {
  try {
    const users = userManager.findAllUsers();
    res.send({ users });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = userManager.findById(id);
    res.send({ user });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

// router.post('/addTask', async (req: Request, res: Response) => {
//   try {
//     const task = req.body.task;
//     if (!task) {
//       throw new Error('input task.');
//     }

//     const todo = await todoManager.addTask(task);
//     res.send({ result: true, savedTodo: todo });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send({ error: 'internal error' });
//       console.log(error.message);
//     }
//   }
// });

// router.post('/removeTask', async (req: Request, res: Response) => {
//   try {
//     const result = todoManager.removeTask(req.body.id);
//     res.send({ result });
//   } catch (error) {
//     res.status(500).send({ error: `internal error` });
//     if (error instanceof Error) console.log(error.message);
//   }
// });

// router.post('/updateTask', async (req: Request, res: Response) => {
//   try {
//     const todo = await todoManager.updateTask(req.body.id, req.body.task);
//     res.send({ result: true, updatedTodo: todo });
//   } catch (error) {
//     res.status(500).json({ error: `internal error` });
//     if (error instanceof Error) console.log(error.message);
//   }
// });

export { router as userRouter };
