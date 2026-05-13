import {FC, useState} from 'react';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {avoidLet} from '../../../../../common/utils/avoidLet';
import {cn} from '../../../../../common/utils/cn';
import {FoodComponent} from '../../../../../common/utils/openapi-client';
import {getFoodMacro, FoodMacros, getFoodCalories} from '../../../../utils/getFoodValueRecursively';
import {useImagePlaceHolder} from '../../../../utils/getImagePlaceHolder';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Wrapped} from '../../../../utils/wrap';
import {floorToMax3Decimals} from '../../../pages/Food/FoodUpdateForm/components/FoodComponentBlock/utils/floorToMax3Decimals';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../common/utils/route';

export const MealEntryBlockFoodComponent: FC< {item: Wrapped<FoodComponent>, own?: boolean}> = (props) => {
  const item = props.item;
  const food = props.item.item.food;
  const defaultAmount = props.item.item.food.servingSize ?? 100;
  const initialAmount = props.item.item.amount ?? defaultAmount;
  const servingSize = food.servingSize ?? 100;
  const initialServings = food.isMeal ? props.item.item.amount : (initialAmount / servingSize);
  const placeholder = useImagePlaceHolder();
  const [amount] = useState(initialAmount.toFixed(0));
  const [servings] = useState(floorToMax3Decimals(initialServings).toString());
  const multiplier = avoidLet(() => {
    if (!isNaN(parseFloat(servings))) {
      return parseFloat(servings);
    }
    if (props.item.item.food.servingSize === null) {
      if (!isNaN(parseFloat(amount))) {
        return parseFloat(amount) / 100;
      }
      return defaultAmount / 100;
    }
    return 1;
  });

  const protein = getFoodMacro(food, FoodMacros.Protein) * multiplier;
  const carbs = getFoodMacro(food, FoodMacros.Carbs) * multiplier;
  const fat = getFoodMacro(food, FoodMacros.Fat) * multiplier;
  const calories = getFoodCalories(food) * multiplier;
  const {translations, i18n, t} = useAppPartialTranslation((x) => x.pages.food);
  const servedInServings = item.item.food.isMeal || item.item.food.servingSize !== null;

  return (
    <div
    key={item.item.food.id}
    className="flex h-auto flex-row items-start justify-stretch p-2 rounded-md gap-5 bg-cavity/50 relative"
  >
    <div className="w-40 self-stretch">
      <img className="w-full h-full  object-cover rounded-md" src={item.item.food.image?.url ?? placeholder} />
    </div>
    <div className="flex flex-row gap-5 items-start">
      <div>
        <div className="flex flex-row gap-5 items-center">
        <label className="grow">
            {!props.own && <b>{item.item.food.name}</b>}
            {props.own && (
              <RouteLink accented={false} to={route(RouteId.FoodUpdate)} params={{id: item.item.food.id}}>
                {item.item.food.name}
              </RouteLink>
            )}
        </label>
        </div>
        <div className="w-full flex flex-row gap-2 items-center">
          <div className="w-16 overflow-hidden">
            <AppLabel>
              {translations.utils.objects.food.fields.calories}
            </AppLabel>
            <div className="h-10 flex items-center">{calories.toFixed(0)}</div>
          </div>
          <div className="w-16 overflow-hidden">
            <AppLabel>{translations.utils.objects.food.fields.protein}</AppLabel>
            <div className="h-10 flex items-center">{protein.toFixed(1)}</div>
          </div>
          <div className="w-16 overflow-hidden">
            <AppLabel>{translations.utils.objects.food.fields.fat}</AppLabel>
            <div className="h-10 flex items-center">{fat.toFixed(1)}</div>
          </div>
          <div className="w-16 overflow-hidden">
            <AppLabel>{translations.utils.objects.food.fields.carbs}</AppLabel>
            <div className="h-10 flex items-center">{carbs.toFixed(1)}</div>
          </div>
            <div className={cn(item.item.food.isMeal ? 'invisible' : '', 'w-16 overflow-hidden')}>
                <AppLabel>{t(i18n.create.labels.grams)}</AppLabel>
                <div className="h-10 flex items-center">{amount}</div>
            </div>
          <div className={cn(!servedInServings ? 'invisible' : '', 'w-16 overflow-hidden')}>
            <AppLabel>{t(i18n.create.labels.servings)}</AppLabel>
            <div className="w-16">
              <div className="h-10 flex items-center">{servings}</div>
            </div>
          </div>
        </div>
        <div className={cn(item.item.food.servingSize === null ? 'invisible' : '', 'flex gap-3 items-center')}>
          <AppLabel>{translations.utils.objects.food.fields.servingSize}</AppLabel>
          <div>{item.item.food.servingSize?.toFixed(0)} {translations.utils.objects.foodUnits[item.item.food.servingSizeUnit]}</div>
        </div>
      </div>
    </div>
  </div>
  );
};
