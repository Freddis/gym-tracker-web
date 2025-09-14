import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';
import {WorkoutCreatePage} from '../../../../src/frontend/website/components/pages/Workouts/WorkoutCreatePage/WorkoutCreatePage';

const meta = {
  title: 'Pages/Workouts/Create',
  component: WorkoutCreatePage,
  tags: ['autodocs'],
  globals: {
  },
  args: {
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
    (Story) => <StoryBookDisplay story={<Story/>} column type={StoryBookDisplayType.Page}/>,
  ],
} satisfies Meta<typeof WorkoutCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

