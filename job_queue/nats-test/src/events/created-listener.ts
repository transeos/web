import { Message } from 'node-nats-streaming';
import { Listener, SignInEvent, Subjects } from 'common';

export class SignUpListener extends Listener<SignInEvent> {
  readonly subject = Subjects.SignedUp;
  queueGroupName = 'user-sign-up';

  onMessage(data: SignInEvent['data'], msg: Message) {
    console.log('Event data!', data);

    // Acknowledge the message after it has been processed
    msg.ack();
  }
}

export class SignInListener extends Listener<SignInEvent> {
  readonly subject = Subjects.SignedIn;
  queueGroupName = 'user-sign-in';

  onMessage(data: SignInEvent['data'], msg: Message) {
    console.log('Event data!', data);

    // Acknowledge the message after it has been processed
    msg.ack();
  }
}

export class AccountDeleteListener extends Listener<SignInEvent> {
  readonly subject = Subjects.AccountDeleted;
  queueGroupName = 'user-account-delete';

  onMessage(data: SignInEvent['data'], msg: Message) {
    console.log('Event data!', data);

    // Acknowledge the message after it has been processed
    msg.ack();
  }
}