import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { config } from './config/config';
import { ServerExceptionFilter } from './filters/server-exception/server-exception.filter';

async function bootstrap() {
  console.log(config());
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ServerExceptionFilter())
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port') || 3000;
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}`);
  });
}
bootstrap();
