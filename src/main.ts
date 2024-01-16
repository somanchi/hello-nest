import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/http.exception.filter';
import { ConfigService } from '@nestjs/config';
import { kafkaConfig } from './configurations/kafka.config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { NotFoundExcetionFilter } from './exceptions/notfound.excetion.filter';
import { HttpAdapterHost } from '@nestjs/core';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const appPort = configService.get('app.port');
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new NotFoundExcetionFilter(),
  );
  const options = new DocumentBuilder()
    .setTitle('nodeasync')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/doc', app, document);
  await NestFactory.createMicroservice(AppModule, {});
  app.connectMicroservice(
    kafkaConfig(['localhost:29092'], 'default-user', 'default-group'),
  );
  await app.startAllMicroservices();
  await app.listen(appPort, () => {
    console.log('app is running on port', appPort);
  });
};
bootstrap();
