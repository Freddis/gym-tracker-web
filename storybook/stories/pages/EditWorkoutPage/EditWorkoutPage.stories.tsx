import type {Meta, StoryObj} from '@storybook/react';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import
{UpdateWorkoutForm,
} from '../../../../src/frontend/components/pages/Workouts/UpdateWorkoutPage/components/UpdateWorkoutForm/UpdateWorkoutForm';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils';
import {PageContainer} from '../../../../src/frontend/components/layout/PageContainer/PageContainer';
import {StoryBookDisplayType} from '../../../components/StoryBookDisplay/enums/StoryBookDisplayType';

const meta = {
  title: 'Pages/Workouts/Edit',
  component: UpdateWorkoutForm,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
    item: StorybookDataUtils.getWorkout(),
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
    (Story) => <StoryBookDisplay story={<PageContainer><Story/></PageContainer>} column type={StoryBookDisplayType.Page}/>,
  ],
} satisfies Meta<typeof UpdateWorkoutForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const EmptyWorkout: Story = {
  args: {
    item: StorybookDataUtils.getEmptyWorkout(),
  },
};
