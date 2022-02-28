import express, { NextFunction, Request, Response } from "express";
import db from "./db";
import TodoManager from "./classes/todoManager";

const todoManager = new TodoManager(db);

function init() {
  db.run(
    `create table if not exists todo (id integer primary key autoincrement, task text not null)`,
    function (err: any) {
      if (err) console.log(err);
      console.log("table is created");
    }
  );

  todoManager.saveTodo("test task", () => {
    console.log("test data inserted.");
  });
}

init();

const app = express();
const port = 3000;

function requestTime(req: Request, res: Response, next: NextFunction) {
  console.log(`request url: ${req.url}`);
  console.log(`request Time: ${Date.now()}`);
  next();
}
app.use(requestTime);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.get("/list", (req: Request, res: Response) => {
  const todos = todoManager.findTodoList();
  res.send(todos);
  // console.log(todos);
});

app.post("/addTask", (req: Request, res: Response) => {
  console.log('123123123123');
  console.log(req.body);
  const task = req.body.task;
  if (!task) {
    throw new Error("task is required.");
  }
  todoManager.saveTodo(task, () => {
    console.log("saved.");
  });
  res.send({ result: true });
});

app.post("/removeTask", (req: Request, res: Response) => {
  todoManager.deleteTodo(req.body.id, () => {
    console.log("deleted.");
  });

  res.send({ result: true, deletedId: req.body.id });
});

// app
//   .route('/todo')
//   .get((req: Request, res: Response) => {
//     console.log(`todo list`);
//   })
//   .post((req: Request, res: Response) => {
//     res.send('add todo');
//   })
//   .delete((req: Request, res: Response) => {
//     res.send('delete todo');
//   });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

db.close();