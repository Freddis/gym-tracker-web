import type {Meta, StoryObj} from '@storybook/react';
import {
  WorkoutUpdatePagePresenter,
// eslint-disable-next-line max-len
} from '../../../../../src/frontend/website/components/pages/Workouts/WorkoutUpdatePage/components/WorkoutUpdatePagePresenter/WorkoutUpdatePagePresenter';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Pages/Entries/Workout/Workout Edit Page',
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
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page} user={true}/>,
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
