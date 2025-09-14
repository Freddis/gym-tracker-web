import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  WorkoutUpdatePagePresenter,
} from '../../../../src/frontend/website/components/pages/Workouts/UpdateWorkoutPage/components/WorkoutUpdatePagePresenter';

const meta = {
  title: 'Pages/Workouts/Edit',
  component: WorkoutUpdatePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    item: StorybookDataUtils.getWorkout(),
    onUpdate: () => {},
    onDeleteClick: () => {},
    onSaveClick: () => {},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Workout Editing Page',
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>,
  ],
} satisfies Meta<typeof WorkoutUpdatePagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const EmptyWorkout: Story = {
  args: {
    item: StorybookDataUtils.getEmptyWorkout(),
  },
};
