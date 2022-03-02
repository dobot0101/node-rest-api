import { Repository } from 'typeorm';
import { Todo as TodoEntity } from '../entity/Todo';
import { IAsyncTodoManager, Todo } from './IAsyncTodoManager';

export default class DBTodoManager implements IAsyncTodoManager {
  private todoRepository: Repository<Todo>;
  constructor(todoRepository: Repository<Todo>) {
    this.todoRepository = todoRepository;
  }

  async save(task: string): Promise<Todo> {
    const todo = new TodoEntity();
    todo.task = task;
    return await this.todoRepository.save(todo);
  }

  async find(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    return result.affected >= 0;
  }

  async update(id: number, task: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    todo.task = task;
    return await this.todoRepository.save(todo);
  }
}
