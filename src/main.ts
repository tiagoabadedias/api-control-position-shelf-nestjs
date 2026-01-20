import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS se necessário
  app.enableCors();
  
  // Configurar validação global
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  
  // Para serverless functions no Vercel, precisamos exportar o handler
  await app.init();
  
  return app;
}

// Para desenvolvimento local
if (require.main === module) {
  bootstrap().then(app => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`[NestJS] API rodando na porta ${port}`);
  });
}

// Export para Vercel
export default async (req: any, res: any) => {
  const app = await bootstrap();
  const httpAdapter = app.getHttpAdapter();
  return httpAdapter.getInstance()(req, res);
};