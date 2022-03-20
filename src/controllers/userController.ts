import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import UserManager from '../classes/UserManager';
import { User } from '../entity/User';

export async function findAllUsers(req: Request, res: Response) {
  try {
    const userManager = new UserManager();
    const users = await userManager.findAllUsers();
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userManager = new UserManager();
    const user = await userManager.findById(parseInt(id));
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const userManager = new UserManager();
    const user = await userManager.signUp(req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userManager = new UserManager();
    const user = await userManager.updateUserInfo(parseInt(id), req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const userManager = new UserManager();
    const deletedId = await userManager.signOut(parseInt(req.params.id));
    res.status(200).send({ deletedId });
  } catch (error) {
    res.status(500).send({ error: 'internal error' });
    if (error instanceof Error) console.log(error.message);
  }
}
