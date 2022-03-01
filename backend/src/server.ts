import express, { NextFunction, Request, Response } from 'express';
import MemoryTodoManager from './classes/MemoryTodoManager';

const todoManager = new MemoryTodoManager();

const app = express();
const port = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`request url: ${req.url}`);
  console.log(`request Time: ${Date.now()}`);
  next();
});
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.send('hello world');
// });

app.get('/list', (req: Request, res: Response) => {
  const todoList = todoManager.find();
  res.send({ todoList });
});

app.post('/addTask', (req: Request, res: Response) => {
  const task = req.body.task;
  if (!task) {
    throw new Error('task is required.');
  }

  const todo = todoManager.save(task);
  res.send({ result: true, savedTodo: todo });
});

app.post('/removeTask', (req: Request, res: Response) => {
  const result = todoManager.delete(req.body.id);
  res.send({ result });
});

app.post('/updateTask', (req: Request, res: Response) => {
  const todo = todoManager.update(req.body.id, req.body.task);
  res.send({ result: true, updatedTodo: todo });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
