import { getRepository, Repository } from 'typeorm';
import { serialize } from 'v8';
import { User } from '../entity/User';

export default class UserManager {
  private userRepo;
  constructor(userRepository: Repository<User>) {
    this.userRepo = userRepository;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new Error(`id: ${id} user isn't exist`);
    }
    return user;
  }

  async login(id: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        id,
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

    return await this.userRepo.save(user);
  }

  async signOut(id: number): Promise<number> {
    await this.userRepo.delete(id);
    return id;
  }

  async updateUser(id: number, userInput: UserUpdateDto) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new Error(`user isn't exist`);
    }

    const newUser = Object.assign(user, userInput);
    return await this.userRepo.save(newUser);
  }
}
