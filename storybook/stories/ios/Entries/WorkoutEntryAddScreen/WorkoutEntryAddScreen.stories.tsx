import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {WorkoutEntryAddScreen} from './WorkoutEntryAddScreen';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'IOS/Entries/Workout Create & Edit',
  component: WorkoutEntryAddScreen,
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
        component: 'Adding new workout.',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof WorkoutEntryAddScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
};


export const FilledIn: Story = {
  args: {
    type: StorybookDataUtils.getWorkout(),
  },
};

export const Errors: Story = {
  args: {
    type: StorybookDataUtils.getWorkout(),
    errors: [
      {field: 'name', message: "Name can't be empty"},
    ],
  },
};
