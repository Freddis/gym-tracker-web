import {FC} from 'react';
import {AppBlock} from '../../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppLabel} from '../../../../../../../common/components/atoms/AppLabel/AppLabel';
import {Food} from '../../../../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {RouteLink} from '../../../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../../../common/utils/route';

export const FoodBlock: FC<{food: Food}> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.food.list);
  const placeholder = 'https://dummyimage.com/600x400/000/fff&text=No+Image';
  return (
   <AppBlock image={props.food.image?.url ?? placeholder} imageHeight={200}>
      <div className="p-5 grow flex flex-col">
        <h3 className="uppercase mb-2 font-semibold">
          <RouteLink to={route(RouteId.FoodUpdate)} params={{id: props.food.id}}>{props.food.name}</RouteLink>
        </h3>
        <p>{props.food.description}</p>
        <div className="flex flex-row gap-5">
          <AppLabel>{t(i18n.labels.calories)}: {props.food.calories.toFixed(0)}</AppLabel>
          <AppLabel>{t(i18n.labels.protein)}: {props.food.protein.toFixed(0)}</AppLabel>
          <AppLabel>{t(i18n.labels.carbs)}: {props.food.carbs.toFixed(0)}</AppLabel>
          <AppLabel>{t(i18n.labels.fat)}: {props.food.fat.toFixed(0)}</AppLabel>
        </div>
      </div>
   </AppBlock>
  );
};
