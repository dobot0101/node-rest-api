import {
  Connection,
  createConnection,
  getConnection,
  Repository,
} from 'typeorm';
import { Todo } from '../src/entity/Todo';

describe('todo typeorm CRUD test', () => {
  let conn: Connection;
  let todoRepo: Repository<Todo>;

  beforeAll(async () => {
    conn = await createConnection();
    todoRepo = conn.getRepository(Todo);
  });

  test('create todo test', async () => {
    const todo = new Todo();
    todo.task = 'create todo test';
    const savedTodo = await todoRepo.save(todo);

    expect(savedTodo).toBeInstanceOf(Todo);
  });

  test('find todo test', async () => {
    const todos = await todoRepo.find();
    expect(todos.length).toBeGreaterThanOrEqual(0);
  });

  test('update todo test', async () => {
    const todo = await todoRepo.findOne();
    const prevTask = todo.task;
    todo.task = 'new task';
    const updatedTodo = await todoRepo.save(todo);

    expect(prevTask).not.toBe(updatedTodo.task);
  });

  test('delete todo test', async () => {
    const result = await todoRepo.delete(1);
    expect(result.affected).toBeGreaterThanOrEqual(0);
  });

  afterAll(async () => {
    await getConnection().close();
  });
});
