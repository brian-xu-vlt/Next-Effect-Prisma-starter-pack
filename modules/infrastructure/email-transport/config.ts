import { Config } from 'effect';

export const EmailTransportEnvs = Config.all({
  emailServerHost: Config.string('EMAIL_SERVER_HOST'),
  emailServerPort: Config.number('EMAIL_SERVER_PORT'),
  emailServerUser: Config.string('EMAIL_SERVER_USER'),
  emailServerPassword: Config.string('EMAIL_SERVER_PASSWORD'),
  emailFixedBcc: Config.string('EMAIL_FIXED_BCC').pipe(
    Config.withDefault(undefined),
  ),
});

export const EmailTransportConfig = EmailTransportEnvs;
