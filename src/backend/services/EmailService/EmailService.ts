import {Logger} from '../../utils/Logger/Logger';
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import {EmailServiceConfig} from './types/EmailServiceConfig';
import {Environment} from '../../types/Environment';

export class EmailService {
  protected logger: Logger;
  protected client: SESClient;
  protected config: EmailServiceConfig;

  constructor(config: EmailServiceConfig) {
    this.logger = new Logger(EmailService.name);
    this.config = config;
    this.client = new SESClient();
  }

  public async send(to: string, subject:string, body:string): Promise<void> {
    this.logger.info('Sending email', {from: this.config.from, to, subject});
    if (this.config.environment !== Environment.production) {
      this.logger.info('Skipping email sending in test environment', {body});
      return;
    }
    const source = this.config.fromName
      ? `"${this.config.fromName}" <${this.config.from}>`
      : this.config.from;
    const command = new SendEmailCommand({
      Source: source,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {Data: subject},
        Body: {
          // Text: {Data: body},
          Html: {Data: body},
        },
      },
    });

    try {
      const response = await this.client.send(command);
      this.logger.info('Email sent successfully:', {MessageId: response.MessageId});
    } catch (err) {
      this.logger.error('Error sending email:', err);
      throw err;
    }
  }
}
