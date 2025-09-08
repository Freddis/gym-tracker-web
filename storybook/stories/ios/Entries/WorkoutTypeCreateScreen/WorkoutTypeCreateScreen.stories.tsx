import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {WorkoutTypeCreateScreen} from './WorkoutTypeCreateScreen';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'IOS/Entries/Workout Type Create',
  component: WorkoutTypeCreateScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {

  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Adding new workout type.',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof WorkoutTypeCreateScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
};


export const FilledIn: Story = {
  args: {
    type: StorybookDataUtils.getWorkoutType(),
  },
};

export const Errors: Story = {
  args: {
    type: {
      ...StorybookDataUtils.getWorkoutType(),
      name: '',
    },
    errors: [
      {field: 'name', message: "Name can't be empty"},
    ],
  },
};
