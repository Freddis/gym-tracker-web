import {FC, useEffect, useState} from 'react';
import {nativeEnum} from 'zod';
import {Exercise, Muscle, PatchCrmExercisesByIdData} from '../../../../../../common/utils/openapi-client';
import {AppImageInput} from '../../../../../../common/components/atoms/AppImageInput/AppImageInput';
import {AppInputError} from '../../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTagList} from '../../../../../../common/components/atoms/AppTagList/AppTagList';
import {createTagValues} from '../../../../../../common/components/atoms/AppTagList/utils/createTagValues';
import {AppTextArea} from '../../../../../../common/components/atoms/AppTextArea/AppTextArea';
import {AppTextInput} from '../../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {ErrorSlice, useResponseErrors} from '../../../../../../common/utils/useResponseErrors';

export type ExerciseUpdateDto = Exclude<PatchCrmExercisesByIdData['body'], undefined>
interface ExerciseUpdateFormProps {
  exercise: Exercise,
  onChange:(x: Partial<ExerciseUpdateDto>) => void
  errors?: ErrorSlice<ExerciseUpdateDto>
}

export const ExerciseUpdateForm: FC<ExerciseUpdateFormProps> = (props) => {
  const item = props.exercise;
  const {getSmartError} = useResponseErrors(props.errors);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description ?? '');
  const [image, setImage] = useState<string | null>(null);
  const [primaryMuscles, setPrimaryMuscles] = useState<Muscle[]>(item.muscles.primary);
  const [secondaryMuscles, setSecondaryMuscles] = useState<Muscle[]>(item.muscles.secondary);

  const onSecondaryMuscleSelect = (values: string[]) => {
    setSecondaryMuscles(nativeEnum(Muscle).array().parse(values));
  };
  const onPrimaryMuscleSelect = (values: string[]) => {
    setPrimaryMuscles(nativeEnum(Muscle).array().parse(values));
  };

  useEffect(() => {
    props.onChange({
      name,
      description,
      image: image ?? undefined,
      muscles: {
        primary: primaryMuscles,
        secondary: secondaryMuscles,
      },
    });
  }, [name, description, primaryMuscles, secondaryMuscles, image]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-[auto_auto_1fr] items-start sm:gap-x-5  mb-5">
        <AppLabel>Name</AppLabel>
        <div className="relative">
          <AppTextInput
            className="w-200 max-w-full"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <AppInputError
            className="w-[327px] max-w-full "
            error={getSmartError((x) => x.name)}
          />
        </div>
        <div />
        <AppLabel>Description</AppLabel>
        <div className="relative">
          <AppTextArea
            className="w-200 max-w-full min-h-50"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <AppInputError
            className="w-[327px] max-w-full "
            error={getSmartError((x) => x.description)}
          />
        </div>
        <div />
        <AppLabel>Image</AppLabel>
        <div className="relative">
          <AppImageInput url={item.images[0]} onUpdate={setImage} className="w-80 h-80" />
            <AppInputError
            className="w-[327px] max-w-full "
            error={getSmartError((x) => x.image)}
          />
        </div>
        <div />
        <AppLabel>Primary Muscles</AppLabel>
        <div className="relative">
          <AppTagList
            values={createTagValues(Muscle)}
            selected={createTagValues(item.muscles.primary)}
            onSelect={onPrimaryMuscleSelect}
            placeholder="Search"
            defaultValue={'Select muscles'}
            notFound={'No Muscles Found'}
            />
            <AppInputError
              className="w-[327px] max-w-full "
              error={getSmartError((x) => x.muscles?.primary)}
            />
        </div>
        <div />
        <AppLabel>Secondary Muscles</AppLabel>
        <div className="relative">
          <AppTagList
            values={createTagValues(Muscle)}
            selected={createTagValues(item.muscles.secondary)}
            onSelect={onSecondaryMuscleSelect}
            placeholder="Search"
            defaultValue={'Select muscles'}
            notFound={'No Muscles Found'}
            />
            <AppInputError
              className="w-[327px] max-w-full "
              error={getSmartError((x) => x.muscles?.secondary)}
            />
        </div>
        <div />
      </div>
    </>
  );
};
