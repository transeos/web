import { Subjects, Publisher, SignInEvent } from 'common';

export class SignUpEventPublisher extends Publisher<SignInEvent> {
  readonly subject = Subjects.SignedUp;
}

export class SignInEventPublisher extends Publisher<SignInEvent> {
  readonly subject = Subjects.SignedIn;
}

export class AccountDeletedEventPublisher extends Publisher<SignInEvent> {
  readonly subject = Subjects.AccountDeleted;
}
