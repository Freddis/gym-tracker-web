import {FatsecretFoodSearchResponse} from '../../../../../../services/FatsecretService/types/FatsecretFoodSearchResponse';
import {FatsecretApiClient} from '../../../../../../services/FatsecretService/services/FatsecretApiClient/FatsecretApiClient';
import {
  FatsecretBarcodeScanResponse,
} from '../../../../../../services/FatsecretService/services/FatsecretApiClient/types/FatsecretBarcodeScanResponseSchema';

export class FatsecretApiClientMock extends FatsecretApiClient {
  protected nextSearchResponse: FatsecretFoodSearchResponse | null = null;
  protected nextBarcodeScanResponse: FatsecretBarcodeScanResponse | null = null;

  mockNextBarcodeScanResponse(response: FatsecretBarcodeScanResponse) {
    this.nextBarcodeScanResponse = response;
  }

  mockNextSearchResponse(response: FatsecretFoodSearchResponse) {
    this.nextSearchResponse = response;
  }

  override async searchFood(): Promise<FatsecretFoodSearchResponse> {
    if (this.nextSearchResponse) {
      const response = this.nextSearchResponse;
      this.nextSearchResponse = null;
      return response;
    }
    throw new Error('No search search response mocked. Preventing send to the prod server.');
  }

  override async bardcodeScan(): Promise<FatsecretBarcodeScanResponse | null> {
    if (this.nextBarcodeScanResponse) {
      const response = this.nextBarcodeScanResponse;
      this.nextBarcodeScanResponse = null;
      return response;
    }
    throw new Error('No search barcode response mocked. Preventing send to the prod server.');
  }
}
