import {GlobalServiceFactory} from '../../../../GlobalServiceFactory/GlobalServiceFactory';
import {EmailServiceMock} from './EmailServiceMock';
import {FatsecretApiClientMock} from './FatsecretApiClientMock/FatsecretApiClientMock';
import {ManagedImageServiceMock} from './ManagedImageServiceMock';

export class GlobalServiceFactoryMock extends GlobalServiceFactory {
  protected emailService = new EmailServiceMock(this.config.services.email);
  protected fatsecretApiClientMockCached?: FatsecretApiClientMock | undefined;

  override async email(): Promise<EmailServiceMock> {
    return this.emailService;
  }

  override async managedImage(): Promise<ManagedImageServiceMock> {
    return new ManagedImageServiceMock(await this.drizzle());
  }

  getConfig() {
    return this.config;
  }

  public override async fatsecretApiClient(): Promise<FatsecretApiClientMock> {
    if (!this.fatsecretApiClientMockCached) {
      this.fatsecretApiClientMockCached = new FatsecretApiClientMock(this.config.services.fatsecret.apiClient, await this.redis());
    }
    return this.fatsecretApiClientMockCached;
  }

  public override async cachingFatsecretApiClient() {
    return super.cachingFatsecretApiClient();
  }
}
