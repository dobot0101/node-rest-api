import { DeleteResult, Repository } from 'typeorm';
import { Todo as TodoEntity } from '../entity/Todo';

type Todo = {
  id: number;
  task: string;
};
export default class DBTodoManager {
  private todoRepository;
  constructor(todoRepository: Repository<Todo>) {
    this.todoRepository = todoRepository;
  }

  async addTask(task: string): Promise<Todo> {
    const todo = new TodoEntity();
    todo.task = task;
    return await this.todoRepository.save(todo);
  }

  async findAllTask(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async removeTask(id: string): Promise<string> {
    await this.todoRepository.delete(id);
    return id;
  }

  async updateTask(id: string, task: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new Error(`todo isn't exist`);
    }
    todo.task = task;
    return await this.todoRepository.save(todo);
  }
}
