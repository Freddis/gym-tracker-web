import {FC, useState} from 'react';
import {AppTextInput} from '../../../../../src/frontend/common/components/atoms/AppTextInput/AppTextInput';
import {AppTextArea} from '../../../../../src/frontend/common/components/atoms/AppTextArea/AppTextArea';
import {AppLabel} from '../../../../../src/frontend/common/components/atoms/AppLabel/AppLabel';
import {AppInputError} from '../../../../../src/frontend/common/components/atoms/AppInputError/AppInputError';
import {AppImageInput} from '../../../../../src/frontend/common/components/atoms/AppImageInput/AppImageInput';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {Equipment} from '../../../../../src/backend/types/Equipment';
import {Muscle} from '../../../../../src/backend/types/Muscle';
import {FieldError} from '../../../../../src/frontend/common/utils/useResponseErrors';
import {AppLink} from '../../../../../src/frontend/common/components/atoms/AppLink/AppLink';

interface ExerciseCreateScreenProps {
  errors?: FieldError[];
}

interface ExerciseFormData {
  name: string;
  description: string;
  equipment: Equipment | null;
  primaryMuscles: Muscle[];
  secondaryMuscles: Muscle[];
  images: string[];
  difficulty: number;
}

export const ExerciseCreateScreen: FC<ExerciseCreateScreenProps> = () => {
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: '',
    description: '',
    equipment: null,
    primaryMuscles: [],
    secondaryMuscles: [],
    images: [],
    difficulty: 1,
  });

  const [errors, setErrors] = useState<Partial<ExerciseFormData>>({});

  const handleInputChange = (field: keyof ExerciseFormData, value: unknown) => {
    setFormData((prev) => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors((prev) => ({...prev, [field]: undefined}));
    }
  };

  const equipmentOptions = Object.values(Equipment);

  return (
    <IphoneDisplay tab={2} title="Add Custom Exercise" rightButton="Save">
      <MobileScreenContainer >
        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="space-y-4">
            <AppLabel>Exercise Image:</AppLabel>
            <div className="flex justify">
              <AppImageInput
                className="w-20 h-20 rounded-lg" onUpdate={() => {}} />
            </div>
          </div>
            <div className="space-y-0">
              <div>
                <AppLabel>Exercise Name *</AppLabel>
                <AppTextInput
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter exercise name"
                />
              </div>

              <div>
                <AppLabel>Description</AppLabel>
                <AppTextArea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter exercise description"
                  className="h-30"
                />
              </div>

              <div>
                <AppLabel>Equipment</AppLabel>
                <select
                  value={formData.equipment || ''}
                  onChange={(e) => handleInputChange('equipment', e.target.value || null)}
                  className="w-full h-10 bg-cavity border-in-cavity border-1 rounded-sm px-3"
                >
                  <option value="">No equipment</option>
                  {equipmentOptions.map((equipment) => (
                    <option key={equipment} value={equipment}>
                      {equipment.charAt(0).toUpperCase() + equipment.slice(1).replace(/([A-Z])/g, ' $1')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <AppLabel>Difficulty (1-5)</AppLabel>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', parseInt(e.target.value, 10))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">{formData.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Primary Muscles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pr-2">
                  <AppLabel>Primary Muscles</AppLabel>
                  <AppLink>Edit</AppLink>
                </div>
                {formData.primaryMuscles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.primaryMuscles.map((muscle) => (
                      <div
                        key={muscle}
                        className="px-2 py-1 bg-accent text-on-accent rounded-sm text-sm"
                      >
                        {muscle}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-on-cavity opacity-60">No primary muscles selected</div>
                )}
              </div>

              {/* Secondary Muscles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pr-2">
                  <AppLabel>Secondary Muscles</AppLabel>
                  <AppLink>Edit</AppLink>
                </div>
                {formData.secondaryMuscles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.secondaryMuscles.map((muscle) => (
                      <div
                        key={muscle}
                        className="px-2 py-1 bg-cavity text-on-cavity border-in-cavity border-1 rounded-sm text-sm"
                      >
                        {muscle}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-on-cavity opacity-60">No secondary muscles selected</div>
                )}
              </div>

              <AppInputError error={errors.primaryMuscles ? 'At least one primary muscle is required' : null} />
            </div>
        </div>
      </MobileScreenContainer>
    </IphoneDisplay>
  );
};
