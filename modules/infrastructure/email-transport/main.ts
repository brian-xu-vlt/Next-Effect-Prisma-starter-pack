import { Cause, Effect, Layer, Schedule } from 'effect';
import { EmailTransportConfig } from 'modules/infrastructure/email-transport/config';

import { EmailTransport } from 'modules/infrastructure/email-transport/interface';
import { addFixedBcc } from 'modules/infrastructure/email-transport/lib';

const retryPolicy = Schedule.addDelay(
  Schedule.recurs(3), // Retry for a maximum of 3 times
  () => '100 millis', // Add a delay of 100 milliseconds between retries
);

export const EmailTransportLayer = Layer.effect(
  EmailTransport,
  Effect.gen(function* () {
    const config = yield* EmailTransportConfig;

    const transporter = yield* Effect.tryPromise(
      () => import('nodemailer'),
    ).pipe(
      Effect.andThen(nodemailer =>
        nodemailer.createTransport({
          host: config.emailServerHost,
          port: config.emailServerPort,
          auth: {
            user: config.emailServerUser,
            pass: config.emailServerPassword,
          },
        }),
      ),
    );

    const sendMail: EmailTransport['sendMail'] = mailOptions =>
      Effect.gen(function* (_) {
        const adjustedMailOptions = addFixedBcc(
          mailOptions,
          config.emailFixedBcc,
        );
        yield* _(
          Effect.tryPromise(() => transporter.sendMail(adjustedMailOptions)),
          Effect.retry(retryPolicy),
          Effect.catchAll(err =>
            Effect.logError(Cause.fail(err), 'Failed to send email'),
          ),
        );
      });

    return EmailTransport.of({
      sendMail,
    });
  }),
);
