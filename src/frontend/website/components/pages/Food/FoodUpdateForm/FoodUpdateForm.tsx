import {forwardRef, useImperativeHandle, useState} from 'react';
import {AppImageInput} from '../../../../../common/components/atoms/AppImageInput/AppImageInput';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTextArea} from '../../../../../common/components/atoms/AppTextArea/AppTextArea';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Food, FoodComponent, FoodComponentUpsertDto, FoodUpsertDto, ServingSizeUnit} from '../../../../../common/utils/openapi-client';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {ImageUpsertDto} from '../../../../../../backend/services/EntryService/types/EntryUpsertDto';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {usePopup} from '../../../../../common/components/atoms/Popup/utils/usePopup';
import {IngredientSelectionPopup} from '../IngredientSelectionPopup/IngredientSelectionPopup';
import {FoodComponentBlock} from './components/FoodComponentBlock/FoodComponentBlock';
import {wrap, Wrapped} from '../../../../utils/wrap';
import {FoodMacros, getFoodCalories, getFoodMacro} from '../../../../utils/getFoodValueRecursively';
import {FoodUpdateFormProps} from './types/FoodUpdateFormProps';
import {FoodUpdateFormRef} from './types/FoodUpdateFormRef';
import {foodValidator} from './validators/foodValidator';
import {mealValidator} from './validators/mealValidator';
import {AppSwitch} from '../../../../../common/components/atoms/AppSwitch/AppSwitch';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {FoodAmountUnit} from '../../../../../../backend/services/FoodService/types/FoodAmountUnit';

