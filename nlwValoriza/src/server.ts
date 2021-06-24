import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import './database';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    return res.status(400).json({
      error: err.message,
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(3333, () => console.log('🔥 Server is running 🔥'));