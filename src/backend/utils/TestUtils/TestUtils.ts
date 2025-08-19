import {BusinessUtils} from './utils/BusinessUtils';
import {FrontendUtils} from './utils/FrontendUtils/FrontendUtils';
import {OpenApiUtils} from './utils/OpenApiUtils';
import {SeedUtils} from './utils/SeedingUtils';

export class TestUtils {
  static readonly seed = SeedUtils;
  static readonly business = BusinessUtils;
  static readonly openApi = OpenApiUtils;
  static readonly frontend = FrontendUtils;
}
