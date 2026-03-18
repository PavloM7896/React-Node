import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  const port = process.env.PORT || 5050;
  await app.listen(port);
  console.log(`API running at http://localhost:${port}`);
}

bootstrap();
