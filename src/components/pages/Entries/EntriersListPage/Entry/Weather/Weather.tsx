import {WeatherEntry} from 'src/server/model/Entry/validators/WeatherEntry';
import {OpenApiResponse} from 'src/types/OpenApiResponse';
import {EntryContainer} from '../EntryContainer/EntryContainer';

export function Weather(props: {item: OpenApiResponse<WeatherEntry>}) {

  const celiusTemp = Math.round(props.item.data.temperature_current - 273.3);

  return <EntryContainer item={props.item}>
          <div style={{marginBottom: 20}}>
           <div>Temperature: {celiusTemp.toFixed(0)}°</div>
          </div>
        </EntryContainer>;
}
