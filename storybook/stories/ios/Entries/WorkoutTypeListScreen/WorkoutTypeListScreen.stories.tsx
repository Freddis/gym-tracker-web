import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../../src/frontend/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../../components/StoryBookDisplay/StoryBookDisplay';
import {StorybookDataUtils} from '../../../../utils/StorybookDataUtils/StorybookDataUtils';
import {WorkoutTypeListScreen} from './WorkoutTypeListScreen';

const meta = {
  title: 'IOS/Entries/Workout Type List',
  component: WorkoutTypeListScreen,
  tags: ['autodocs'],
  globals: {
    viewport: {value: 'tablet', isRotated: false},
  },
  args: {
    items: [
      StorybookDataUtils.getWorkoutType('pull day'),
      StorybookDataUtils.getWorkoutType('leg day'),
      StorybookDataUtils.getWorkoutType('pull day'),
    ],
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Shows the list of workout types (templates) that the user has added',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} />],
} satisfies Meta<typeof WorkoutTypeListScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

