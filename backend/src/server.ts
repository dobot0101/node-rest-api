// import express, { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import { todoRouter } from './routes/todo';
import { userRouter } from './routes/user';
import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';

async function main() {
  const connection = await createConnection();
  const port = process.env.PORT || 3000;
  const app = express();

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`request url: ${req.url}`);
    console.log(`request Time: ${Date.now()}`);
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/todo', todoRouter);
  app.use('/api/user', userRouter);

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
}

main().catch(console.log).finally(process.exit);
