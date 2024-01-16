import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

export const kafkaConfig = (
  brokers: string[],
  brokerUser: string,
  brokerGroup: string,
) => {
  return {
    transport: Transport.KAFKA,
    options: {
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.DefaultPartitioner,
      },
      client: {
        clientId: brokerUser,
        brokers: brokers,
      },
      consumer: {
        groupId: brokerGroup,
        allowAutoTopicCreation: true,
      },
    },
  };
};
