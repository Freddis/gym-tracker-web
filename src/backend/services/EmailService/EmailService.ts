import {Logger} from '../../utils/Logger/Logger';
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import {EmailServiceConfig} from './types/EmailServiceConfig';

export class EmailService {
  protected logger: Logger;
  protected client: SESClient;
  protected config: EmailServiceConfig;

  constructor(config: EmailServiceConfig) {
    this.logger = new Logger(EmailService.name);
    this.config = config;
    this.client = new SESClient({
      // region: 'eu-west-1',
      // credentials: {
      //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      // },
    });
  }
  public async send(to: string, subject:string, body:string): Promise<void> {
    this.logger.info('Sending email', {to, subject});
    const command = new SendEmailCommand({
      Source: this.config.from, // must be verified in SES
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {Data: subject},
        Body: {
          Text: {Data: body},
          // Html: {Data: '<h1>Hello from SES</h1><p>This is a test email.</p>'},
        },
      },
    });

    try {
      const response = await this.client.send(command);
      this.logger.info('Email sent successfully:', {MessageId: response.MessageId});
    } catch (err) {
      this.logger.error('Error sending email:', err);
    }
  }
}
