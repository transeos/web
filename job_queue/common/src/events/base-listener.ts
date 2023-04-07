import { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';
import { Event } from './types/interfaces';

// Create an abstract Listener class that expects a generic Event type
export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;

  // Declare properties for the NATS client and acknowledgement wait time
  protected client: Stan;
  protected ackWait = 5 * 1000;

  // Constructor that accepts a NATS client
  constructor(client: Stan) {
    this.client = client;
  }

  // Define subscription options for NATS client
  subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  // Start listening to messages from the NATS client
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions(),
    );

    // Handle incoming messages
    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  // Parse the message data from the NATS client
  parseMessage(msg: Message): T['data'] {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
