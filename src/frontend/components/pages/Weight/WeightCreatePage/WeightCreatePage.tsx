import {FC} from 'react';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppTextInput} from '../../../atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';

export const WeightCreatePage: FC = () => {

  return (
    <AppBlock className="w-sm">
      <div>
      <h1 className="text-center text-xl mb-5">Add Weight Entry</h1>
        <div className="flex flex-row gap-5 items-center">
          <AppLabel>Weight:</AppLabel>
          <div className="flex flex-row-reverse grow">
            <div>
              <AppTextInput className="w-20"/>
              <span className="ml-5">kg</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center gap-5 mt-5">
          <AppButton>Add Entry</AppButton>
          <AppLink>Back</AppLink>
        </div>
      </div>
    </AppBlock>
  );
};