export const FoodUpdateForm = forwardRef<FoodUpdateFormRef, FoodUpdateFormProps>((props, ref) => {
  const {translations, i18n, t} = useAppPartialTranslation((x) => x.pages.food);
  const [hasServingSize, setHasServingSize] = useState(props.food.servingSize !== null);
  const {getSmartError, setErrors} = useResponseErrors<Food>(props.errors);
  const [name, setName] = useState(props.food.name ?? '');
  const [description, setDescription] = useState(props.food.description ?? '');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [protein, setProtein] = useState(props.food.protein.toString() ?? '');
  const [carbs, setCarbs] = useState(props.food.carbs.toString() ?? '');
  const [fat, setFat] = useState(props.food.fat.toString() ?? '');
  const [servingSize, setServingSize] = useState(props.food.servingSize?.toString() ?? '');
  const popup = usePopup();
  const [ingredients, setIngredients] = useState<Wrapped<FoodComponent>[]>(props.food.components.map(wrap) ?? []);
  const toasts = useToasts();
  const updatedFood: Food = {
    ...props.food,
    name: name.trim(),
    description: description.trim() === '' ? null : description.trim(),
    protein: Number(protein),
    carbs: Number(carbs),
    fat: Number(fat),
    calories: Number(protein) * 4 + Number(carbs) * 4 + Number(fat) * 9,
    isMeal: ingredients.length > 0,
    components: ingredients.map((x) => x.item),
    servingSize: hasServingSize ? Number(servingSize) : null,
  };

  const totalProtein = getFoodMacro(updatedFood, FoodMacros.Protein);
  const totalCarbs = getFoodMacro(updatedFood, FoodMacros.Carbs);
  const totalFat = getFoodMacro(updatedFood, FoodMacros.Fat);
  const totalCalories = getFoodCalories(updatedFood);
  const calories = totalCalories / (updatedFood.servingSize ?? 100) * 100;

  useImperativeHandle(ref, () => ({
    submit: () => {
      const validator = props.food.isMeal ? mealValidator : foodValidator;
      const validated = validator.safeParse({
        name: name.trim(),
        description: description.trim() === '' ? null : description.trim(),
        image: image,
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        servingSize: hasServingSize ? Number(servingSize) : null,
      });
      if (!validated.success) {
        setErrors(validated.error.errors.map((x) => ({field: x.path.join('.'), message: x.message})));
        toasts.addDanger(t(i18n.update.toasts.invalidForm));
        return;
      }
      const imageData: ImageUpsertDto | undefined = validated.data.image ? {
        data: validated.data.image,
      } : undefined;

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
      const food: FoodUpsertDto = {
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
        servingSize: hasServingSize ? Number(servingSize) : null,
        isMeal: props.food.isMeal,
        ...validated.data,
        image: imageData,
        id: props.food.id,
        servingSizeUnit: ServingSizeUnit.GRAM,
        createdAt: props.food.createdAt,
        updatedAt: props.food.updatedAt,
        deletedAt: null,
        components: components,
      };
      props.onSubmit(food);
    },
  }));
  const onAddIngredientClick = () => {
    const exclusions: Food[] = ingredients.map((x) => ({
      ...x.item.food,
      components: [],
    }));

    if (props.food) {
      exclusions.push(props.food);
    }
    popup.setContent(<IngredientSelectionPopup onSelect={onIngredientSelect} exclude={exclusions} />);
  };
  const onIngredientSelect = (ingredient: Food) => {
    const servingSize = ingredient.servingSize ?? 100;
    const component: FoodComponent = {
      food: ingredient,
      amount: ingredient.isMeal ? 1 : servingSize,
      unit: ingredient.isMeal ? FoodAmountUnit.Serving : FoodAmountUnit.Gram,
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
    <div className="flex flex-col items-start">
    <div className="flex flex-row gap-5 items-start">
      <div className="w-30">
        <AppLabel>{translations.utils.objects.food.fields.name}</AppLabel>
      </div>
      <div className="flex flex-col grow">
        <div>
          <AppTextInput className="max-w-full w-100" onChange={(e) => setName(e.target.value)} value={name}/>
        </div>
        <AppInputError error={getSmartError((x) => x.name)} />
      </div>
    </div>
    <div className="flex flex-row gap-5 items-start">
      <div className="w-30">
        <AppLabel>{translations.utils.objects.food.fields.description}</AppLabel>
      </div>
      <div className="flex flex-col grow">
        <AppTextArea className="max-w-full w-100 h-25" onChange={(e) => setDescription(e.target.value)} value={description}/>
        <AppInputError error={getSmartError((x) => x.description)} />
      </div>
    </div>
    <div className="flex flex-row gap-5 items-start">
      <div className="w-30">
        <AppLabel>{translations.utils.objects.food.fields.image}</AppLabel>
      </div>
      <div className="flex flex-col grow">
        <AppImageInput onUpdate={setImage} url={props.food?.image?.url} className="w-100 h-80" />
        <AppInputError error={getSmartError((x) => x.image?.url)} />
      </div>
    </div>
    {!props.food.isMeal && (
      <>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-5 items-start">
            <AppLabel>{translations.utils.objects.food.fields.protein}</AppLabel>
            <div className="flex flex-col grow">
              <div>
                <AppTextInput className="max-w-full w-20" onChange={(e) => setProtein(e.target.value)} value={protein}/>
                <span className="ml-2">{translations.utils.objects.units.g}</span>
              </div>
              <AppInputError error={getSmartError((x) => x.protein)} />
            </div>
          </div>
          <div className="flex flex-row gap-5 items-start">
            <AppLabel>{translations.utils.objects.food.fields.carbs}</AppLabel>
            <div className="flex flex-col grow">
              <div>
                <AppTextInput className="max-w-full w-20" onChange={(e) => setCarbs(e.target.value)} value={carbs}/>
                <span className="ml-2">{translations.utils.objects.units.g}</span>
              </div>
              <AppInputError error={getSmartError((x) => x.carbs)} />
            </div>
          </div>
          <div className="flex flex-row gap-5 items-start">
            <AppLabel>{translations.utils.objects.food.fields.fat}</AppLabel>
            <div className="flex flex-col grow">
              <div>
                <AppTextInput className="max-w-full w-20" onChange={(e) => setFat(e.target.value)} value={fat}/>
                <span className="ml-2">{translations.utils.objects.units.g}</span>
              </div>
              <AppInputError error={getSmartError((x) => x.fat)} />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-30">
            <AppLabel>{translations.utils.objects.food.fields.calories}</AppLabel>
          </div>
          <div className="flex flex-col">
              <div className="h-10 flex items-center">{calories.toFixed(0)}</div>
              <AppInputError error={null} />
          </div>
        </div>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-30">
            <AppLabel>{t(i18n.create.labels.hasServingSize)}</AppLabel>
          </div>
          <div className="flex flex-col">
            <div className="h-10 flex items-center">
              <AppSwitch onClick={() => setHasServingSize(!hasServingSize)} checked={hasServingSize}/>
            </div>
              <AppInputError error={null} />
          </div>
        </div>
        {hasServingSize && (
          <>
            <div className="flex flex-row gap-5 items-start">
              <div className="w-30">
                <AppLabel>{translations.utils.objects.food.fields.servingSize}</AppLabel>
              </div>
              <div className="flex flex-col grow">
                <div>
                  <AppTextInput className="max-w-full w-20" onChange={(e) => setServingSize(e.target.value)} value={servingSize}/>
                  <span className="ml-5">{translations.utils.objects.units.g}</span>
                </div>
                <AppInputError error={getSmartError((x) => x.servingSize)} />
              </div>
            </div>
            <div className="w-full border-b-1 border-neutral-on-surface"/>
            <div className="flex flex-row gap-5 items-start">
              <AppLabel>{t(i18n.list.labels.calories)}: {totalCalories.toFixed(0)}</AppLabel>
              <AppLabel>{t(i18n.list.labels.protein)}: {totalProtein.toFixed(1)}</AppLabel>
              <AppLabel>{t(i18n.list.labels.carbs)}: {totalCarbs.toFixed(1)}</AppLabel>
              <AppLabel>{t(i18n.list.labels.fat)}: {totalFat.toFixed(1)}</AppLabel>
            </div>
          </>
        )}
      </>
    )}
    {props.food.isMeal && (
      <div className="w-full">
        <div className="flex flex-row gap-5 items-start">
          <AppBlockHeader>{t(i18n.create.labels.components)}:</AppBlockHeader>
          <AppButton onClick={onAddIngredientClick}>{t(i18n.create.buttons.addComponent)}</AppButton>
        </div>
        <div className="flex flex-col gap-5 items-start">
          {ingredients.map((ingredient) => (
            <FoodComponentBlock key={ingredient.key} item={ingredient} onUpdate={onUpdateIngredient} onRemove={onRemoveIngredient} />
          ))}
        </div>
        <div className="mt-5 border-b-1 border-neutral-on-surface"/>
        <div className="flex flex-row gap-5 items-start">
          <AppLabel>{t(i18n.list.labels.calories)}: {totalCalories.toFixed(0)}</AppLabel>
          <AppLabel>{t(i18n.list.labels.protein)}: {totalProtein.toFixed(1)}</AppLabel>
          <AppLabel>{t(i18n.list.labels.carbs)}: {totalCarbs.toFixed(1)}</AppLabel>
          <AppLabel>{t(i18n.list.labels.fat)}: {totalFat.toFixed(1)}</AppLabel>
        </div>
      </div>
    )}
  </div>
  );
});
