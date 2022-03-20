import { ITodoManager, Todo } from './ITodoManager';

export default class MemoryTodoManager implements ITodoManager {
  private todoList: Todo[] = [];

  save(task: string): Todo {
    const id = this.todoList.length;
    this.todoList.push({ id, task });
    return this.todoList.filter(todo => todo.id === id)[0];
  }

  find(): Todo[] {
    return this.todoList;
  }

  delete(id: number): boolean {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    return true;
  }

  update(id: number, task: string): Todo {
    const idx = this.todoList.findIndex(todo => todo.id === id);
    if (idx === -1) {
      throw new Error(`todo isn't exist(id: ${id})`);
    }
    const todo = this.todoList[idx];
    todo.task = task;
    return todo;
  }
}
