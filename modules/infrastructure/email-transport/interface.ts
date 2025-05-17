import { Context, Effect } from 'effect';
import { SendMailOptions } from 'nodemailer';

export type EmailTransport = {
  sendMail: (args: SendMailOptions) => Effect.Effect<void>;
};

export const EmailTransport =
  Context.GenericTag<EmailTransport>('email-transport');
