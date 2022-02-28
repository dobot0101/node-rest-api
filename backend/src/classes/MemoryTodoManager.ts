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
    console.log(this.todoList);
    return true;
  }

  update(id: number, task: string): Todo {
    const idx = this.todoList.findIndex(todo => todo.id === id);
    const todo = this.todoList[idx];
    console.log(`before update: ${this.todoList}`);
    todo.task = task;
    console.log(`after update: ${this.todoList}`);
    return todo;
  }
}
