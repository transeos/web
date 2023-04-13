import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { AccountDeleteListener, SignInListener, SignUpListener } from './events/created-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

// When connected, print a message and set up the listener
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new SignInListener(stan).listen();
  new SignUpListener(stan).listen();
  new AccountDeleteListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
