import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry, Weight} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockHeader} from './EntryBlockHeader';
import 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import {ChartData, ChartOptions} from 'chart.js';
import {StrictPick} from '../../../../../../backend/types/StrictPick';

export const WeightEntryBlock: FC<{weight: Weight, entry: Entry, own?: boolean}> = ({weight, entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.weight);

  const buildWeightChartData = (
    history: StrictPick<Weight, 'createdAt' | 'weight'>[],
    historySize: number,
    endDate: Date = new Date()
  ): ChartData<'line', Array<number | undefined>, string> => {
    const HOUR = 1000 * 60 * 60;
    const DAYS = historySize;
    const from = endDate.getTime();
    const to = from - DAYS * 24 * HOUR;

  // Sort ascending
    const weights = [...history].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );
    const labels: string[] = [];
    const values: Array<number | undefined> = [];
    let weightIndex = 0;
    let currentWeight: StrictPick<Weight, 'createdAt' | 'weight'> | undefined;
    for (let time = to; time <= from; time += HOUR) {
      const currentDate = new Date(time);

     // Advance weights while entries are before current hour
      let weight = weights[weightIndex];
      while (weight && weight.createdAt.getTime() <= time) {
        currentWeight = weight;
        weightIndex++;
        weight = weights[weightIndex];
      }
      values.push(currentWeight?.weight);
      currentWeight = undefined;

      // Show label only once per day
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const label = `${day}/${month}`;
      labels.push(label);
    }

    return {
      labels: labels,
      datasets: [
        {
          label: '',
          data: values,
          fill: false,
          tension: 0.4,
          spanGaps: true,
        },
      ],
    };
  };
  const data = buildWeightChartData([...weight.history, weight], weight.historySize, entry.time);
  const chartOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    plugins: {legend: {display: false}},
  };
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader entry={entry} own={own} to={route(RouteId.WeightUpdate)} params={{id: entry.id.toString()}} title={t(i18n.type)} />
      <div className="flex flex-col">
        <div></div>
      </div>
      <div className="mt-5 flex flex-row justify-center items-end">
          <div className="text-5xl font-normal">{weight.weight.toFixed(2)}</div>
          <div className="text-lg font-semibold">{weight.units}</div>
      </div>
      <div className="w-full h-50 mt-5">
        <Line data={data} options={chartOptions} />
      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
