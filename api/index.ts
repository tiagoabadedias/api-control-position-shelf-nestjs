import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

const server = express();

const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    { cors: true }
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  return app.init();
};

createNestServer(server)
  .then(() => console.log('[Vercel] NestJS server initialized'))
  .catch(err => console.error('[Vercel] NestJS server init error:', err));

export default server;