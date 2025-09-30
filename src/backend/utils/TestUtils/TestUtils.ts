import {BusinessUtils} from './utils/BusinessUtils/BusinessUtils';
import {FrontendUtils} from './utils/FrontendUtils/FrontendUtils';
import {OpenApiUtils} from './utils/OpenApiUtils';
import {SeedUtils} from './utils/SeedingUtils';
import {TimeUtils} from './utils/TimeUtils';

export class TestUtils {
  static readonly seed = SeedUtils;
  static readonly business = BusinessUtils;
  static readonly openApi = OpenApiUtils;
  static readonly frontend = FrontendUtils;
  static readonly time = TimeUtils;
}
