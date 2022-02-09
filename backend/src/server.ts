import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app
  .route('/todo')
  .get((req: Request, res: Response) => {
    res.send('todo list');
  })
  .post((req: Request, res: Response) => {
    res.send('add todo');
  })
  .delete((req: Request, res: Response) => {
    res.send('delete todo');
  });

app.listen(port, () => {
  console.log(`aoo listening on port ${port}`);
});
