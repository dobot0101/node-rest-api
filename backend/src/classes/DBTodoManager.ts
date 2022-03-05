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

  async removeTask(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    console.log(result);
    return true;
  }

  async updateTask(id: number, task: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new Error(`todo isn't exist`);
    }
    todo.task = task;
    return await this.todoRepository.save(todo);
  }
}
