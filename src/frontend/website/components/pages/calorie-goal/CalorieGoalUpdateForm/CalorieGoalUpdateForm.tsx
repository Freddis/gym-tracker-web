import {forwardRef, useState, useRef, useImperativeHandle, ChangeEvent} from 'react';
import {number} from 'zod';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {InputLabel} from '../../../../../common/components/atoms/InputLabel/InputLabel';
import {InputRow} from '../../../../../common/components/atoms/InputRow/InputRow';
import {FormSubmitRef} from '../../../../../common/types/FormSubmitRef';
import {CalorieGoal, CalorieGoalEntryUpsertDto, PostEntryUpsertDto, EntryType, Entry} from '../../../../../common/utils/openapi-client';
import {ErrorSlice, useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {EntryUpdateForm} from '../../../blocks/EntryUpdateForm/EntryUpdateForm';

interface CalorieGoalUpdateFormProps {
  goal: CalorieGoal;
  entry: Entry;
  errors?: ErrorSlice<CalorieGoalEntryUpsertDto>;
  onSubmit: (goal: CalorieGoalEntryUpsertDto) => void;
}

export const CalorieGoalUpdateForm = forwardRef<FormSubmitRef, CalorieGoalUpdateFormProps>((props, ref) => {
  const {setSmartError, hasSmartError, clearErrors} = useResponseErrors(props.errors);
  const [calories, setCalories] = useState(props.goal.calories.toFixed(0));
  const [carbs, setCarbs] = useState(props.goal.carbs.toFixed(1));
  const [protein, setProtein] = useState(props.goal.protein.toFixed(1));
  const [fat, setFat] = useState(props.goal.fat.toFixed(1));
  // const [start, setStart] = useState(props.goal.start.toString());
  // const [end, setEnd] = useState(props.goal.end);
  const entryUpdateFormRef = useRef<FormSubmitRef>(null);
  const t = useAppPartialTranslation((x) => x.pages.calorieGoal.create);
  useImperativeHandle(ref, () => ({
    submit: () => {
      entryUpdateFormRef.current?.submit();
    },
  }));
  const onCaloriesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCalories(e.target.value);
  };
  const onProteinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProtein(e.target.value);
  };
  const onFatChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFat(e.target.value);
  };

  const onCarbsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCarbs(e.target.value);
  };
  const onEntrySubmit = (entry: PostEntryUpsertDto) => {
    clearErrors();
    const validatedCalories = number().min(0).safeParse(Number(calories));
    if (!validatedCalories.success) {
      setSmartError((x) => x.calorieGoal.calories, '');
    }
    const validatedProtein = number().min(0).safeParse(Number(protein));
    if (!validatedProtein.success) {
      setSmartError((x) => x.calorieGoal.protein, '');
    }
    const validatedFat = number().min(0).safeParse(Number(fat));
    if (!validatedFat.success) {
      setSmartError((x) => x.calorieGoal.fat, '');
    }
    const validatedCarbs = number().min(0).safeParse(Number(carbs));
    if (!validatedCarbs.success) {
      setSmartError((x) => x.calorieGoal.carbs, '');
    }
    if (!validatedCalories.success || !validatedProtein.success || !validatedFat.success || !validatedCarbs.success) {
      return;
    }

    const goal: CalorieGoalEntryUpsertDto = {
      ...entry,
      type: EntryType.CALORIE_GOAL,
      calorieGoal: {
        calories: validatedCalories.data,
        protein: validatedProtein.data,
        fat: validatedFat.data,
        carbs: validatedCarbs.data,
        start: new Date(),
        end: null,
      },
    };
    props.onSubmit(goal);
  };

  return (
    <div>
      <EntryUpdateForm entry={props.entry} ref={entryUpdateFormRef} onSubmit={onEntrySubmit} />
      <InputRow>
        <InputLabel>{t.f((x) => x.pages.food.list.labels.calories)}</InputLabel>
        <AppTextInput hasError={hasSmartError((x) => x.calorieGoal.calories)} value={calories} onChange={onCaloriesChange} />
      </InputRow>
      <InputRow>
        <InputLabel>{t.f((x) => x.pages.food.list.labels.protein)}</InputLabel>
        <AppTextInput hasError={hasSmartError((x) => x.calorieGoal.protein)} value={protein} onChange={onProteinChange} />
      </InputRow>
      <InputRow>
        <InputLabel>{t.f((x) => x.pages.food.list.labels.fat)}</InputLabel>
        <AppTextInput hasError={hasSmartError((x) => x.calorieGoal.fat)} value={fat} onChange={onFatChange} />
      </InputRow>
      <InputRow>
        <InputLabel>{t.f((x) => x.pages.food.list.labels.carbs)}</InputLabel>
        <AppTextInput hasError={hasSmartError((x) => x.calorieGoal.carbs)} value={carbs} onChange={onCarbsChange} />
      </InputRow>
    </div>
  );
});
