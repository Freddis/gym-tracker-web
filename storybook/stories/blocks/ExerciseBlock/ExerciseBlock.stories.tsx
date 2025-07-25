import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/enums/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {ExerciseBlock} from '../../../../src/frontend/components/pages/Exercises/ExerciseLibraryPage/ExerciseBlock';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils';

const meta = {
  title: 'Blocks/Exercise',
  component: ExerciseBlock,
  tags: ['autodocs'],
  args: {
    item: StorybookDataUtils.getExercise(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Exercise Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} className="max-w-5xl" column />],
} satisfies Meta<typeof ExerciseBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
