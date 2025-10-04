import {EmailService} from '../../../../../services/EmailService/EmailService';

export class EmailServiceMock extends EmailService {
  protected messages: {
    to: string,
    subject: string,
    body: string,
  }[] = [];

  public override async send(to: string, subject: string, body: string): Promise<void> {
    this.logger.info('Sending mock email', {to, subject});
    this.messages.push({
      to,
      subject,
      body,
    });
  }

  public getLastEmail() {
    return this.messages[this.messages.length - 1] ?? null;
  }

}
