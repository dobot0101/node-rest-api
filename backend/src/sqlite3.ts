const sqlite3 = require('sqlite3').verbose();

export default class SQLite {
  private db;
  constructor() {
    this.db = new sqlite3.Database(__dirname + 'test.db');
  }
  findTodoList(callback: any) {
    this.db.all(
      `SELECT * FROM todo`,
      (err: any, rows: any) => {
        console.log(err);
        console.log(rows);
      },
      function () {
        callback();
      }
    );
  }

  saveTodo(task: string, callback: any) {
    this.db.run(`insert into todo (task) values ($task)`, { $task: task }, function () {
      callback();
    });
  }

  deleteTodo(id: number, callback: any) {
    this.db.run(`delete from todo where id = $id`, { $id: id }, function () {
      callback();
    });
  }
}
