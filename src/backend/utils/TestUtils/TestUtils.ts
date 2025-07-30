import {BusinessUtils} from './utils/BusinessUtils';
import {OpenApiUtils} from './utils/OpenApiUtils';
import {SeedUtils} from './utils/SeedingUtils';

export class TestUtils {
  static seed = SeedUtils;
  static business = BusinessUtils;
  static openApi = OpenApiUtils;
}
