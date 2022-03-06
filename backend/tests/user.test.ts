import {
  Connection,
  createConnection,
  getConnection,
  Repository,
} from 'typeorm';
import UserManager from '../src/classes/UserManager';
import { User } from '../src/entity/User';
import { UserCreateDto } from '../src/models/user.create.dto';

describe('user test', () => {
  let conn: Connection;
  let userRepo: Repository<User>;

  beforeAll(async () => {
    conn = await createConnection();
    userRepo = conn.getRepository(User);
  });


  test('login test', async () => {
    const userManager = new UserManager(userRepo);
    const user: UserCreateDto = {
      email: 'test@naver.com1',
      name: '이도현',
      password: 'password',
      phoneNumber: '01011111111',
    };

    const savedUser = await userManager.signUp(user);
    const loginUser = await userManager.login(savedUser.email, savedUser.password);

    expect(loginUser).toBeInstanceOf(User);
  });
  test('add user test', async () => {
    const userManager = new UserManager(userRepo);
    const user: UserCreateDto = {
      email: 'test@naver.com2',
      name: '이도현',
      password: 'password',
      phoneNumber: '01011111111',
    };
    const savedUser = await userManager.signUp(user);

    expect(savedUser).toBeInstanceOf(User);
  });

  test('find all users test', async () => {
    const userManager = new UserManager(userRepo);
    const users = await userManager.findAllUsers();
    expect(users.length).toBeGreaterThanOrEqual(0);
  });

  test('find user by id test', async () => {
    const userManager = new UserManager(userRepo);
    const user: UserCreateDto = {
      email: 'test@naver.com3',
      name: '이도현',
      password: 'password',
      phoneNumber: '01071131111',
    };
    const savedUser = await userManager.signUp(user);
    const foundUser = await userManager.findById(savedUser.id);

    expect(savedUser).toEqual(foundUser);
  });

  test('update user test', async () => {
    const userManager = new UserManager(userRepo);
    const savedUser = await userManager.signUp({
      email: 'test@naver.com4',
      name: '이도현',
      password: 'password',
      phoneNumber: '01071131111',
    });
    const id = savedUser.id;
    const updatedUser = await userManager.updateUserInfo(id, {
      email: 'test2@naver.com5',
      password: 'password2',
      name: '홍길동',
      phoneNumber: '01071132222',
    });

    expect(savedUser).not.toEqual(updatedUser);
  });

  test('delete user test', async () => {
    const userManager = new UserManager(userRepo);
    const savedUser = await userManager.signUp({
      email: 'test@naver.com6',
      name: '이도현',
      password: 'password',
      phoneNumber: '01071131111',
    });

    const id = savedUser.id;
    const deletedId = await userManager.signOut(id);
    const foundUser = await userManager.findById(deletedId);

    expect(foundUser).toBe(null);
  });

  afterAll(async () => {
    await getConnection().close();
  });
});
