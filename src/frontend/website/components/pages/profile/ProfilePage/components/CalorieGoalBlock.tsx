import {FC, useContext} from 'react';
import {FaAppleAlt} from 'react-icons/fa';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {CalorieGoal, ConsumedCalories, UnitSettings} from '../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {ChartData} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';
import {customColors} from '../../../../../../common/utils/design-system/customColors';
import {ThemeContext} from '../../../../../../common/components/layout/ThemeProvider/context/ThemeContext';
import {Theme} from '../../../../../../common/components/layout/ThemeProvider/enums/Theme';


export const CalorieGoalBlock: FC<{goal: CalorieGoal, consumedCalories: ConsumedCalories, units: UnitSettings}> = (props) => {
  const {goal, consumedCalories} = props;
  const t = useAppPartialTranslation((x) => x.pages.profile);
  const theme = useContext(ThemeContext);
  const bgColor = theme === Theme.Dark ? '#111' : '#eee';
  const calories: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [consumedCalories.calories, Math.max(0, goal.calories - consumedCalories.calories)],
      backgroundColor: [
        customColors.calories,
        bgColor,
      ],
      borderWidth: 0,
      borderRadius: 0,
      circumference: 360,
    }],
  };
  const protein: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [consumedCalories.protein, Math.max(0, goal.protein - consumedCalories.protein)],
      backgroundColor: [
        customColors.protein,
        bgColor,
      ],
      borderWidth: 0,
    }],
  };
  const fat: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [consumedCalories.fat, Math.max(0, goal.fat - consumedCalories.fat)],
      backgroundColor: [
        customColors.fat,
        bgColor,
      ],
      borderWidth: 0,
    }],
  };
  const carbs: ChartData<'doughnut', number[], string> = {
    datasets: [{
      data: [consumedCalories.carbs, Math.max(0, goal.carbs - consumedCalories.carbs)],
      backgroundColor: [
        customColors.carbs,
        bgColor,
      ],
      borderWidth: 0,
    }],
  };
  return (
    <AppBlock>
    <div className="w-full flex flex-row gap-5 items-center">
      <FaAppleAlt className="w-10 h-10" />
      <div className="flex flex-col gap-2">
        <div className="text-md font-semibold mb-5">{t.f((x) => x.pages.activities.list.objects.calorieGoal.type)}</div>
        {/* <div className="flex flex-row gap-2 items-center">
          <div className="font-semibold">{goal.calories} {t.f((x) => x.utils.objects.food.fields.calories)}</div>
          <div className="text-base">{goal.protein} {t.f((x) => x.utils.objects.food.fields.protein)}</div>
          <div className="text-base">{goal.fat} {t.f((x) => x.utils.objects.food.fields.fat)}</div>
          <div className="text-base">{goal.carbs} {t.f((x) => x.utils.objects.food.fields.carbs)}</div>
        </div> */}
        {/* <div className="text-base font-semibold mt-5 w-full mb-10">{t.p((x) => x.labels.remainingToday)}</div> */}
        <div className="h-20 grid grid-cols-4">
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
        <div className="grid grid-cols-4 text-center">
          <div>
          <div className="text-base">{consumedCalories.calories}/{goal.calories}</div>
          <div>{t.f((x) => x.utils.objects.food.fields.calories)}</div>
          </div>
          <div>
          <div className="text-base">{consumedCalories.protein}/{goal.protein}  {t.f((x) => x.utils.objects.foodUnits.Gram)}</div>
          <div>{t.f((x) => x.utils.objects.food.fields.protein)}</div>
          </div>
          <div>
          <div className="text-base">{consumedCalories.fat}/{goal.fat} {t.f((x) => x.utils.objects.foodUnits.Gram)}</div>
          <div>{t.f((x) => x.utils.objects.food.fields.fat)}</div>
          </div>
          <div>
          <div className="text-base">{consumedCalories.carbs}/{goal.carbs}  {t.f((x) => x.utils.objects.foodUnits.Gram)}</div>
          <div>{t.f((x) => x.utils.objects.food.fields.carbs)}</div>
          </div>
        </div>

      </div>
    </div>
  </AppBlock>
  );
};
