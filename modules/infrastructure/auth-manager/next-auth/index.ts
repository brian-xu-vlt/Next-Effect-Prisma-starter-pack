import { Effect, pipe } from 'effect';
import { EmailTransportConfig } from 'modules/infrastructure/email-transport/config';
import { EmailTransport } from 'modules/infrastructure/email-transport/interface';
import { EmailTransportLayerLive } from 'modules/infrastructure/email-transport/live';
import { appRunPromise } from 'modules/infrastructure/runtime';
import { nanoid } from 'nanoid';
import { NextAuthConfig } from 'next-auth';

export const EMAIL_LINKS_MAX_AGE_30_MINUTES = 30 * 60;
export const generateVerificationToken = nanoid(32);

const providers = [];

if (process.env.NEXT_RUNTIME !== 'edge') {
  const { default: Nodemailer } = await import(
    'next-auth/providers/nodemailer'
  );

  const serverConfig = () =>
    pipe(
      EmailTransportConfig,
      Effect.andThen(config => ({
        host: config.emailServerHost,
        port: config.emailServerPort,
        auth: {
          user: config.emailServerUser,
          pass: config.emailServerPassword,
        },
      })),
      Effect.runSync,
    );

  const emailProvider = Nodemailer({
    server: serverConfig(),
    from: 'Me',
    generateVerificationToken: () => generateVerificationToken,
    sendVerificationRequest: args =>
      pipe(
        EmailTransport,
        Effect.andThen(transport =>
          transport.sendMail({
            from: 'Me',
            to: args.identifier,
            subject: 'Login',
            html: `<a href="${args.url}">${args.url}</a>`,
          }),
        ),
        Effect.provide(EmailTransportLayerLive),
        appRunPromise,
      ),
    maxAge: EMAIL_LINKS_MAX_AGE_30_MINUTES,
  });

  providers.push(emailProvider);
}

export const authOptions: NextAuthConfig = {
  providers: providers,
};
