import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ServerExceptionFilter } from './filters/server-exception/server-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ServerExceptionFilter());
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port') || 3000;
  await app.listen(PORT, '0.0.0.0');
  logger.log(`Application running on http://localhost:${PORT}`);
}
bootstrap();
