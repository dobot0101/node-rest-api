import { ITodoManager } from './ITodoManager';

export type Todo = {
  id: number;
  task: string;
};

export interface IAsyncTodoManager {
  save(task: string): Promise<Todo>;
  find(): Promise<Todo[]>;
  delete(id: number): Promise<boolean>;
  update(id: number, task: string): Promise<Todo>;
}
