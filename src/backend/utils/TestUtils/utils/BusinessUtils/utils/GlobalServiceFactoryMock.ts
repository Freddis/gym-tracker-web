import {GlobalServiceFactory} from '../../../../GlobalServiceFactory/GlobalServiceFactory';
import {EmailServiceMock} from './EmailServiceMock';

export class GlobalServiceFactoryMock extends GlobalServiceFactory {
  protected emailService = new EmailServiceMock(this.config.services.email);

  override async email(): Promise<EmailServiceMock> {
    return this.emailService;
  }

  getConfig() {
    return this.config;
  }
}
