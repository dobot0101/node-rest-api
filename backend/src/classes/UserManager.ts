import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserCreateDto } from '../models/user.create.dto';
import { UserUpdateDto } from '../models/user.update.dto';

export default class UserManager {

  async findAllUsers(): Promise<User[]> {
    const userRepo = getRepository(User);
    const users = await userRepo.find();
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(id);
    if (!user) {
      console.log(`id: ${id} user isn't exist`);
      return null;
    }
    // if (!user) {
    //   throw new Error(`id: ${id} user isn't exist`);
    // }
    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new Error(`user isn't exist`);
    }

    return user;
  }

  async signUp(userInput: UserCreateDto): Promise<User> {
    let user = new User();
    user = Object.assign(user, userInput);

    const userRepo = getRepository(User);
    return await userRepo.save(user);
  }

  async signOut(id: number): Promise<number> {
    const userRepo = getRepository(User);
    await userRepo.delete(id);
    return id;
  }

  async updateUserInfo(id: number, userInput: UserUpdateDto): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne(id);
    if (!user) {
      throw new Error(`user isn't exist`);
    }

    const newUser = Object.assign(user, userInput);
    return await userRepo.save(newUser);
  }
}
