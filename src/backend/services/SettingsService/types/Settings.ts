import {Country} from '../../../types/Country';
import {DistanceUnit} from '../../../types/DistanceUnit';
import {Gender} from '../../../types/Gender';
import {HeightUnit} from '../../../types/HeightUnit';
import {TemperatureUnit} from '../../../types/TemperatureUnit';
import {WeightUnit} from '../../../types/WeightUnit';
import {EntryVisibility} from '../../EntryService/types/EntryVisibility';
import {Image} from '../../ImageService/types/Image';

export interface Settings {
  name: string;
  note: string | null;
  height: number;
  weight: number | null;
  gender: Gender;
  birthDate: Date;
  country: Country;
  profilePicture: Image | null;
  units: {
    weight: WeightUnit;
    distance: DistanceUnit;
    height: HeightUnit;
    temperature: TemperatureUnit;
  }
  security: {
    email: string;
    visibility: EntryVisibility;
  }
}
