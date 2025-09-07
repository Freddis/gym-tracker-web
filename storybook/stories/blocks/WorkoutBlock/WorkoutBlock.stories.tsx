
import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {WorkoutEntryBlock} from '../../../../src/frontend/components/blocks/EntryBlock/components/WorkoutEntryBlock';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Blocks/Workout',
  component: WorkoutEntryBlock,
  tags: ['autodocs'],
  args: {
    workout: StorybookDataUtils.getWorkout(),
    entry: StorybookDataUtils.getEntry(),
    own: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Workout Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} className="w-full" layoutClassName="w-full" />],
} satisfies Meta<typeof WorkoutEntryBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const OwnWorkout: Story = {
  args: {
    own: true,
  },
};
