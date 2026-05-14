import {forwardRef, useState, useImperativeHandle, useRef} from 'react';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppSeparator} from '../../../../../common/components/atoms/AppSeparator/AppSeparator';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {InputLabel} from '../../../../../common/components/atoms/InputLabel/InputLabel';
import {usePopup} from '../../../../../common/components/atoms/Popup/utils/usePopup';
import {
  Meal,
  MealUpsertDto,
  MealFoodComponent,
  Food,
  FoodComponentUpsertDto,
  MealType,
  FoodAmountUnit,
  FoodComponent,
  Entry,
  PostEntryUpsertDto,
  MealEntryUpsertDto,
  EntryType,
  } from '../../../../../common/utils/openapi-client';
import {getFoodMacro, FoodMacros, getFoodCalories} from '../../../../utils/getFoodValueRecursively';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {wrap, Wrapped} from '../../../../utils/wrap';
import {FoodComponentBlock} from '../../Food/FoodUpdateForm/components/FoodComponentBlock/FoodComponentBlock';
import {FormSubmitRef} from '../../../../../common/types/FormSubmitRef';
import {IngredientSelectionPopup} from '../../Food/IngredientSelectionPopup/IngredientSelectionPopup';
import {InputRow} from '../../../../../common/components/atoms/InputRow/InputRow';
import {AppSelect} from '../../../../../common/components/atoms/AppSelect/AppSelect';
import {SelectValue} from '../../../../../common/components/atoms/AppSelect/types/SelectValue';
import {EntryUpdateForm} from '../../../blocks/EntryUpdateForm/EntryUpdateForm';
import {route, RouteId} from '../../../../../common/utils/route';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';

interface MealUpdateFormProps {
  meal: Meal;
  entry: Entry;
  onSubmit: (meal: MealEntryUpsertDto) => void;
}
export const MealUpdateForm = forwardRef<FormSubmitRef, MealUpdateFormProps>((props, ref) => {
  const t = useAppPartialTranslation((x) => x.pages.meals);
  const toasts = useToasts();
  const popup = usePopup();
  const entryUpdateFormRef = useRef<FormSubmitRef>(null);
  const [mealType, setMealType] = useState<MealType>(props.meal.type);
  const mealTypes: SelectValue<MealType>[] = Object.values(MealType).map((type) => ({
    label: t.f((x) => x.utils.objects.meal.types[type]),
    value: type,
  }));
  const [ingredients, setIngredients] = useState<Wrapped<MealFoodComponent>[]>(props.meal.food.map(wrap) ?? []);
  useImperativeHandle(ref, () => ({
    submit: () => {
      entryUpdateFormRef.current?.submit();
    },
  }));
  const updatedFood: Food = {
    isMeal: ingredients.length > 0,
    components: ingredients.map((x) => x.item),
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

  const onEntrySubmit = (entry: PostEntryUpsertDto) => {
    const components: FoodComponentUpsertDto[] = ingredients.map((wrapper) => {
      const ingredient = wrapper.item;
      const dto: FoodComponentUpsertDto = {
        food: {
          id: ingredient.food.id,
        },
        amount: ingredient.amount,
        unit: ingredient.unit,
      };
      return dto;
    });
    if (components.length === 0) {
      toasts.addDanger(t.f((x) => x.pages.food.create.toasts.noComponents));
      return;
    }
    const food: MealUpsertDto = {
      type: mealType,
      food: components,
    };
    const mealEntry: MealEntryUpsertDto = {
      ...entry,
      type: EntryType.MEAL,
      meal: food,
    };
    props.onSubmit(mealEntry);
  };

  const onAddFoodClick = () => {
    const exclusions: Food[] = ingredients.map((x) => ({
      ...x.item.food,
      components: [],
    }));
    popup.setContent(<IngredientSelectionPopup onSelect={onIngredientSelect} exclude={exclusions} />);
  };
  const onIngredientSelect = (ingredient: Food) => {
    const servingSize = ingredient.servingSize ?? 100;
    const component: MealFoodComponent = {
      food: ingredient,
      amount: ingredient.isMeal ? 1 : servingSize,
      unit: ingredient.isMeal ? FoodAmountUnit.SERVING : FoodAmountUnit.GRAM,
    };
    setIngredients([...ingredients, wrap(component)]);
    popup.setContent(null);
  };
  const onRemoveIngredient = (ingredient: Wrapped<FoodComponent>) => {
    setIngredients(ingredients.filter((x) => x.key !== ingredient.key));
  };
  const onUpdateIngredient = (ingredient: Wrapped<FoodComponent>) => {
    setIngredients(ingredients.map((x) => x.key === ingredient.key ? ingredient : x));
  };
  return (
  <div className="flex flex-col items-start gap-5">
    <EntryUpdateForm entry={props.entry} ref={entryUpdateFormRef} onSubmit={onEntrySubmit} />
    <InputRow>
      <AppLabel>{t.f((x) => x.utils.objects.meal.fields.type)}</AppLabel>
      <div className="w-30 max-w-full">
        <AppSelect
          options={mealTypes}
          value={mealType}
          onChange={setMealType}
        />
      </div>
    </InputRow>
    <div className="flex flex-row gap-5 items-start w-full">
      <InputLabel>{t.f((x) => x.pages.food.create.labels.components)}</InputLabel>
      <AppButton onClick={onAddFoodClick}>{t.f((x) => x.pages.food.create.buttons.addComponent)}</AppButton>
      <div className="grow flex flex-row gap-5 items-start justify-end">
       <RouteLink target="_blank" to={route(RouteId.FoodCreate)}>{t.f((x) => x.pages.food.create.buttons.crateFood)}</RouteLink>
       <RouteLink target="_blank" to={route(RouteId.FoodCreateMeal)}>{t.f((x) => x.pages.food.create.buttons.crateDish)}</RouteLink>
      </div>
    </div>
    <div className="flex flex-col gap-5 items-start">
      {ingredients.map((ingredient) => (
        <FoodComponentBlock key={ingredient.key} item={ingredient} onUpdate={onUpdateIngredient} onRemove={onRemoveIngredient} />
      ))}
    </div>
    <AppSeparator noMargin/>
    <div className="flex flex-row gap-5 items-start">
      <AppLabel>{t.f((x) => x.pages.food.list.labels.calories)}: {totalCalories.toFixed(0)}</AppLabel>
      <AppLabel>{t.f((x) => x.pages.food.list.labels.protein)}: {totalProtein.toFixed(1)}</AppLabel>
      <AppLabel>{t.f((x) => x.pages.food.list.labels.carbs)}: {totalCarbs.toFixed(1)}</AppLabel>
      <AppLabel>{t.f((x) => x.pages.food.list.labels.fat)}: {totalFat.toFixed(1)}</AppLabel>
    </div>
  </div>
  );
});
