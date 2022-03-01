import express, { NextFunction, Request, Response } from 'express';
import { todoRouter } from './routes/todo';

const port = process.env.PORT || 3000;
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`request url: ${req.url}`);
  console.log(`request Time: ${Date.now()}`);
  next();
});

app.use(express.json());

app.use('/api/todo', todoRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
