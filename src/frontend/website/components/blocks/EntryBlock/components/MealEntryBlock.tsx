import {FC} from 'react';
import {Meal, Entry, Food} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockHeader} from './EntryBlockHeader';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {wrap} from '../../../../utils/wrap';
import {MealEntryBlockFoodComponent} from './MealEntryBlockFoodComponent';
import {getFoodMacro, FoodMacros, getFoodCalories} from '../../../../utils/getFoodValueRecursively';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppSeparator} from '../../../../../common/components/atoms/AppSeparator/AppSeparator';
import {PostContent} from './PostContent';
import {ChartData} from 'chart.js';
import 'chart.js/auto';
import {Pie} from 'react-chartjs-2';
import {customColors} from '../../../../../common/utils/design-system/customColors';
interface MealEntryBlockProps {
  entry: Entry;
  meal: Meal;
  own?: boolean;
}

export const MealEntryBlock: FC<MealEntryBlockProps> = (props) => {
  const {entry, meal, own} = props;
  const t = useAppPartialTranslation((x) => x.pages.activities.list.objects.meal);
  const food = meal.food.map(wrap);
  const updatedFood: Food = {
    isMeal: true,
    components: meal.food,
    servingSize: null,
    id: '',
    name: '',
    description: null,
    image: null,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSizeUnit: 'Gram',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
  const totalProtein = getFoodMacro(updatedFood, FoodMacros.Protein);
  const totalCarbs = getFoodMacro(updatedFood, FoodMacros.Carbs);
  const totalFat = getFoodMacro(updatedFood, FoodMacros.Fat);
  const totalCalories = getFoodCalories(updatedFood);
  const data: ChartData<'pie', number[], string> = {
    labels: [
      t.f((x) => x.pages.food.list.labels.protein),
      t.f((x) => x.pages.food.list.labels.fat),
      t.f((x) => x.pages.food.list.labels.carbs),
    ],
    datasets: [
      {
        label: t.f((x) => x.utils.objects.foodUnits.Gram),
        data: [
          totalProtein,
          totalFat,
          totalCarbs,
        ],
        backgroundColor: [
          customColors.protein,
          customColors.fat,
          customColors.carbs,
        ],
      },
    ],
  };
  const data2: ChartData<'pie', number[], string> = {
    labels: [
      t.f((x) => x.pages.food.list.labels.protein),
      t.f((x) => x.pages.food.list.labels.fat),
      t.f((x) => x.pages.food.list.labels.carbs),
    ],
    datasets: [
      {
        label: t.f((x) => x.pages.food.list.labels.calories),
        data: [totalProtein * 4, totalFat * 9, totalCarbs * 4],
        backgroundColor: [
          customColors.protein,
          customColors.fat,
          customColors.carbs,
        ],
      },
    ],
  };
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <EntryBlockHeader
        entry={entry}
        own={own}
        to={route(RouteId.MealUpdate)}
        params={{id: entry.id.toString()}}
        title={t.p((x) => x.type)}
      />
      <div className="flex flex-col">
        <div>{t.f((x) => x.utils.objects.meal.types[meal.type])}</div>
      </div>
      <PostContent entry={props.entry} />
      <div className="mt-5 flex flex-col gap-5">
        {food.map((food) => (
          <MealEntryBlockFoodComponent key={food.key} item={food} own={own} />
        ))}
      </div>
      <AppSeparator />
      <div className="flex flex-row gap-5 items-center">
        <div className="flex flex-row gap-5 items-start">
          <AppLabel>{t.f((x) => x.pages.food.list.labels.calories)}: {totalCalories.toFixed(0)}</AppLabel>
          <AppLabel>{t.f((x) => x.pages.food.list.labels.protein)}: {totalProtein.toFixed(1)}</AppLabel>
          <AppLabel>{t.f((x) => x.pages.food.list.labels.fat)}: {totalFat.toFixed(1)}</AppLabel>
          <AppLabel>{t.f((x) => x.pages.food.list.labels.carbs)}: {totalCarbs.toFixed(1)}</AppLabel>
        </div>
        <div className="grid grid-cols-2 items-center justify-center relative grow">
          <div className="h-20">
            <Pie id={entry.id} data={data} options={{maintainAspectRatio: false, plugins: {legend: {display: false}}}} height={'100%'}/>
          </div>
          <div className="h-20">
            <Pie id={entry.id} data={data2} options={{maintainAspectRatio: false, plugins: {legend: {display: false}}}} />
          </div>
        </div>
      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
