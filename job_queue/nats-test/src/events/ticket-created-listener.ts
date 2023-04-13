import { Message } from 'node-nats-streaming';
import { Listener, SignInEvent, Subjects, TicketCreatedEvent } from 'common';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    // Acknowledge the message after it has been processed
    msg.ack();
  }
}

export class SignInListener extends Listener<SignInEvent> {
  readonly subject = Subjects.SignedIn;
  queueGroupName = 'payments-service2';

  onMessage(data: SignInEvent['data'], msg: Message) {
    console.log('Event data!', data);

    // Acknowledge the message after it has been processed
    msg.ack();
  }
}
