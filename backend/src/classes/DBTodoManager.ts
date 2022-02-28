export default class TodoManager {
  private db;
  constructor(db: any) {
    this.db = db;
  }
  findTodoList() {
    this.db.all(`SELECT * FROM todo`, (err: any, rows: any) => {
      console.log({ err });
      console.log({ rows });
      return rows;
    });
  }

  saveTodo(task: string, callback: any) {
    this.db.run(
      `insert into todo (task) values ($task)`,
      { $task: task },
      function (err: Error) {
        if (err) console.error(err);
        else if (callback && typeof callback === "function") callback();
      }
    );
  }

  deleteTodo(id: number, callback: any) {
    this.db.run(`delete from todo where id = $id`, { $id: id }, function () {
      callback();
    });
  }
}
