import {forwardRef, useImperativeHandle, useState} from 'react';
import {AppImageInput} from '../../../../../common/components/atoms/AppImageInput/AppImageInput';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTextArea} from '../../../../../common/components/atoms/AppTextArea/AppTextArea';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Food, FoodUpsertDto} from '../../../../../common/utils/openapi-client';
import {ErrorSlice, useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {number, object, string} from 'zod';
import {ImageUpsertDto} from '../../../../../../backend/services/EntryService/types/EntryUpsertDto';
import {v4} from 'uuid';

export type FoodUpdateFormRef = {
  submit: () => void;
};
export type FoodUpdateFormProps = {
  food?: Food;
  errors?: ErrorSlice<Food>;
  onSubmit: (food: FoodUpsertDto) => void;
};
const foodValidator = object({
  name: string().nonempty(),
  description: string().nullable(),
  image: string().optional(),
  protein: number().min(0),
  carbs: number().min(0),
  fat: number().min(0),
  servingSize: number().min(0).positive(),
});
export const FoodUpdateForm = forwardRef<FoodUpdateFormRef, FoodUpdateFormProps>((props, ref) => {
  const {translations} = useAppPartialTranslation((x) => x.pages.food);
  const {getSmartError, setErrors} = useResponseErrors<Food>(props.errors);
  const [name, setName] = useState(props.food?.name ?? '');
  const [description, setDescription] = useState(props.food?.description ?? '');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [protein, setProtein] = useState(props.food?.protein.toString() ?? '');
  const [carbs, setCarbs] = useState(props.food?.carbs.toString() ?? '');
  const [fat, setFat] = useState(props.food?.fat.toString() ?? '');
  const [servingSize, setServingSize] = useState(props.food?.servingSize?.toString() ?? '');

  useImperativeHandle(ref, () => ({
    submit: () => {
      const validated = foodValidator.safeParse({
        name: name.trim(),
        description: description.trim() === '' ? null : description.trim(),
        image: image,
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        servingSize: Number(servingSize),
      });
      if (!validated.success) {
        console.log(validated.error.errors);
        setErrors(validated.error.errors.map((x) => ({field: x.path.join('.'), message: x.message})));
        return;
      }
      const imageData: ImageUpsertDto | undefined = validated.data.image ? {
        data: validated.data.image,
      } : undefined;

      const food: FoodUpsertDto = {
        ...validated.data,
        image: imageData,
        id: props.food?.id ?? v4(),
        servingSizeUnit: 'g',
        createdAt: props.food?.createdAt ?? new Date(),
        updatedAt: props.food?.updatedAt ?? null,
        deletedAt: null,
      };
      props.onSubmit(food);
    },
  }));

  return (
    <div className="flex flex-col items-start">
    <div className="flex flex-row gap-5 items-start">
      <div className="w-25">
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
      <div className="w-25">
        <AppLabel>{translations.utils.objects.food.fields.description}</AppLabel>
      </div>
      <div className="flex flex-col grow">
        <div>
          <AppTextArea className="max-w-full w-100 h-25" onChange={(e) => setDescription(e.target.value)} value={description}/>
        </div>
        <AppInputError error={getSmartError((x) => x.description)} />
      </div>
    </div>
    <div className="flex flex-row gap-5 items-start">
      <div className="w-25">
        <AppLabel>{translations.utils.objects.food.fields.image}</AppLabel>
      </div>
      <div className="flex flex-col grow">
        <AppImageInput onUpdate={setImage} url={props.food?.image?.url} className="w-100 h-80" />
        <AppInputError error={getSmartError((x) => x.image?.url)} />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-5">
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
      <div className="w-25">
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
  </div>
  );
});
