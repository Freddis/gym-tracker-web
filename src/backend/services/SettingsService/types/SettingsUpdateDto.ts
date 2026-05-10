import {Country} from '../../../types/Country';
import {DistanceUnit} from '../../../types/DistanceUnit';
import {Gender} from '../../../types/Gender';
import {HeightUnit} from '../../../types/HeightUnit';
import {TemperatureUnit} from '../../../types/TemperatureUnit';
import {WeightUnit} from '../../../types/WeightUnit';
import {ImageUpsertDto} from '../../EntryService/types/EntryUpsertDto';
import {EntryVisibility} from '../../EntryService/types/EntryVisibility';

export interface SettingsUpdateDto {
  name: string;
  note: string | null;
  height: number;
  gender: Gender;
  birthDate: Date;
  country: Country;
  profilePicture?: ImageUpsertDto | null,
  units: {
    weight: WeightUnit;
    distance: DistanceUnit;
    height: HeightUnit;
    temperature: TemperatureUnit;
  }
  security: {
    visibility: EntryVisibility;
  }
}
