import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';
import {ExerciseListScreen} from './ExerciseListScreen';

const meta = {
  title: 'IOS/Exercises/Exercise List',
  component: ExerciseListScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
    exercises: StorybookDataUtils.getExercises(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "Shows the list of exercises in the built-in and the user's library",
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof ExerciseListScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

