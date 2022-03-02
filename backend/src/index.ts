import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Todo } from './entity/Todo';

createConnection()
  .then(async connection => {
    const todo = new Todo();
    todo.task = 'test task';

    const todoRepo = connection.getRepository(Todo);
    await todoRepo.save(todo);
    console.log(`todo is saved to db`);

    const savedTodos = await todoRepo.find();
    console.log(`all todo from db: ${savedTodos}`);
  })
  .catch(error => console.log(error))
  .finally(process.exit);
