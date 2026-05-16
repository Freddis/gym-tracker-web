import {FC} from 'react';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppLabel} from '../../../../../../../common/components/atoms/AppLabel/AppLabel';
import {Food} from '../../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {useRouter} from '@tanstack/react-router';
import {FoodMacros, getFoodCalories, getFoodMacro} from '../../../../../../utils/getFoodValueRecursively';
import {useImagePlaceHolder} from '../../../../../../utils/useImagePlaceHolder';

export const FoodBlock: FC<{food: Food}> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.food.list);
  const router = useRouter();
  const placeholder = useImagePlaceHolder();
  const servingSize = props.food.servingSize ?? 100;
  const totalProtein = getFoodMacro(props.food, FoodMacros.Protein);
  const totalCarbs = getFoodMacro(props.food, FoodMacros.Carbs);
  const totalFat = getFoodMacro(props.food, FoodMacros.Fat);
  const totalCalories = getFoodCalories(props.food);
  const to = router.buildLocation({to: route(RouteId.FoodUpdate), params: {id: props.food.id}}).href;
  return (
   <AppBlock
      image={props.food.image?.url ?? placeholder}
      imageTo={to}
      imageHeight={150}
    >
      <div className="p-5 grow flex flex-col">
        <h3 className="capitalize mb-2 font-semibold">
          <RouteLink accented={false} to={route(RouteId.FoodUpdate)} params={{id: props.food.id}}>{props.food.name}</RouteLink>
        </h3>
        <p>{props.food.description}</p>
        <div className="flex flex-row gap-5">
        <AppLabel>{t(i18n.labels.calories)}: {totalCalories.toFixed(0)}</AppLabel>
          <AppLabel>{t(i18n.labels.protein)}: {totalProtein.toFixed(1)}</AppLabel>
          <AppLabel>{t(i18n.labels.fat)}: {totalFat.toFixed(1)}</AppLabel>
          <AppLabel>{t(i18n.labels.carbs)}: {totalCarbs.toFixed(1)}</AppLabel>
        </div>
        <div className="h-10">
          {props.food.servingSize && props.food.components.length <= 0 && (
            <div className="flex flex-row gap-5">
              <AppLabel>
                {t(i18n.labels.servingSize)}: {servingSize.toFixed(0)} {translations.utils.objects.foodUnits[props.food.servingSizeUnit]}
              </AppLabel>
            </div>
          )}
          {props.food.components.length > 0 && (
            <div className="flex flex-row items-start justify-start mt-2 overflow-hidden text-sm text-ellipsis">
                {props.food.components.map((x) => x.food.name).join(', ')}
            </div>
          )}
        </div>
      </div>
   </AppBlock>
  );
};
