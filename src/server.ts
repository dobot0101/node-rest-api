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

  // error handling 테스트를 위한 route
  app.get(
    '/',
    async (req, res, next) => {
      // 동기식 처리
      // error를 error handler middle ware로 넘김
      // throw new Error('Broken');

      // 비동기식 처리
      async function test() {
        throw new Error('test error');
      }
      try {
        await test();
      } catch (err) {
        // 다음 handler의 second function을 출력
        // next();

        // 비동기 함수에서 반환하는 에러를 처리하려면 반드시 next(err) 를 호출해야함
        // Error를 처리하도록 설정된 handler를 제외하고 나머지 handler를 skip
        // 다음 handler의 second function 을 출력하지 않고, 
        // 다음 Error Handler인 clientErrorHandler를 실행
        next(err);
      }
    },
    async (req, res, next) => {
      console.log('second function');
      next();
    }
  );

  app.use(clientErrorHandler);
  app.use(logErrors);

  function clientErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(`clientErrorHandler: ${err.stack}`);
    res.status(500).send('Something broke!');

    // 아래의 app.use(logErrors)로 error 처리를 넘김
    next(err);
  }

  function logErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(`logErrors: ${err.stack}`);

    // express의 기본 error handler로 err 전달
    next(err);
  }

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
}

main().catch(console.log);
