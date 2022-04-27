import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    // receive the event
    console.log(orderCreatedEvent);
    // go to the auth service and get the user associated with this event
    // in this event we need to wait the response :)
    // in kafka a reply is its own topic => we send a message on searate topic and
    // and we recieve message back on different topic
    // ==>  nestJS must subscribe to the new topic
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(
          `Billing user with stripe ID ${user.stripeUserId} for a price of ${orderCreatedEvent.price}`,
        );
      });
  }
}
