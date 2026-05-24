import {FC, useContext} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {CalorieGoal, ConsumedCalories, ConsumedCaloriesHistory, UnitSettings} from '../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {ChartData, ChartOptions} from 'chart.js';
import {Bar, Doughnut, Pie} from 'react-chartjs-2';
import {customColors} from '../../../../../../common/utils/design-system/customColors';
import {ThemeContext} from '../../../../../../common/components/layout/ThemeProvider/context/ThemeContext';
import {Theme} from '../../../../../../common/components/layout/ThemeProvider/enums/Theme';
import {FoodUtility} from '../../../../../../../common/utils/FoodUtility/FoodUtility';
import {FoodMacros} from '../../../../../../../common/utils/FoodUtility/types/FoodMacros';

interface CalorieGoalBlockProps {
  goal: CalorieGoal;
  consumedCalories: ConsumedCalories;
  units: UnitSettings;
  history: ConsumedCaloriesHistory;
}

export const CalorieGoalBlock: FC<CalorieGoalBlockProps> = (props) => {
  const foodUtility = new FoodUtility();
  const {goal, consumedCalories} = props;
  const t = useAppPartialTranslation((x) => x.pages.profile);
  const theme = useContext(ThemeContext);
  const bgColor = theme === Theme.Dark ? '#111' : '#eee';
  const calories: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [Math.round(consumedCalories.calories), Math.max(0, Math.round(goal.calories - consumedCalories.calories))],
      backgroundColor: [
        customColors.calories,
        bgColor,
      ],
      borderWidth: 0,
      borderRadius: 0,
      circumference: 360,
    }],
  };
  const pieCalories: ChartData<'pie', number[], string> = {
    labels: [
      t.f((x) => x.pages.food.list.labels.protein),
      t.f((x) => x.pages.food.list.labels.fat),
      t.f((x) => x.pages.food.list.labels.carbs),
    ],
    datasets: [
      {
        label: t.f((x) => x.utils.objects.foodUnits.Gram),
        data: [
          Math.round(consumedCalories.protein),
          Math.round(consumedCalories.fat),
          Math.round(consumedCalories.carbs),
        ],
        backgroundColor: [
          customColors.protein,
          customColors.fat,
          customColors.carbs,
        ],
      },
    ],
  };
  const protein: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [Math.round(consumedCalories.protein), Math.max(0, Math.round((goal.protein ?? 0) - consumedCalories.protein))],
      backgroundColor: [
        customColors.protein,
        bgColor,
      ],
      borderWidth: 0,
    }],
  };
  const fat: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [Math.round(consumedCalories.fat), Math.max(0, Math.round((goal.fat ?? 0) - consumedCalories.fat))],
      backgroundColor: [
        customColors.fat,
        bgColor,
      ],
      borderWidth: 0,
    }],
  };
  const carbs: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [Math.round(consumedCalories.carbs), Math.max(0, Math.round((goal.carbs ?? 0) - consumedCalories.carbs))],
      backgroundColor: [
        customColors.carbs,
        bgColor,
      ],
      borderWidth: 0,
    }],
  };

  const buildChart = (
    history: {value: ConsumedCalories, date: Date}[],
    historySize: number,
    endDate: Date = new Date()
  ): {labels: string[], values: Array<ConsumedCalories | undefined>} => {
    const DAY = 1000 * 60 * 60 * 24;
    const DAYS = historySize;
    const from = endDate.getTime();
    const to = from - DAYS * DAY;

  // Sort ascending
    const weights = [...history].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
    const labels: string[] = [];
    const values: Array<ConsumedCalories | undefined> = [];
    let weightIndex = 0;
    let currentPoint: {value: ConsumedCalories, date: Date} | undefined;
    for (let time = to; time <= from; time += DAY) {
      const currentDate = new Date(time);

     // Advance weights while entries are before current hour
      let point = weights[weightIndex];
      while (point && point.date.getTime() <= time) {
        currentPoint = point;
        weightIndex++;
        point = weights[weightIndex];
      }
      values.push(currentPoint?.value ? currentPoint.value : undefined);
      currentPoint = undefined;

      // Show label only once per day
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const label = `${day}/${month}`;
      labels.push(label);
    }
    return {labels, values};

  };
  const buildTooltip = (index: number, macro: FoodMacros, label?: string) => {
    const data = values[index];
    if (!data) {
      return '';
    }
    // const calories = Math.round(foodUtility.macroToCalories(macro, data[macro]));
    const grams = Math.round(data[macro]);
    const lines: string[] = [];
    lines.push(`${label}: ${grams} ${t.f((x) => x.utils.objects.foodUnits.Gram)}`);
    // lines.push(`${calories} ${t.f((x) => x.utils.objects.food.fields.calories)}`);
    return lines.join(', ');
  };

  const historyWithoutToday = props.history.data.filter((item) => item.date.toDateString() !== new Date().toDateString());
  const {labels, values} = buildChart(historyWithoutToday, props.history.size, new Date(new Date().getTime() - 1000 * 60 * 60 * 24));
  const chartData: ChartData<'bar', Array<number | undefined>, string> = {
    labels: labels,
    datasets: [
      {
        label: t.f((x) => x.utils.objects.food.fields.protein),
        data: values.map((value) => value?.protein ? Math.round(value.protein) * 4 : undefined),
        backgroundColor: [customColors.protein],
        tooltip: {
          callbacks: {
            label: (context) => buildTooltip(context.dataIndex, FoodMacros.Protein, context.dataset.label),
          },
        },
      },
      {
        label: t.f((x) => x.utils.objects.food.fields.fat),
        data: values.map((value) => value?.fat ? Math.round(value.fat) * 9 : undefined),
        backgroundColor: [customColors.fat],
        tooltip: {
          callbacks: {
            label: (context) => buildTooltip(context.dataIndex, FoodMacros.Fat, context.dataset.label),
          },
        },
      },
      {
        label: t.f((x) => x.utils.objects.food.fields.carbs),
        data: values.map((value) => value?.carbs ? Math.round(value.carbs) * 4 : undefined),
        backgroundColor: [customColors.carbs],
        tooltip: {
          callbacks: {
            label: (context) => buildTooltip(context.dataIndex, FoodMacros.Carbs, context.dataset.label),
          },
        },
      },
    ],

  };
  const chartOptions: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
    interaction: {
      mode: 'x',
      intersect: true,
    },
    plugins: {
      tooltip: {
        callbacks: {
          footer: (context) => {
            const index = context[0]?.dataIndex;
            if (!index) {
              return '';
            }
            const value = values[index];
            if (!value) {
              return '';
            }
            const calories = Math.round(foodUtility.macrosToCalories(value.protein, value.carbs, value.fat));
            const deviation = calories - props.goal.calories;
            const deviationPercentage = (deviation / props.goal.calories * 100).toFixed(1);
            const deviationSign = deviation > 0 ? '+' : '';
            const deviationLine = `${deviationSign}${deviation.toFixed(0)} (${deviationPercentage}%)`;
            return `${calories} ${t.f((x) => x.utils.objects.food.fields.calories)},  ${deviationLine}`;
          },
        },
      },
      legend: {display: false},
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            yMin: props.goal.calories,
            yMax: props.goal.calories,
            borderColor: customColors.calories,
            borderWidth: 1,
            borderDash: [6, 6],
            label: {
              display: false,
              content: `Target: ${props.goal.calories}`,
              position: 'end',
              backgroundColor: customColors.calories,
              color: 'white',
            },
          },
        },
      },
    },
  };
  const deviation = historyWithoutToday.reduce(
    (acc, curr) => acc + (curr.value.calories - props.goal.calories
  ), 0) / historyWithoutToday.length;
  const deviationPercentage = (deviation / props.goal.calories * 100).toFixed(1);
  return (
    <AppBlock>
    <div className="w-full flex flex-row gap-5 items-center">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
        <div className="text-md font-semibold mb-5 grow">{t.f((x) => x.pages.activities.list.objects.calorieGoal.type)}</div>
        <div className="text-md font-semibold mb-5">{t.p((x) => x.labels.from)} {goal.start.toLocaleDateString()}</div>
        </div>
        <div className="h-20 grid grid-cols-5">
          <div className="h-20">
            <Pie data={pieCalories} options={{maintainAspectRatio: false, plugins: {legend: {display: false}}}} />
          </div>
          <div className="h-20">
            <Doughnut data={calories} options={{maintainAspectRatio: false, plugins: {legend: {display: false}}}} />
          </div>
          <div className="h-20">
            <Doughnut data={protein} options={{maintainAspectRatio: false, plugins: {legend: {display: false}}}} />
          </div>
          <div className="h-20">
            <Doughnut data={fat} options={{maintainAspectRatio: false, plugins: {legend: {display: false}}}} />
          </div>
          <div className="h-20">
            <Doughnut data={carbs} options={{maintainAspectRatio: false, plugins: {legend: {display: false}}}} />
          </div>
        </div>
        <div className="grid grid-cols-5 text-center">
          <div>
          </div>
          <div>
            <div className="text-base">{consumedCalories.calories.toFixed(0)}/{goal.calories.toFixed(0)}</div>
            <div>{t.f((x) => x.utils.objects.food.fields.calories)}</div>
          </div>
          <div>
            <div className="text-base">
              {consumedCalories.protein.toFixed(0)}{goal.protein ? `/${goal.protein.toFixed(0)}` : ''}
              {t.f((x) => x.utils.objects.foodUnits.Gram)}
            </div>
            <div>{t.f((x) => x.utils.objects.food.fields.protein)}</div>
          </div>
          <div>
            <div className="text-base">
              {consumedCalories.fat.toFixed(0)}{goal.fat ? `/${goal.fat.toFixed(0)}` : ''}
              {t.f((x) => x.utils.objects.foodUnits.Gram)}
            </div>
            <div>{t.f((x) => x.utils.objects.food.fields.fat)}</div>
          </div>
          <div>
            <div className="text-base">
              {consumedCalories.carbs.toFixed(0)}{goal.carbs ? `/${goal.carbs.toFixed(0)}` : ''}
              {t.f((x) => x.utils.objects.foodUnits.Gram)}
            </div>
            <div>{t.f((x) => x.utils.objects.food.fields.carbs)}</div>
          </div>
        </div>
        <div className="w-full h-50 mt-5">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div>
          {t.p((x) => x.labels.deviation, {deviation: deviation.toFixed(0), percentage: deviationPercentage})}
        </div>
      </div>
    </div>
  </AppBlock>
  );
};
