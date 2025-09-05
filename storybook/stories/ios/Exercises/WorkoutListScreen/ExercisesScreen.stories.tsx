import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils';
import {ExercisesScreen} from './ExercisesScreen';

const meta = {
  title: 'IOS/Exercises/Exercise List',
  component: ExercisesScreen,
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
        component: 'Login Form',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} column />],
} satisfies Meta<typeof ExercisesScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

