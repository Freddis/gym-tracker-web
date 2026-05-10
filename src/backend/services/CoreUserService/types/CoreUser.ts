import {Country} from '../../../types/Country';
import {DistanceUnit} from '../../../types/DistanceUnit';
import {Gender} from '../../../types/Gender';
import {HeightUnit} from '../../../types/HeightUnit';
import {TemperatureUnit} from '../../../types/TemperatureUnit';
import {WeightUnit} from '../../../types/WeightUnit';
import {EntryVisibility} from '../../EntryService/types/EntryVisibility';
import {Image} from '../../ImageService/types/Image';

export interface CoreUser {
  id: number
  name: string
  note: string | null
  password: string
  email: string
  profilePicture: Image | null
  height: number
  heightUnit: HeightUnit
  weightUnit: WeightUnit
  temperatureUnit: TemperatureUnit
  distanceUnit: DistanceUnit
  gender: Gender
  birthDate: Date
  visibility: EntryVisibility
  country: Country
}
