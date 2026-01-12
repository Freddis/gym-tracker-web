import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {ExerciseScreen} from './ExerciseScreen';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'IOS/Exercises/Exercise Screen',
  component: ExerciseScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Screen displaying an exercise',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof ExerciseScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    exercise: StorybookDataUtils.getExercise(),
  },
};

export const ManySecondaryMuscles: Story = {
  args: {
    exercise: StorybookDataUtils.getExercise('squat'),
  },
};

export const ShortDescription: Story = {
  args: {
    exercise: StorybookDataUtils.getExercise('legExtension'),
  },
};
