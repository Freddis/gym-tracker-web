import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {
  UpdateWorkoutPagePresenter,
} from '../../../../src/frontend/components/pages/Workouts/UpdateWorkoutPage/components/UpdateWorkoutPagePresenter';

const meta = {
  title: 'Pages/Workouts/Edit',
  component: UpdateWorkoutPagePresenter,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
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
        component: 'Login Form',
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>,
  ],
} satisfies Meta<typeof UpdateWorkoutPagePresenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const EmptyWorkout: Story = {
  args: {
    item: StorybookDataUtils.getEmptyWorkout(),
  },
};
