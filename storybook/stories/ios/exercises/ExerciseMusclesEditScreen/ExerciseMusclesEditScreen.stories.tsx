import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {ExerciseMusclesEditScreen} from './ExerciseMusclesEditScreen';
import {Muscle} from '../../../../../src/backend/types/Muscle';

const meta = {
  title: 'IOS/Exercises/Exercise Muscles Edit Screen',
  component: ExerciseMusclesEditScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
    type: 'primary',
    initialMuscles: [],
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Screen for selecting muscles (primary or secondary) for an exercise',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof ExerciseMusclesEditScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryMuscles: Story = {
  args: {
    type: 'primary',
    initialMuscles: [Muscle.Biceps, Muscle.Triceps],
  },
};

export const SecondaryMuscles: Story = {
  args: {
    type: 'secondary',
    initialMuscles: [Muscle.Forearms],
  },
};


