// TODO update this file later
import { OrderStatus } from './enums';
import { UserSigning, Analytics, Subjects } from './enums';

export interface SignInEvent {
  subject: Subjects;
  data: {
    userId: string;
    emailId: string;
    deviceIp: string;
    time: Date;
    type: UserSigning;
  };
}

export interface AnalyticsSignInEvent {
  subject: Subjects;
  data: {
    userId: string;
    deviceIp: string;
    time: Date;
    type: Analytics;
  };
}

export interface Event {
  subject: Subjects;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}

export interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
