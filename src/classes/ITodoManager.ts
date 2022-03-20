export type Todo = {
  id: number;
  task: string;
};

export interface ITodoManager {
  save(task: string): Todo;
  find(): Todo[];
  delete(id: number): boolean;
  update(id: number, task: string): Todo;
}
