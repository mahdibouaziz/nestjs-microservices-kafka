import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['127.0.0.1:9092'],
        },
        consumer: {
          groupId: 'billing-consumer',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
