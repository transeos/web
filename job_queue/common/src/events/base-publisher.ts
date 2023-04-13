import { Stan } from 'node-nats-streaming';
import { Event } from './types/interfaces';

// Create an abstract Publisher class that expects a generic Event type
export abstract class Publisher<T extends Event> {
  abstract readonly subject: T['subject'];

  // Declare a property for the NATS client
  protected client: Stan;

  // Constructor that accepts a NATS client
  constructor(client: Stan) {
    this.client = client;
  }

  // Publish method that takes the data to be published
  // and returns a Promise that resolves when the publish action is successful
  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      // Use the NATS client to publish the data as a JSON string
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }

        console.log('Event published to subject', this.subject);
        resolve();
      });
    });
  }
}
