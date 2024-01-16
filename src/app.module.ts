import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.mutation.controller';
import { CarQueryController } from './controllers/car.query.controller';
import { CarRepository } from './repositories/car.repository';
import { CarService } from './services/car.service';
import { HealthController } from './controllers/health.controller';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Car } from './models/car';
import { CarSchema } from './models/Car';
import { MongoConfig } from './configurations/mongo.config';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { KafkaConsumer } from './events/consumer';
import { KafkaProducer } from './events/producer';
import { kafkaConfig } from './configurations/kafka.config';
import { Partitioners } from 'kafkajs';
import appconfiguration from './configurations/app.configuration';
@Module({
  controllers: [
    CarController,
    CarQueryController,
    HealthController,
    KafkaConsumer,
  ],
  providers: [CarService, CarRepository, KafkaProducer],
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MongoConfig,
    }),
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appconfiguration],
    }),
    ClientsModule.register([
      {
        name: 'DEFAULT',
        transport: Transport.KAFKA,
        options: {
          producer: {
            allowAutoTopicCreation: true,
            createPartitioner: Partitioners.DefaultPartitioner,
          },
          client: {
            clientId: 'default-user',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'default-group',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
})
export class AppModule {}
