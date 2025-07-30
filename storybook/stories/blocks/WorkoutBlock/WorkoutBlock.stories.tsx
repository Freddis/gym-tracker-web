import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/utils/design-system/types/Color';
import {WorkoutBlock} from '../../../../src/frontend/components/pages/Workouts/WorkoutListPage/WorkoutBlock/WorkoutBlock';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils';

const meta = {
  title: 'Blocks/Workout',
  component: WorkoutBlock,
  tags: ['autodocs'],
  args: {
    item: StorybookDataUtils.getWorkout(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Workout Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} className="max-w-5xl" column />],
} satisfies Meta<typeof WorkoutBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
