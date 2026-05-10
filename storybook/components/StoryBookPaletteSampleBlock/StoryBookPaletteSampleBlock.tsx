
import {FC, useState} from 'react';
import {AppBlock} from '../../../src/frontend/common/components/atoms/AppBlock/AppBlock';
import {StorybookDataUtils} from '../../utils/StorybookDataUtils/StorybookDataUtils';
import {AppButton} from '../../../src/frontend/common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../src/frontend/common/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../src/frontend/common/components/atoms/AppTextInput/AppTextInput';
import {Conditional} from '../../../src/frontend/website/components/layout/Header/Header';
import {AppInputError} from '../../../src/frontend/common/components/atoms/AppInputError/AppInputError';
import {AppToast} from '../../../src/frontend/common/components/atoms/AppToast/AppToast';
import {Color} from '../../../src/frontend/common/utils/design-system/types/Color';

export const StoryBookPaletteSampleBlock: FC = () => {
  const workout = StorybookDataUtils.getWorkout();
  const updateDTO = {
    ...workout,
    exercises: workout.exercises.slice(0, 1),
  };
  const [item] = useState(updateDTO);
  const exercises = item.exercises.map((x) => ({
    exercise: x.exercise,
    workoutExercise: {
      ...x,
    },
  }));
  return (
    <div className="bg-main text-on-main p-10">
     <AppBlock className="max-w-2xl bg-surface text-on-surface">
          <h1 className="text-center text-xl mb-5">Update Workout 123</h1>
          <div className="mb-5 flex flex-row items-center pb-7">
            <AppLabel className="w-20">Started</AppLabel>
            <div className="">
              <input
              type="text"
              className="text-left w-60 h-10 p-3 bg-cavity text-on-cavity border-in-cavity border-1 rounded-xs"
              value={'2025-07-21 13:15:15'}
              />
              <AppInputError error={'Some error'} className="absolute" />
            </div>
          </div>
          <div className="mb-5 flex flex-row items-start">
            <AppLabel className="w-20">Ended</AppLabel>
            <div className="w-60">
              <AppTextInput value={item.end?.toISOString()}/>
            </div>
          </div>
          <div className="mb-5 flex flex-row items-start">
            <AppLabel className="w-20">Calories</AppLabel>
            <div className="w-20">
              <AppTextInput value={item.calories} />
            </div>
          </div>
          <AppToast variant={Color.Danger} className="mb-2">Another error happened here</AppToast>
          <Conditional condition={exercises.length > 0}>
            <div>
              <AppLabel>Exercises:</AppLabel>
            </div>
          </Conditional>
          <div className="mt-5">
            {exercises.map((row) => (
              <div>
                <div className="pb-5 flex flex-row">
                  <img className="w-25 h-25 rounded-md object-cover " key={row.exercise.images[0]} src={row.exercise.images[0]}/>
                  <div className="pl-5 grow">
                    <div className="flex flex-row">
                      <b>{row.exercise.name}</b>
                      <div className="grow flex flex-row-reverse gap-2">
                        <AppButton color={'error'}>Delete</AppButton>
                        <AppButton >Change</AppButton>
                      </div>
                    </div>
                    <div>
                      {row.workoutExercise.sets.map((set, i) => (
                        <div key={i} className="mb-5 flex flex-row gap-3 items-center">
                          <span>{i + 1}:</span>
                          <div className="w-15">
                          <AppTextInput
                            value={(set.weight ?? 0).toString()}
                          />
                          </div>
                          <span>x</span>
                          <div className="w-15">
                          <AppTextInput
                            value={(set.reps ?? 0).toString()}
                          />
                          </div>
                          <AppButton >Delete</AppButton>
                        </div>
                      ))}
                      <AppButton >Add Set</AppButton>
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-5 border-b-1 border-neutral-on-surface"/>
              </div>
              ))}
            <div className="flex justify-center">
              <AppButton>Add Exercise</AppButton>
            </div>
          </div>
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <a href="#" className="text-accent hover:text-accent">Back</a>
            <div className="grow flex flex-row-reverse gap-2 palette-accent">
              <button className="palette-accent bg-main text-on-main rounded-sm px-2 py-1 font-normal">Save</button>
              <AppButton color={'error'}>Delete</AppButton>
            </div>
          </div>
        </AppBlock>
    </div>
  );
};
