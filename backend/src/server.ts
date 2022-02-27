import express, { NextFunction, Request, Response } from 'express';
import SQLite from './sqlite3';

const sqlite = new SQLite();

const app = express();
const port = 3000;

function requestTime(req: Request, res: Response, next: NextFunction) {
  console.log(`request url: ${req.url}`);
  console.log(`request Time: ${Date.now()}`);
  next();
}
app.use(requestTime);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.get('/list', (req: Request, res: Response) => {
  sqlite.findTodoList(() => {
    console.log();
  });
});

app.post('/addTask', (req: Request, res: Response) => {
  console.log('addTask');
});

app.post('/removeTask', (req: Request, res: Response) => {
  console.log('removeTask');
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
