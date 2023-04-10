import { Subjects, Publisher, SignInEvent, AnalyticsSignInEvent } from "common";

export class SignInEventPublisher extends Publisher<SignInEvent> {
  readonly subject = Subjects.SignedIn;
}

export class SignOutEventPublisher extends Publisher<SignInEvent> {
  readonly subject = Subjects.SignedOut;
}

export class SignUpEventPublisher extends Publisher<SignInEvent> {
  readonly subject = Subjects.SignedUp;
}

export class AccountDeletedEventPublisher extends Publisher<SignInEvent> {
  readonly subject = Subjects.AccountDeleted;
}
