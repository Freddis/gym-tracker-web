import type {Meta, StoryObj} from '@storybook/react';
import {Color} from '../../../../src/frontend/common/utils/design-system/types/Color';
import {StoryBookDisplay} from '../../../components/StoryBookDisplay/StoryBookDisplay';
import {ExerciseBlock} from '../../../../src/frontend/website/components/pages/Exercises/ExerciseLibraryPage/components/ExerciseBlock';
import {StorybookDataUtils} from '../../../utils/StorybookDataUtils/StorybookDataUtils';

const meta = {
  title: 'Blocks/Exercise',
  component: ExerciseBlock,
  tags: ['autodocs'],
  args: {
    item: StorybookDataUtils.getExercise(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Exercise Block',
      },
    },
  },
  decorators: [(Story) => <StoryBookDisplay story={<Story/>} palette={Color.Neutral} className="w-full" layoutClassName="w-full" />],
} satisfies Meta<typeof ExerciseBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
