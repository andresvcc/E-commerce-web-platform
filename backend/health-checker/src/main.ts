import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('port');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  const busConfig = config.get('busConfig');

  app.connectMicroservice<MicroserviceOptions>(busConfig, {
    inheritAppConfig: true,
  });

  await app.startAllMicroservices();
  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
}
bootstrap();
