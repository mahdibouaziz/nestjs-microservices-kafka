import { Injectable } from '@nestjs/common';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  private readonly users = [
    {
      userId: '123',
      stripeUserId: '45625',
    },
    {
      userId: '124',
      stripeUserId: '99865',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getUser(getUserRequest: GetUserRequest) {
    console.log(getUserRequest);
    return this.users.find((user) => user.userId === getUserRequest.userId);
  }
}
