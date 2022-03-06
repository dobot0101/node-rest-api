import * as express from 'express';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import UserManager from '../classes/UserManager';
import { User } from '../entity/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const userManager = new UserManager(getRepository(User));
    const users = await userManager.findAllUsers();
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userManager = new UserManager(getRepository(User));
    const user = await userManager.findById(id);
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const userManager = new UserManager(getRepository(User));
    const user = await userManager.signUp(req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const userManager = new UserManager(getRepository(User));
    const id = req.params.id;
    const user = await userManager.updateUserInfo(id, req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userManager = new UserManager(getRepository(User));
    const deletedId = await userManager.signOut(req.params.id);
    res.status(200).send({ deletedId });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
});

export { router as userRouter };
