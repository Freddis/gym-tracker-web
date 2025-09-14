import {ArgusWeatherCheckin} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusWeatherCheckin';
import {ArgusCheckinContainer} from '../ArgusCheckinContainer/ArgusCheckinContainer';

export function ArgusWeatherCheckinBlock(props: {item: ArgusWeatherCheckin}) {

  const celiusTemp = Math.round(props.item.data.temperature_current - 273.3);

  return <ArgusCheckinContainer item={props.item}>
          <div className="mb-10">
           <div>Temperature: {celiusTemp.toFixed(0)}°</div>
          </div>
        </ArgusCheckinContainer>;
}
