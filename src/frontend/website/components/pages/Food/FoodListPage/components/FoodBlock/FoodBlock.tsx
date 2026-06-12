import {FC} from 'react';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppLabel} from '../../../../../../../common/components/atoms/AppLabel/AppLabel';
import {Food} from '../../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../../../common/utils/route';
import {useRouter} from '@tanstack/react-router';
import {useImagePlaceHolder} from '../../../../../../utils/useImagePlaceHolder';
import {FoodUtility} from '../../../../../../../../common/utils/FoodUtility/FoodUtility';
import {FoodMacros} from '../../../../../../../../common/utils/FoodUtility/types/FoodMacros';

export const FoodBlock: FC<{food: Food, own: boolean}> = (props) => {
  const foodUtility = new FoodUtility();
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.food.list);
  const router = useRouter();
  const placeholder = useImagePlaceHolder();
  const servingSize = props.food.servingSize ?? 100;
  const totalProtein = foodUtility.getFoodMacro(props.food, FoodMacros.Protein);
  const totalCarbs = foodUtility.getFoodMacro(props.food, FoodMacros.Carbs);
  const totalFat = foodUtility.getFoodMacro(props.food, FoodMacros.Fat);
  const totalCalories = foodUtility.getFoodCalories(props.food);
  const to = router.buildLocation({to: route(RouteId.FoodUpdate), params: {id: props.food.id}}).href;
  return (
   <AppBlock
      image={props.food.image?.url ?? placeholder}
      imageTo={to}
      imageHeight={150}
    >
      <div className="p-5 grow flex flex-col">
        <h3 className="capitalize mb-2 font-semibold">
          {props.own && (
            <RouteLink accented={false} to={route(RouteId.FoodUpdate)} params={{id: props.food.id}}>{props.food.name}</RouteLink>
          )}
          {!props.own && (
            <span>{props.food.name}</span>
          )}
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
