import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS se necessário
  app.enableCors();
  
  // Configurar validação global
  app.useGlobalPipes();
  
  // Porta padrão 3000, mas pode ser alterada via ENV (importante para Vercel)
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  
  
  // Log apenas em desenvolvimento
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[NestJS] API de controle de posição de prateleira rodando na porta ${port}`);
    console.log(`[NestJS] Endpoints disponíveis:`);
    console.log(`[NestJS] POST http://localhost:${port}/executar`);
    console.log(`[NestJS] GET  http://localhost:${port}/status`);
  }
}

bootstrap();