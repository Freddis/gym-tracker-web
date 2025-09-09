import {ChangeEventHandler, FC, useEffect, useState} from 'react';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {ZodHelper} from '../../../../../backend/utils/ZodHelper/ZodHelper';
import {FieldError, useResponseErrors} from '../../../../utils/useResponseErrors';
import {AppInputError} from '../../../atoms/AppInputError/AppInputError';


interface WeightUpdateFormProps {
  item?: {weight: number},
  onUpdate: (value: number | null) => void,
  errors: FieldError[]
}

export const WeightUpdateForm: FC<WeightUpdateFormProps> = (props) => {
  const [value, setvalue] = useState(props.item ? props.item.weight.toString() : '');
  const {getError, setErrors} = useResponseErrors(props.errors);
  useEffect(() => {
    const validated = ZodHelper.validators.numberOrStringNumber.safeParse(value);
    props.onUpdate(validated.success ? validated.data : null);
  }, [value]);
  const onWeightInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const validated = ZodHelper.validators.numberOrStringNumber.safeParse(e.target.value);
    setvalue(e.target.value);
    setErrors([]);
    if (!validated.success) {
      setErrors([
        {
          field: 'weight',
          message: 'Not a valid number',
        },
      ]);
    }
  };
  return (
    <div className="flex flex-row gap-5 items-start">
        <AppLabel>Weight:</AppLabel>
        <div className="flex flex-row grow">
          <div>
            <div>
              <AppTextInput className="w-20" onChange={onWeightInputChange} value={value}/>
              <span className="ml-5">kg</span>
            </div>
            <AppInputError error={getError('weight')} />
          </div>
        </div>
    </div>
  );
};
