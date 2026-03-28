import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {WorkoutCreatePage} from '../../../../../src/frontend/website/components/pages/Workouts/WorkoutCreatePage/WorkoutCreatePage';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';
import {
  WorkoutCreatePagePresenter,
} from '../../../../../src/frontend/website/components/pages/Workouts/WorkoutCreatePage/components/WorkoutCreatePagePresenter';

const meta = {
  title: 'Pages/Entries/Workout/Workout Create Page',
  component: WorkoutCreatePagePresenter,
  tags: ['autodocs'],
  globals: {
  },
  args: {
    item: StorybookDataUtils.getEmptyWorkout(),
    onSaveClick: () => {},
    onUpdate: () => {},
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Workout Entry Creation Page',
      },
    },
  },
  decorators: [
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page} user={true}/>,
  ],
} satisfies Meta<typeof WorkoutCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

