import {ChangeEvent, FC, useState} from 'react';
import {FoodAmountUnit} from '../../../../../../../common/utils/openapi-client';
import {AppButton} from '../../../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../../../common/components/atoms/AppLabel/AppLabel';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {AppTextInput} from '../../../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {useResponseErrors} from '../../../../../../../common/utils/useResponseErrors';
import {cn} from '../../../../../../../common/utils/cn';
import {FoodMacros, getFoodCalories, getFoodMacro} from '../../../../../../utils/getFoodValueRecursively';
import {FoodComponentBlockProps} from './types/FoodComponentBlockProps';
import {floorToMax3Decimals} from './utils/floorToMax3Decimals';
import {useImagePlaceHolder} from '../../../../../../utils/getImagePlaceHolder';
import {avoidLet} from '../../../../../../../common/utils/avoidLet';


export const FoodComponentBlock: FC<FoodComponentBlockProps> = (props) => {
  const item = props.item;
  const food = props.item.item.food;
  const defaultAmount = props.item.item.food.servingSize ?? 100;
  const initialAmount = props.item.item.amount ?? defaultAmount;
  const servingSize = food.servingSize ?? 100;
  const initialServings = food.isMeal ? props.item.item.amount : (initialAmount / servingSize);
  const placeholder = useImagePlaceHolder();
  const [amount, setAmount] = useState(initialAmount.toFixed(0));
  const [servings, setServings] = useState(floorToMax3Decimals(initialServings).toString());
  const {setSmartError, clearSmartError, hasSmartError} = useResponseErrors<{amount: string, servings: string}>();
  const servedInServings = item.item.food.isMeal || item.item.food.servingSize !== null;
  const multiplier = avoidLet(() => {
    if (servedInServings && !isNaN(parseFloat(servings))) {
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
  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(e.target.value);
    if (isNaN(value)) {
      setSmartError((x) => x.amount, 'Not a valid number');
      return;
    }
    clearSmartError((x) => x.amount);
    let servings = null;
    if (props.item.item.food.servingSize !== null) {
      servings = value / props.item.item.food.servingSize;
      setServings(floorToMax3Decimals(servings).toString());
    }
    props.onUpdate({
      item: {
        ...props.item.item,
        amount: value,
      },
      key: props.item.key,
    });
  };

  const onServingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!servedInServings) {
      return;
    }
    setServings(e.target.value);
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setSmartError((x) => x.servings, 'Not a valid number');
      return;
    }
    clearSmartError((x) => x.servings);

    const grams = value * (props.item.item.food.servingSize ?? 0);
    setAmount(grams.toFixed(0));
    props.onUpdate({
      item: {
        ...props.item.item,
        unit: food.isMeal ? FoodAmountUnit.SERVING : FoodAmountUnit.GRAM,
        amount: food.isMeal ? value : grams,
      },
      key: props.item.key,
    });
  };


  return (
    <div
    key={item.item.food.id}
    className="flex h-auto flex-row items-start justify-stretch p-2 rounded-md cursor-pointer gap-5 bg-cavity/50 relative"
  >
    <div className="w-40 self-stretch">
      <img className="w-full h-full  object-cover rounded-md" src={item.item.food.image?.url ?? placeholder} />
    </div>
    <div className="flex flex-row gap-5 items-start">
      <div>
        <div className="flex flex-row gap-5 items-center">
        <label className="grow">
            <b>{item.item.food.name}</b>
        </label>
        <AppButton onClick={() => props.onRemove(item)}>Remove</AppButton>
        </div>
        <div className="w-full flex flex-row gap-5 items-center">
          <div className="w-16 overflow-hidden">
            <AppLabel>{translations.utils.objects.food.fields.calories}</AppLabel>
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
            <div className="w-16">
              <AppTextInput hasError={hasSmartError((x) => x.amount)} onChange={onAmountChange} value={amount} />
            </div>
          </div>
          <div className={cn(!servedInServings ? 'invisible' : '', 'w-16 overflow-hidden')}>
            <AppLabel>{t(i18n.create.labels.servings)}</AppLabel>
            <div className="w-16">
              <AppTextInput hasError={hasSmartError((x) => x.servings)} onChange={onServingsChange} value={servings} />
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
