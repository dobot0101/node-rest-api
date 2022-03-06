import * as express from 'express';
import {
  addUser,
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUserById);

export { router as userRouter };
